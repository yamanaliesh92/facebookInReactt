import { faker } from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { forgetPasswordApi } from "../axios/user/forgetPassword.api";
import { restPasswordApi } from "../axios/user/restPassword.api";
import ForgetPasswordModal from "../components/model/forgetPassword";
import { QueryProviders } from "../providers/providerQuery";

jest.mock("../axios/user/forgetPassword.api", () => ({
  forgetPasswordApi: jest.fn(),
}));

jest.mock("../axios/user/restPassword.api", () => ({
  restPasswordApi: jest.fn(),
}));

const setOpen = jest.fn();
const emailFn = faker.internet.email();
const value = faker.datatype.json();
const secretFn = { value };
const passwordFn = faker.internet.userName();

describe("test forgetPassword", () => {
  function RenderCompoent() {
    return render(
      <QueryProviders>
        <BrowserRouter>
          <ForgetPasswordModal open={true} setOpen={setOpen} />
        </BrowserRouter>
      </QueryProviders>
    );
  }

  it("test email exist", async () => {
    RenderCompoent();
    const testEmail = screen.getByTestId("emailModelTest");
    expect(testEmail).toHaveAttribute("type", "email");
    fireEvent.change(testEmail, { target: { value: emailFn } });
    expect(testEmail).toHaveValue(emailFn);
  });
  it("submit forgetPassword", async () => {
    RenderCompoent();
    const testSubmitForgetPassword = screen.getByTestId("btnTest");
    expect(testSubmitForgetPassword).toBeInTheDocument();
    expect(fireEvent.click(testSubmitForgetPassword)).toBeTruthy();
    (forgetPasswordApi as unknown as jest.Mock).mockResolvedValue({
      data: {
        email: emailFn,
        secret: secretFn,
      },
    });

    fireEvent.click(testSubmitForgetPassword);
    await waitFor(async () => {
      expect(screen.getByTestId("form")).toBeInTheDocument();
    });
    const passwordTest = screen.getByTestId("passwordModalTest");
    expect(passwordTest).toHaveAttribute("type", "password");
    fireEvent.change(passwordTest, { target: { value: passwordFn } });
    expect(passwordTest).toHaveValue(passwordFn);

    const secretTest = screen.getByTestId("inputSecretTest");
    expect(secretTest).toHaveAttribute("type", "text");
    expect(secretTest).toHaveValue(secretFn.value);

    (restPasswordApi as unknown as jest.Mock).mockResolvedValue({
      data: {
        eamil: emailFn,
        password: passwordFn,
        secret: secretFn.value,
      },
    });
    const submit = screen.getByTestId("submitTest");
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);
  });
});

export {};
