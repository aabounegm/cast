/* eslint-disable camelcase */
import type { SBEpisode } from '$lib/shared/api/adapters';

const writableEpisodeFields: Partial<SBEpisode> = {
  title: 'a new title',
  duration: 1337,
  podcast_id: 1,
  episode_number: 1,
};

describe('For anonymous users', () => {
  it('permits reading', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase.from<SBEpisode>('episodes').select('*').limit(1).single();
      expect(response.status).to.be.gte(200).and.be.lessThan(300);
    });
  });

  it('forbids creating', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase.from<SBEpisode>('episodes').insert(writableEpisodeFields);
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids updating', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data: existingRow } = await supabase
        .from<SBEpisode>('episodes')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBEpisode>('episodes')
          .update(writableEpisodeFields)
          .eq('id', existingRow.id);
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('forbids deleting', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data: existingRow } = await supabase
        .from<SBEpisode>('episodes')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBEpisode>('episodes')
          .delete({ count: 'exact' })
          .eq('id', existingRow.id);
        expect(response.count).to.be.eq(0);
      }
    });
  });
});

describe('For authorized users', () => {
  it('permits reading', () => {
    cy.login().then(async ([, supabase]) => {
      const response = await supabase.from<SBEpisode>('episodes').select('*').limit(1).single();
      expect(response.status).to.be.gte(200).and.be.lessThan(300);
    });
  });

  it('forbids creating', () => {
    cy.login().then(async ([, supabase]) => {
      const response = await supabase.from<SBEpisode>('episodes').insert(writableEpisodeFields);
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids updating', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingRow } = await supabase
        .from<SBEpisode>('episodes')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBEpisode>('episodes')
          .update(writableEpisodeFields)
          .eq('id', existingRow.id);
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('forbids deleting', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingRow } = await supabase
        .from<SBEpisode>('episodes')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBEpisode>('episodes')
          .delete({ count: 'exact' })
          .eq('id', existingRow.id);
        expect(response.count).to.be.eq(0);
      }
    });
  });
});
