import { createClient } from '@supabase/supabase-js';

export default function login() {
  const appUrl: string = Cypress.env('supabaseAppUrl');
  const publicAnonKey: string = Cypress.env('supabasePublicAnonKey');
  const supabase = createClient(appUrl, publicAnonKey);

  const email: string = Cypress.env('testingEmail');
  const password: string = Cypress.env('testUserPassword');
  const signInPromise = supabase.auth.signIn({ email, password });

  return cy.wrap<typeof signInPromise>(signInPromise);
}
