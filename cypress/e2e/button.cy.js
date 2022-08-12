describe("ButtonController", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/button");
  });
  it("role attribute should be set", () => {
    cy.findByRole("button", { name: "Click me" }).should("exist");
  });
  it("tabindex attribute should be set", () => {
    cy.findByRole("button", { name: "Click me" }).should(
      "have.attr",
      "tabindex",
      "0"
    );
  });
  it("should be clickable via click", () => {
    cy.findByRole("button", { name: "Click me" }).click();
    cy.get("output").should("have.text", "clicked");
  });
  it("should be clickable via space key", () => {
    cy.findByRole("button", { name: "Click me" }).type(" ");
    cy.get("output").should("have.text", "clicked");
  });
  it("should be clickable via enter key", () => {
    cy.findByRole("button", { name: "Click me" }).type("{enter}");
    cy.get("output").should("have.text", "clicked");
  });
  it("should be clickable with shift keys", () => {
    cy.findByRole("button", { name: "Click me" }).type("{shift}{enter}");
    cy.get("output").should("have.text", "clicked (shift)");
  });
});
