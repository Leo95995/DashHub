/// <reference types="cypress" />

import { config_info } from "../../config";

//Checks that all the images in the pages have an accessible alt attribute
describe("Check if all images have an alt attribute", () => {
  beforeEach(() => {
    cy.visit(`${config_info.BASE_URL}`);
  });

  it("has image attributes", () => {
    cy.url()
      .should("eq", config_info.BASE_URL, { timeout: 20000 })
      .then(() => {
        cy.get('[data-testid="skip_button"]', { timeout: 5000 }).should(
          "exist"
        );
        cy.get('[data-testid="skip_button"]').click();
      });

    cy.get("img", { timeout: 10000 }).should("have.length", 14);
    cy.get("img").each(($img) => {
      cy.wrap($img).should("have.attr", "alt").and("not.be.empty");
    });
  });
});
