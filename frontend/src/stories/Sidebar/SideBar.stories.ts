import type { Meta, StoryObj } from "@storybook/react-vite";


import SideBar from "../../components/layout/PrivateLayout/SideBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Layout/SideBar",
  component: SideBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {

    primary: { control: "boolean" },
  },

} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {
  },
};

export const DarkMode: Story = {
  args: {

  },
};
