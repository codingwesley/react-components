import { composeStories } from "@storybook/testing-react";
import { mount } from "@cypress/react";
import * as stories from "../../src/stories/Todo.stories";

const { TodoDefault } = composeStories(stories);

describe("Todo List", () => {
  beforeEach(() => {
    // GIVEN
    cy.intercept("GET", "/api/todos", {
      body: [
        { id: "1", name: "wesley.chen", complete: true },
        { id: "2", name: "joy", complete: false },
      ],
    }).as("queryUser");
    mount(<TodoDefault />);
    cy.wait("@queryUser");
  });

  it("todo component test example", () => {
    cy.contains("joy").should("exist");
    cy.contains("wesley.chen").should("exist");
  });

  it.only("todo item toggle", () => {
    // WHEN active
    cy.get(`[data-role="todo-item"]:contains("joy") label`).click();

    // THEN
    cy.get(`[data-role="todo-item"]:contains("joy")`)
      .find(".ant-checkbox-wrapper-checked")
      .should("exist");

    // WHEN inactive
    cy.get(`[data-role="todo-item"]:contains("joy") label`).click();

    // THEN
    cy.get(`[data-role="todo-item"]:contains("joy")`)
      .find(".ant-checkbox-wrapper-checked")
      .should("not.exist");
  });
});
