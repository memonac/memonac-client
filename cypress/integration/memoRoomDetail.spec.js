describe("Make new memo and delete memo", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.findByPlaceholderText(/please enter email address/i).type(
      "coolsteve@naver.com"
    );
    cy.findByPlaceholderText(/please enter password/i).type("12341234{enter}");

    cy.findByRole("heading", { name: /memona c/i }).should("exist");

    cy.findByText("test").click();
  });

  it("Create a new memo of type text", () => {
    cy.findByRole("button", { name: /new/i }).click();

    cy.findByText(/new memo/i).should("exist");

    cy.get("[name='memoType']").check("text").should("be.checked");
    cy.get("[name='memoColor']").check("#ea907a").should("be.checked");

    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${
      currentDate.getMonth() < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1
    }-${currentDate.getDate() + 1}`;

    cy.get("[name='alarmDate']").type(dateString);
    cy.get("[name='alarmTime']").type("00:53");

    cy.findByRole("textbox").type("test");

    cy.findByRole("button", { name: /save/i }).click();

    cy.get(".memo-wrapper").should("have.length", 1);
  });

  it("Delete a memo ot type text", () => {
    cy.get(".memo-wrapper").get(".close").click().should("have.length", 0);
  });
});
