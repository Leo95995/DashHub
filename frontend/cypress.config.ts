import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    supportFile: "cypress/support/commands.ts", 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

});
