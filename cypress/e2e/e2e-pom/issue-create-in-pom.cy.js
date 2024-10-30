/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

import { faker } from "@faker-js/faker";

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        //open isse creation modal
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  //data set with which we are creating issue, saved as variable
  const issueDetails = {
    title: "TEST_TITLE",
    type: "Bug",
    description: "TEST_DESCRIPTION",
    assignee: "Lord Gaben",
  };

  //number of issues we expect to see in the backlog after the test
  const EXPECTED_AMOUNT_OF_ISSUES = "5";

  it("Should create issue successfully", () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
  });

  const secondIssueDetails = {
    title: "Bug",
    description: "My bug description",
    type: "Bug",
    priority: "Highest",
    reporter: "Pickle Rick",
    assignee: "Lord Gaben",
  };

  it("Should create second issue successfully", () => {
    IssueModal.createIssue(secondIssueDetails);
    IssueModal.ensureIssueIsCreated(
      EXPECTED_AMOUNT_OF_ISSUES,
      secondIssueDetails
    );
  });

  const randomTitle = faker.lorem.words(1);
  const description = faker.lorem.words(5);
  const fakerIssue = {
    title: randomTitle,
    description: description,
    type: "Task",
    priority: "Low",
    reporter: "Baby Yoda",
    assignee: "Lord Gaben",
  };

  it("Create a third issue using faker data", () => {
    IssueModal.createIssue(fakerIssue);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, fakerIssue);
  });
});
