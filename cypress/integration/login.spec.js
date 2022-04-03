describe("Login with mock user account", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Display two input boxes for login page", () => {
    cy.get(".login-form-container input").should("have.length", 2);
  });

  it("Login with accounts and get into main page", () => {
    const userAccount = {
      email: "test123123@naver.com",
      password: "12341234",
    };

    cy.get('input[name="email"]').type(userAccount.email).should("have.value", userAccount.email);
    cy.get('input[name="password"]').type(`${userAccount.password}{enter}`);

    cy.url().should("eq", "http://localhost:3000/");
  });
});
