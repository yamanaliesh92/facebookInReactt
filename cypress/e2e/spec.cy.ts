import { faker } from "@faker-js/faker";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/auth");

    cy.get('[data-testid="emailTest"]').type(faker.internet.email());
    const pass = faker.internet.password();
    cy.get('[data-testid="passwordTest"]').type(pass);
    cy.get('[data-testid="usernameTest"]').type(faker.internet.userName());
    cy.get('[data-testid="confirmPasswordTest"]').type(pass);

    cy.get('[data-testid="btn"]')
      .click()
      .then((a) => {
        cy.wait(4000);
      });
  });
});

export {};
