import { render, screen } from "@testing-library/react";
import { TextInput } from ".";
import userEvent from "@testing-library/user-event";

describe("<TextInput />", () => {
  test("should have a value of searchValue", () => {
    const fn = jest.fn();
    render(
      <TextInput
        searchValue="test"
        handleChange={fn}
      />
    );

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("test");
  });

  test("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = "value";

    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  test("should match snapshot", () => {
    const { container } = render(<TextInput />);
    expect(container).toMatchSnapshot();
  });
});
