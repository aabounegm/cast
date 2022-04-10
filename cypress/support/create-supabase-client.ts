import { createClient } from '@supabase/supabase-js';

export default function createSupabaseClient() {
  const appUrl: string = Cypress.env('supabaseAppUrl');
  const publicAnonKey: string = Cypress.env('supabasePublicAnonKey');
  return cy.wrap(createClient(appUrl, publicAnonKey));
}
