import * as React from "react";
import { composeStories } from "@storybook/testing-react";
import { mount } from "@cypress/react";
import * as stories from "../../src/stories/Todo.stories";

const { TodoDefault } = composeStories(stories);

it("todo component test example", () => {
  cy.intercept("GET", "/api/user", {
    body: { name: "wesley.chen" },
  }).as("queryUser");

  mount(<TodoDefault />);

  cy.wait("@queryUser");
  cy.contains("hello").should("exist");
  cy.contains("wesley.chen").should("exist");
});
