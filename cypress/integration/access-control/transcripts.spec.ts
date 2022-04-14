/* eslint-disable camelcase */
import type { SBTranscript } from '$lib/shared/api/adapters';

const writableTranscriptFields: Partial<SBTranscript> = {
  content: 'sample content',
};

describe('For anonymous users', () => {
  it('permits reading', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase
        .from<SBTranscript>('transcripts')
        .select('*')
        .limit(1)
        .single();
      expect(response.status).to.be.gte(200).and.be.lessThan(300);
    });
  });

  it('forbids creating', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase
        .from<SBTranscript>('transcripts')
        .insert(writableTranscriptFields);
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids updating', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data: existingRow } = await supabase
        .from<SBTranscript>('transcripts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBTranscript>('transcripts')
          .update(writableTranscriptFields)
          .eq('id', existingRow.id);
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('forbids deleting', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data: existingRow } = await supabase
        .from<SBTranscript>('transcripts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBTranscript>('transcripts')
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
      const response = await supabase
        .from<SBTranscript>('transcripts')
        .select('*')
        .limit(1)
        .single();
      expect(response.status).to.be.gte(200).and.be.lessThan(300);
    });
  });

  it('forbids creating', () => {
    cy.login().then(async ([, supabase]) => {
      const response = await supabase
        .from<SBTranscript>('transcripts')
        .insert(writableTranscriptFields);
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids updating', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingRow } = await supabase
        .from<SBTranscript>('transcripts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBTranscript>('transcripts')
          .update(writableTranscriptFields)
          .eq('id', existingRow.id);
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('forbids deleting', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingRow } = await supabase
        .from<SBTranscript>('transcripts')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBTranscript>('transcripts')
          .delete({ count: 'exact' })
          .eq('id', existingRow.id);
        expect(response.count).to.be.eq(0);
      }
    });
  });
});
