import IssueModal from "../../pages/IssueModal";

describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.contains(issueTitle).click();
      });
  });

  const issueTitle = "This is an issue of type: Task.";

  it("Should delete issue successfully", () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
  });

  it("Should cancel deletion process successfully", () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    cy.contains(issueTitle).should("be.visible");
  });
});
