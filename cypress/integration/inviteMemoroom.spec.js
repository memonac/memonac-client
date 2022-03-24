describe("Make a invite memo room test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    const user = {
      email: "test123123@naver.com",
      password: "12341234",
    };

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(`${user.password}{enter}`);
  });

  it("invites participant when a result is success", () => {
    cy.contains("New")
    .click()
    .get('input[name="name"]')
    .type("New Memo Room{enter}");

    cy.contains("Share")
      .click()
      .get('input[name="email"]').type("suin0212@gmail.com{enter}")
    
    cy.get(".message").should("have.text", "Success to send mail 👍🏻 ");
  });

  it("Not invites participant when a result is error", () => {
    cy.contains("New")
    .click()
    .get('input[name="name"]')
    .type("New Memo Room{enter}");

    cy.contains("Share")
      .click()
      .get('input[name="email"]').type("error@gmail.com{enter}")
    
    cy.get(".message").should("have.text", "❗️ Not Found User");
  });
});
