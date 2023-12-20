import { faker } from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { createComment } from "../axios/comment/createComment.api";
import { deleteCommentsApi } from "../axios/comment/deleteComment.api";
import { getAllComments } from "../axios/comment/getAllCommentByPostId.api";
import { updateCommentApi } from "../axios/comment/updateComment.api";

import Comments from "../components/comment/comment";
import { ContextUser } from "../context/userContext";
import { QueryProviders } from "../providers/providerQuery";

jest.mock("../axios/comment/createComment.api", () => ({
  createComment: jest.fn(),
}));

jest.mock("../axios/comment/getAllCommentByPostId.api", () => ({
  getAllComments: jest.fn(),
}));

jest.mock("../axios/comment/deleteComment.api", () => ({
  deleteCommentsApi: jest.fn(),
}));

jest.mock("../axios/comment/updateComment.api", () => ({
  updateCommentApi: jest.fn(),
}));

const emailFn = faker.internet.email();
const passwordFn = faker.datatype.string();

const usernameFn = faker.datatype.string();
const isAunticatedfn = true;
const isLoadingFn = false;
const logoutFn = jest.fn();
const loginFn = jest.fn();
const setLoadingFn = jest.fn();

const dataComment = [
  {
    id: 1,
    Comment: "first comment",
    createAt: faker.date.past(),
  },
  {
    id: 2,
    Comment: "second comment",
    createAt: faker.date.past(),
  },
  {
    id: 3,
    Comment: "third comment",
    createAt: faker.date.past(),
  },
];
const data = { dataComment };

describe("comment", () => {
  function RenderComponent() {
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
          <Comments postId={1} userIdPost={3} />
        </ContextUser.Provider>
      </QueryProviders>
    );
  }

  it("test", async () => {
    const mutate = jest.fn();
    const isLoading = true;
    const error = "";

    // (updateCommentApi as jest.Mock).mockResolvedValue({ mutate, isLoading });
    // (deleteCommentsApi as jest.Mock).mockResolvedValue({ mutate });
    // (createComment as jest.Mock).mockResolvedValue({ mutate, error });
    RenderComponent();
    (getAllComments as jest.Mock).mockReturnValue({ data: dataComment });
    const todoList = await waitFor(() => screen.findAllByTestId("allComment"), {
      timeout: 2000,
    });

    // expect(dataComment).toHaveLength(3);
  });
});
