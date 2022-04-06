import dotenv from 'dotenv';
dotenv.config();

const config: Cypress.PluginConfig = (on, config) => {
  // copy any needed variables from process.env to config.env
  config.env.testUserPassword = process.env.TEST_USER_PASSWORD;

  // do not forget to return the changed config object!
  return config;
};

export default config;
