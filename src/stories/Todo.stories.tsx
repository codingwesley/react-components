import { ComponentStory, Meta } from "@storybook/react";
import { Todo } from "./../components/Todo";

export default {
  title: "Todo",
  component: Todo,
} as Meta;

const Template: ComponentStory<typeof Todo> = (args) => <Todo {...args} />;

export const TodoDefault = Template.bind({});
TodoDefault.args = {
  title: "Demo todo",
};
