import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { getOwnInfoApi } from "../axios/info/getOwnInfo.api";
import InfoCard from "../components/infoCard/infoCard";
import { ContextUser } from "../context/userContext";

import { QueryProviders } from "../providers/providerQuery";
import { removeToken } from "../utils/cookie";
jest.mock("../axios/info/getOwnInfo.api", () => ({
  getOwnInfoApi: jest.fn(),
}));

jest.mock("../utils/cookie", () => ({
  removeToken: jest.fn(),
}));

const emailFn = faker.internet.email();
const passwordFn = faker.datatype.string();
const workAtFn = faker.datatype.string();
const countryFn = faker.datatype.string();
const livesInFn = faker.datatype.string();
const relationShipFn = faker.datatype.string();
const usernameFn = faker.datatype.string();
const isAunticatedfn = true;
const isLoadingFn = false;
const logoutFn = jest.fn();
const loginFn = jest.fn();
const setLoadingFn = jest.fn();

describe("infoCard", () => {
  function renders() {
    const value = {
      isAunticated: isAunticatedfn,
      login: loginFn,
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
            <InfoCard />
          </BrowserRouter>
        </ContextUser.Provider>
      </QueryProviders>
    );
  }

  it("test info card and gatApi", () => {
    (getOwnInfoApi as jest.Mock).mockResolvedValue({
      data: {
        workAtFn,
        relationShipFn,
        countryFn,
        livesInFn,
      },
    });
    renders();
    const login = screen.getByTestId("d");
    expect(login).toBeInTheDocument();
    const work = screen.getByTestId("work");
    const country = screen.getByTestId("country");
    const status = screen.getByTestId("status");
    const livein = screen.getByTestId("live in");
    expect(work).toHaveTextContent("works at:");
    const updateButton = screen.getByTestId("update");
    expect(updateButton).toHaveTextContent("update");
    expect(country).toHaveTextContent("country:");
    expect(status).toHaveTextContent("statue:");
    expect(livein).toHaveTextContent("Lives in:");
  });
  it("logout  is done", () => {
    renders();
    const logout = screen.getByTestId("logout");
    expect(logout).toHaveTextContent("Logout");
    fireEvent.click(logout);

    expect(removeToken).toBeCalled();
  });
});

export {};
