/* eslint-disable camelcase */
import type { SBEpisode, SBFavourite } from '$lib/shared/api/adapters';

describe('For anonymous users', () => {
  it('forbids reading', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase.from<SBFavourite>('favourites').select('*').limit(1).single();
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids creating', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const response = await supabase.from<SBFavourite>('favourites').insert({ episode_id: 1 });
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });
});

describe('For authorized users', () => {
  it('permits reading own rows', () => {
    cy.login().then(async ([auth, supabase]) => {
      const userID = (await auth).user?.id;
      if (userID !== undefined) {
        const response = await supabase.from<SBFavourite>('favourites').select('user_id');
        expect(response.status).to.be.gte(200).and.be.lessThan(300);
        if (response.data !== null) {
          for (const row of response.data) {
            expect(row.user_id).to.be.equal(userID);
          }
        } else {
          expect(response.data).not.to.be.null;
        }
      }
    });
  });

  it('forbids reading rows of other users', () => {
    cy.login().then(async ([auth, supabase]) => {
      const userID = (await auth).user?.id;
      if (userID !== undefined) {
        const response = await supabase
          .from<SBFavourite>('favourites')
          .select('*')
          .filter('user_id', 'neq', userID)
          .single();
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('permits creating rows with your own user ID', () => {
    cy.login().then(async ([auth, supabase]) => {
      const userID = (await auth).user?.id;
      if (userID !== undefined) {
        const { data: existingEpisode } = await supabase
          .from<Partial<SBEpisode>>('episodes')
          .select('id')
          .limit(1)
          .single();
        if (existingEpisode !== null) {
          const response = await supabase
            .from<SBFavourite>('favourites')
            .insert({ episode_id: existingEpisode.id }, { returning: 'representation' });
          expect(response.status).to.be.gte(200).and.be.lessThan(300);
          expect(response.data?.[0].user_id).to.be.equal(userID);

          if (response.data?.[0] !== undefined) {
            await supabase.from<SBFavourite>('favourites').delete().eq('id', response.data[0].id);
          }
        }
      }
    });
  });

  it('forbids creating rows with another user ID', () => {
    cy.login().then(async ([, supabase]) => {
      const response = await supabase
        .from<SBFavourite>('favourites')
        .insert({ user_id: '000000', episode_id: 1 });
      expect(response.status).to.be.gte(400).and.be.lessThan(500);
    });
  });

  it('forbids updating the user ID', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingRow } = await supabase
        .from<SBFavourite>('favourites')
        .select('id')
        .limit(1)
        .single();

      if (existingRow !== null) {
        const response = await supabase
          .from<SBFavourite>('favourites')
          .update({ user_id: '000000' })
          .eq('id', existingRow.id);
        expect(response.status).to.be.gte(400).and.be.lessThan(500);
      }
    });
  });

  it('permits deleting own rows', () => {
    cy.login().then(async ([, supabase]) => {
      const { data: existingEpisode } = await supabase
        .from<Partial<SBEpisode>>('episodes')
        .select('id')
        .limit(1)
        .single();

      if (existingEpisode?.id !== undefined) {
        const { data: existingRow } = await supabase
          .from<SBFavourite>('favourites')
          .insert({ episode_id: existingEpisode.id }, { returning: 'representation' });

        if (existingRow?.[0].id !== undefined) {
          const response = await supabase
            .from<SBFavourite>('favourites')
            .delete({ count: 'exact' })
            .eq('id', existingRow[0].id);
          expect(response.count).to.be.equal(1);
        }
      }
    });
  });
});
