/// <reference types="cypress" />
import { config_info } from "../../config";
import {
  nasa_widgets,
  github_widgets,
  crypto_widgets,
} from "../../../src/features/dashboard/components/Switcher/datas";

const widgetList = ["widget-1", "widget-2", "widget-3", "widget-4"];

describe("Widgets", () => {
  beforeEach(() => {
    cy.visit(`${config_info.BASE_URL}`);
    cy.viewport("macbook-16");
    cy.get('[data-testid="skip_button"]', { timeout: 5000 }).should("exist");
    cy.get('[data-testid="skip_button"]', { timeout: 5000 }).click();
  });

  it("Check that all widgets are present", () => {
    for (const widget of widgetList) {
      cy.get(`[data-testid=${widget}]`, { timeout: 5000 }).should("exist");
    }
  });

  it("Check that be changed widgets for crypto section", () => {
    cy.get('[data-testid="switcher_crypto"]', { timeout: 5000 }).should(
      "exist"
    );
    cy.get('[data-testid="switcher_crypto"]', { timeout: 5000 }).click();
    cy.get(`[data-testid="${crypto_widgets[0]}_selector"]`, {
      timeout: 5000,
    }).should("exist");
    cy.get(`[data-testid="${crypto_widgets[0]}_selector"]`, {
      timeout: 5000,
    }).click();
    cy.get(`[data-testid="crypto_trends"]`, { timeout: 5000 }).should("exist");
  });

  it("Check that can be changed widgets for github section", () => {
    cy.get('[data-testid="switcher_github"]', { timeout: 5000 }).should(
      "exist"
    );
    cy.get('[data-testid="switcher_github"]', { timeout: 5000 }).click();
    cy.get(`[data-testid="${github_widgets[2]}_selector"]`, {
      timeout: 5000,
    }).should("exist");
    cy.get(`[data-testid="${github_widgets[2]}_selector"]`, {
      timeout: 5000,
    }).click();
    cy.get(`[data-testid="random_user"]`, { timeout: 5000 }).should("exist");
  });

  it("Check that can be changed widgets for nasa section", () => {
    cy.get('[data-testid="switcher_nasa"]', { timeout: 5000 }).should("exist");
    cy.get('[data-testid="switcher_nasa"]', { timeout: 5000 }).click();

    cy.get(`[data-testid="${nasa_widgets[2]}_selector"]`, {
      timeout: 5000,
    }).should("exist");
    cy.get(`[data-testid="${nasa_widgets[2]}_selector"]`, {
      timeout: 5000,
    }).click();
    cy.get(`[data-testid="cme"]`, { timeout: 5000 }).should("exist");
  });
});
