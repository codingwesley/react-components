import * as React from "react";
import { composeStories } from "@storybook/testing-react";
import { mount } from "@cypress/react";
import * as stories from "../../src/stories/Button.stories";

// compile the "Primary" story with the library
const { Primary } = composeStories(stories);

it("button component test example", () => {
  mount(<Primary />);

  cy.contains("Button").should("exist");
});
