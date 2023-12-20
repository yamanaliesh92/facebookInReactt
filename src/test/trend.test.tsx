import { render, screen } from "@testing-library/react";
import Trend from "../components/trend/trend";

describe("trend test", () => {
  it("h2 is exsit", () => {
    render(<Trend />);
    const titleH3 = screen.getByText("tends for you");
    expect(titleH3).toBeInTheDocument();
  });
});
export {};
