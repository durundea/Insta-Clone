import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../components/atoms/Button";

describe("Button", () => {
  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Like</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Like" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
