import createSupabaseClient from './create-supabase-client';

export default function login() {
  return createSupabaseClient().then((supabase) => {
    const email: string = Cypress.env('testingEmail');
    const password: string = Cypress.env('testUserPassword');
    const signInPromise = supabase.auth.signIn({ email, password });

    return cy.wrap([signInPromise, supabase] as const);
  });
}
