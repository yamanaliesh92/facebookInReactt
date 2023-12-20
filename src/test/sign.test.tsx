import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Signup from "../components/signup/signup";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryProviders } from "../providers/providerQuery";
import { registerApi } from "../axios/user/register";
import { faker } from "@faker-js/faker";
import { ContextUser } from "../context/userContext";
import * as ReactImport from "react";
import { setToken } from "../utils/cookie";

jest.mock("../utils/cookie", () => ({
  setToken: jest.fn(),
}));

jest.mock("../axios/user/register", () => ({
  registerApi: jest.fn(),
}));

const emailFn = faker.internet.email();
const passwordFn = faker.datatype.string();
const usernameFn = faker.datatype.string();
const tokenFn = faker.datatype.json();
const isAunticatedfn = true;
const isLoadingFn = false;
const logoutFn = jest.fn();
const loginFn = jest.fn();
const setLoadingFn = jest.fn();

describe("sign", () => {
  function RenderComponent(mockLogin?: jest.MockedFn<any>) {
    const value = {
      isAunticated: isAunticatedfn,
      login: mockLogin ?? loginFn,
      isLoading: isLoadingFn,
      logout: logoutFn,
      email: emailFn,
      username: usernameFn,
      password: passwordFn,
      setLoading: setLoadingFn,
    };

    return render(
      <QueryProviders>
        <ContextUser.Provider value={value as any}>
          <BrowserRouter>
            <Signup setSign={jest.fn()} />
          </BrowserRouter>
        </ContextUser.Provider>
      </QueryProviders>
    );
  }

  it("test input email", () => {
    RenderComponent();

    const email = screen.getByTestId("emailTest");
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute("type", "text");
    expect(fireEvent.change(email, { target: { value: emailFn } })).toEqual(
      true
    );
    expect(email).toHaveValue(emailFn);
  });

  it("test input username", () => {
    RenderComponent();

    const username = screen.getByTestId("usernameTest");
    expect(username).toBeInTheDocument();
    expect(username).toHaveAttribute("type", "text");
    expect(
      fireEvent.change(username, { target: { value: usernameFn } })
    ).toBeTruthy();
    expect(username).toHaveValue(usernameFn);
  });

  it("test input password", () => {
    RenderComponent();

    const password = screen.getByTestId("passwordTest");
    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute("type", "password");
    expect(
      fireEvent.change(password, { target: { value: passwordFn } })
    ).toBeTruthy();
    expect(password).toHaveValue(passwordFn);
  });

  it("test input confirmpassword", () => {
    RenderComponent();

    const confirmPassword = screen.getByTestId("confirmPasswordTest");
    expect(confirmPassword).toBeInTheDocument();
    expect(confirmPassword).toHaveAttribute("type", "password");
    expect(
      fireEvent.change(confirmPassword, { target: { value: passwordFn } })
    ).toBeTruthy();
    expect(confirmPassword).toHaveValue(passwordFn);
  });

  it("test button to login", () => {
    RenderComponent();
    const toLogin = screen.getByTestId("data-to-login");
    fireEvent.click(toLogin);
    expect(fireEvent.click(toLogin)).toBeTruthy();
    expect(toLogin.innerHTML).toMatch("Login");
    expect(toLogin).toBeInTheDocument();
  });

  it("test h3 in sign", () => {
    RenderComponent();
    const h3 = screen.getByText("signs");
    expect(h3).toBeInTheDocument();
  });

  it("test confiremPassword is correct", () => {
    RenderComponent();
    const confirm = screen.queryByRole("* confirm password is not same");
    expect(confirm).not.toBeInTheDocument();
  });

  it("test submit is correctly", async () => {
    const login = jest.fn();
    jest.spyOn(ReactImport, "useContext").mockImplementation(() => ({
      login,
      logout: jest.fn(),
      setLoading: setLoadingFn,
    }));
    RenderComponent(login);

    const body = { emailFn, passwordFn, usernameFn };

    const emailInput = screen.getByTestId("emailTest");
    expect(emailInput).toHaveAttribute("type", "text");
    fireEvent.change(emailInput, { target: { value: emailFn } });
    expect(emailInput).toHaveValue(emailFn);

    const passwordInput = screen.getByTestId("passwordTest");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.change(passwordInput, { target: { value: passwordFn } });
    expect(passwordInput).toHaveValue(passwordFn);

    const usernameInput = screen.getByTestId("usernameTest");
    expect(usernameInput).toHaveAttribute("type", "text");
    fireEvent.change(usernameInput, { target: { value: usernameFn } });
    expect(usernameInput).toHaveValue(usernameFn);

    const confirmPassword = screen.getByTestId("confirmPasswordTest");
    expect(confirmPassword).toHaveAttribute("type", "password");
    fireEvent.change(confirmPassword, { target: { value: passwordFn } });
    expect(confirmPassword).toHaveValue(passwordFn);

    const messagePasswordIsNotCorrect = screen.queryByRole(
      "* confirm password is not same"
    );
    expect(messagePasswordIsNotCorrect).not.toBeInTheDocument();

    expect(passwordInput).toHaveAttribute("type", "password");
    (registerApi as unknown as jest.Mock).mockResolvedValue({
      data: {
        user: {
          email: body.emailFn,
          username: body.usernameFn,
          token: faker.internet.userName(),
        },
      },
    });
    (setToken as unknown as jest.Mock).mockResolvedValue(tokenFn);
    const submit = screen.getByTestId("btn");
    fireEvent.click(submit);
    await waitFor(
      () => {
        expect(login).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it("confirmPasswordis different with password", async () => {
    const login = jest.fn();
    jest.spyOn(ReactImport, "useContext").mockImplementation(() => ({
      login,
      logout: jest.fn(),
      setLoading: setLoadingFn,
    }));
    RenderComponent(login);

    const diffrentPassword = "tttasf";

    const body = { emailFn, passwordFn, usernameFn };

    const emailInput = screen.getByTestId("emailTest");
    expect(emailInput).toHaveAttribute("type", "text");
    fireEvent.change(emailInput, { target: { value: emailFn } });
    expect(emailInput).toHaveValue(emailFn);

    const passwordInput = screen.getByTestId("passwordTest");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.change(passwordInput, { target: { value: passwordFn } });
    expect(passwordInput).toHaveValue(passwordFn);

    const usernameInput = screen.getByTestId("usernameTest");
    expect(usernameInput).toHaveAttribute("type", "text");
    fireEvent.change(usernameInput, { target: { value: usernameFn } });
    expect(usernameInput).toHaveValue(usernameFn);

    expect(passwordInput).toHaveAttribute("type", "password");
    (registerApi as unknown as jest.Mock).mockResolvedValue({
      data: {
        user: {
          email: body.emailFn,
          username: body.usernameFn,
          token: faker.internet.userName(),
        },
      },
    });
    (setToken as unknown as jest.Mock).mockResolvedValue(tokenFn);
    const submit = screen.getByTestId("btn");
    fireEvent.click(submit);

    const confirmPasswordInput = screen.getByTestId("confirmPasswordTest");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: diffrentPassword },
    });
    expect(confirmPasswordInput).toHaveValue(diffrentPassword);

    await waitFor(() => {
      const messagePasswordIsNotCorrect = screen.queryByTestId("span");
      expect(messagePasswordIsNotCorrect).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(login).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
