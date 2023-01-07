import SingleDice from "@/components/SingleDice.vue";
import { describe, expect, test } from "vitest";
import { render } from "@testing-library/vue";

describe("SingleDice", () => {
  test("should render a dice", () => {
    const wrapper = render(SingleDice, {
      props: {
        diceNo: 2,
      },
    });

    expect(wrapper.baseElement.getElementsByTagName("svg").length).toEqual(1);
  });
});
