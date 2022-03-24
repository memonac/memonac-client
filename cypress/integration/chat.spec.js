describe("Make a chat test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    const user = {
      email: "test123123@naver.com",
      password: "12341234",
    };

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(`${user.password}{enter}`);
  });

  it("chat test", () => {
    cy.contains("New")
      .click()
      .get('input[name="name"]')
      .type("New Memo Room{enter}");

    cy.contains("Chat Open").click();

    cy.get('input[name="message"]').type("test{enter}");
    cy.get(".chat-list-container").should("have.length", 1);
  });
});
