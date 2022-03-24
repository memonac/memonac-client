describe("Make a new memoroom test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    const userAccount = {
      email: "test123123@naver.com",
      password: "12341234",
    };

    cy.get('input[name="email"]').type(userAccount.email);
    cy.get('input[name="password"]').type(`${userAccount.password}{enter}`);
  });

  it("Move to a new memoroom detail page when a result is success", () => {
    cy.contains("New")
      .click()
      .get('input[name="name"]')
      .type("New Memo Room{enter}");

    cy.contains("New Memo Room");
    cy.get(".left-box img").click();
    cy.get(".memoroom-content").should("have.length", 1);
  });

  it("Do not move to a new memoroom detail page when there is no title text", () => {
    cy.contains("New").click().get('input[name="name"]').type("{enter}");

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Delete an existed memoroom", () => {
    cy.contains("New Memo Room").get(".menu-bar").children().eq(1).click();

    cy.get(".delete-button").click()
    cy.get("button").within(() => {
      cy.contains("DELETE").click()
    });

    cy.get(".memoroom-content").should("have.length", 0);
  });
});
