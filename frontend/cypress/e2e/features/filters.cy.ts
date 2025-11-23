/// <reference types="cypress" />

import { config_info } from "../../config";

beforeEach(() => {
  cy.visit(`${config_info.BASE_URL}`);
  cy.viewport("macbook-16");
  cy.get('[data-testid="skip_button"]', { timeout: 5000 }).should("exist");
  cy.get('[data-testid="skip_button"]', { timeout: 5000 }).click();
});
describe("Check the correct functionality of filters", () => {
  it("successfully hide 2 widgets", () => {
    cy.url().should("eq", config_info.BASE_URL, { timeout: 20000 });

    // Hide Weather Widget
    cy.get('[data-testid="filter_WEATHER WIDGET"]', {
      timeout: 5000,
    }).should("exist");
    cy.get('[data-testid="filter_WEATHER WIDGET"]').click();
    // Hide GithubWidget
    cy.get('[data-testid="filter_GITHUB WIDGET"]', {
      timeout: 5000,
    }).should("exist");
    cy.get('[data-testid="filter_GITHUB WIDGET"]').click();

    // Weather
    cy.get('[data-testid="widget-1"]').should("not.exist");
    // Github Widget
    cy.get('[data-testid="widget-2"]').should("not.exist");
  });

  it("successfully show back 4 widgets", () => {
    cy.url()
      .should("eq", config_info.BASE_URL, { timeout: 20000 })
      .then(() => {
        // Hide Weather Widget
        cy.get('[data-testid="filter_WEATHER WIDGET"]', {
          timeout: 5000,
        }).should("exist");
        cy.get('[data-testid="filter_WEATHER WIDGET"]').click();
        cy.get('[data-testid="filter_GITHUB WIDGET"]', {
          timeout: 5000,
        }).should("exist");
        cy.get('[data-testid="filter_GITHUB WIDGET"]').click();
        // Weather
        cy.get('[data-testid="widget-1"]').should("not.exist");
        cy.get('[data-testid="widget-2"]').should("not.exist");
        cy.get('[data-testid="filter_WEATHER WIDGET"]').click();
        cy.get('[data-testid="filter_GITHUB WIDGET"]').click();
        cy.get('[data-testid="widget-1"]').should("be.visible");
        cy.get('[data-testid="widget-2"]').should("be.visible");
      });
  });
});

describe("it can search weather directly from filters", () => {

  it("Search city weather correctly", () => {
    cy.get('[data-testid="panel_weather"]', { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.get('[data-testid="filter_weather_search"]', { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="filter_weather_search"]', { timeout: 10000 })
      .clear()
      .type("Roma")
      .press("Enter");
    cy.get('[data-testid="city_searched"]', { timeout: 10000 }).should(
      "contain.text",
      "Rome"
    );
  });

  it("Show fallback when a fake city is searched", () => {
    cy.get('[data-testid="panel_weather"]', { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.get('[data-testid="filter_weather_search"]', { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="filter_weather_search"]', { timeout: 10000 })
      .clear()
      .type("dadasdasdasd")
      .press("Enter");
    cy.get('[data-testid="failed_weather_title"]', { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("Select correctly the temperature", () => {
    cy.get('[data-testid="panel_weather"]', { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.get('[data-testid="temp_filter"]', { timeout: 10000 }).should("exist");
    cy.get('[data-testid="temp_filter"]', { timeout: 10000 }).select("kelvin");
    cy.get('[data-testid="temperature_type"]').should("contain.text", "K");
  });
});

// ----- CHECK CHANGING WIDGET FROM SIDEBAR

describe("Change widget from filters", () => {
  it("Change nasa widget selected from filters", () => {
    cy.get('[data-testid="panel_nasa"]', { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.get('[data-testid="click_nasa"]', { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.get('[data-testid="filterSelect_CME"]', { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.get(`[data-testid="cme"]`, { timeout: 5000 }).should("exist");
  });

  it("Change github widget from filters", () => {
    cy.get('[data-testid="panel_github"]', { timeout: 10000 })
      .should("exist")
      .click();

    cy.get('[data-testid="click_github"]', { timeout: 10000 })
      .should("exist")
      .click();
    cy.get('[data-testid="filterSelect_Random User"]', {
      timeout: 10000,
    })
      .should("exist")
      .click();
    cy.get(`[data-testid="random_user"]`, { timeout: 5000 }).should("exist");
  });

  it("Change crypto widget from filters", () => {
    cy.get('[data-testid="panel_crypto"]', { timeout: 10000 })
      .should("exist")
      .click();

    cy.get('[data-testid="click_crypto"]', { timeout: 10000 })
      .should("exist")
      .click();
    cy.get('[data-testid="filterSelect_Trending Cryptos"]', {
      timeout: 10000,
    }).should("exist").click();

    cy.get(`[data-testid="crypto_trends"]`, { timeout: 5000 }).should("exist");

  });
});
