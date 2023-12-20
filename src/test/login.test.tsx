import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryProviders } from "../providers/providerQuery";
import { faker } from "@faker-js/faker";
import { ContextUser } from "../context/userContext";
import Login from "../components/login/login";
import { LoginApi } from "../axios/user/login.api";
import { setToken } from "../utils/cookie";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../utils/cookie", () => ({
  setToken: jest.fn(),
}));

jest.mock("../axios/user/login.api", () => ({
  LoginApi: jest.fn(),
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

describe("test login", () => {
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
          <Login setLogin={setLoadingFn} />
        </ContextUser.Provider>
      </QueryProviders>
    );
  }

  it("test span login is exsit", () => {
    RenderComponent();
    const login = screen.getByText("login");
    expect(login).toBeInTheDocument();
  });

  it("email input is exist", () => {
    RenderComponent();
    const eamilInput = screen.getByTestId("emailTest");
    expect(eamilInput).toHaveAttribute("type", "email");
    fireEvent.change(eamilInput, { target: { value: emailFn } });
    expect(eamilInput).toHaveValue(emailFn);
  });

  it("password input is exist", () => {
    RenderComponent();
    const passwordInput = screen.getByTestId("passwordTest");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.change(passwordInput, { target: { value: passwordFn } });
    expect(passwordInput).toHaveValue(passwordFn);
  });

  it("title span do you have account is exist", () => {
    RenderComponent();
    const spanTitle = screen.getByTestId("spanTest");
    expect(spanTitle).toBeInTheDocument();
  });

  it("toggle to sign", () => {
    RenderComponent();
    const toPageSign = screen.getByTestId("toSign");
    expect(toPageSign).toBeInTheDocument();
    expect(fireEvent.click(toPageSign)).toBeTruthy();
  });

  it("submit is sucessfuly", async () => {
    RenderComponent();
    const eamilInput = screen.getByTestId("emailTest");
    expect(eamilInput).toHaveAttribute("type", "email");
    fireEvent.change(eamilInput, { target: { value: emailFn } });
    expect(eamilInput).toHaveValue(emailFn);

    const passwordInput = screen.getByTestId("passwordTest");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.change(passwordInput, { target: { value: passwordFn } });
    expect(passwordInput).toHaveValue(passwordFn);

    const submitLogin = screen.getByTestId("sub");
    expect(submitLogin).toBeInTheDocument();
    expect(submitLogin.innerHTML).toMatch("Login");
    fireEvent.click(submitLogin);

    const body = { emailFn, passwordFn };
    (LoginApi as unknown as jest.Mock).mockResolvedValue({
      data: {
        email: body.emailFn,
        password: body.passwordFn,
        tokenFn,
      },
    });
    await waitFor(() => {
      expect(loginFn).toBeCalled();
    });

    (setToken as unknown as jest.Mock).mockResolvedValue(tokenFn);
  });
});

export {};
