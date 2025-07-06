import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedNumber } from "./animated-number";

describe("AnimatedNumber", () => {
  it("should render with default props", () => {
    const { container } = render(<AnimatedNumber value={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render with custom from value", () => {
    const { container } = render(<AnimatedNumber value={100} from={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
