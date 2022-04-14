describe('For anonymous users', () => {
  it('forbids creating buckets', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { error } = await supabase.storage.createBucket('a-new-bucket');
      expect(error).not.to.be.null;
    });
  });

  it('forbids deleting buckets', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { error } = await supabase.storage.deleteBucket('podcast-cover-arts');
      expect(error).not.to.be.null;
    });
  });

  it('forbids emptying buckets', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { error } = await supabase.storage.emptyBucket('podcast-cover-arts');
      expect(error).not.to.be.null;
    });
  });

  it("forbids updating buckets' publicity status", () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { error } = await supabase.storage.updateBucket('podcast-cover-arts', {
        public: false,
      });
      expect(error).not.to.be.null;
    });
  });

  it('forbids uploading files', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { error } = await supabase.storage
        .from('podcast-cover-arts')
        .upload('storage-limit-hazard.txt', 'heuheuheuheuheuheuheuheuhe');
      expect(error).not.to.be.null;
    });
  });

  it('forbids listing files', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data } = await supabase.storage.from('podcast-cover-arts').list();
      expect(data).to.be.empty;
    });
  });

  it('permits downloading files', () => {
    cy.createSupabaseClient().then(async (supabase) => {
      const { data } = await supabase.storage
        .from('public/podcast-cover-arts')
        .download('file-for-testing.jpg');
      expect(data).not.to.be.null;
    });
  });
});

describe('For authorized users', () => {
  it('forbids creating buckets', () => {
    cy.login().then(async ([, supabase]) => {
      const { error } = await supabase.storage.createBucket('a-new-bucket');
      expect(error).not.to.be.null;
    });
  });

  it('forbids deleting buckets', () => {
    cy.login().then(async ([, supabase]) => {
      const { error } = await supabase.storage.deleteBucket('podcast-cover-arts');
      expect(error).not.to.be.null;
    });
  });

  it('forbids emptying buckets', () => {
    cy.login().then(async ([, supabase]) => {
      const { error } = await supabase.storage.emptyBucket('podcast-cover-arts');
      expect(error).not.to.be.null;
    });
  });

  it("forbids updating buckets' publicity status", () => {
    cy.login().then(async ([, supabase]) => {
      const { error } = await supabase.storage.updateBucket('podcast-cover-arts', {
        public: false,
      });
      expect(error).not.to.be.null;
    });
  });

  it('forbids uploading files', () => {
    cy.login().then(async ([, supabase]) => {
      const { error } = await supabase.storage
        .from('podcast-cover-arts')
        .upload('storage-limit-hazard.txt', 'heuheuheuheuheuheuheuheuhe');
      expect(error).not.to.be.null;
    });
  });

  it('forbids listing files', () => {
    cy.login().then(async ([, supabase]) => {
      const { data } = await supabase.storage.from('podcast-cover-arts').list();
      expect(data).to.be.empty;
    });
  });

  it('permits downloading files', () => {
    cy.login().then(async ([, supabase]) => {
      const { data } = await supabase.storage
        .from('public/podcast-cover-arts')
        .download('file-for-testing.jpg');
      expect(data).not.to.be.null;
    });
  });
});
