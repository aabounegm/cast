import dotenv from 'dotenv';
dotenv.config();

const config: Cypress.PluginConfig = (on, config) => {
  // copy any needed variables from process.env to config.env
  config.env.testUserPassword = process.env.TEST_USER_PASSWORD;
  config.env.supabaseAppUrl = process.env.VITE_SUPABASE_APP_URL;
  config.env.supabasePublicAnonKey = process.env.VITE_SUPABASE_PUBLIC_ANON_KEY;

  // do not forget to return the changed config object!
  return config;
};

export default config;
