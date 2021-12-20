import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { Todo } from "..";
import * as api from "../api";

const todos = [
  { id: "1", name: "wesley.chen", complete: true },
  { id: "2", name: "joy", complete: false },
];

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("useTodoList test", () => {
  let mockFetchTodoList = jest.spyOn(api, "fetchTodoList");
  let container: null | HTMLDivElement = null;

  beforeEach(() => {
    mockFetchTodoList.mockResolvedValue(todos);
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it("fetch api call", () => {
    act(() => {
      render(<Todo title="test title" />, container);
    });

    expect(mockFetchTodoList).toBeCalled();
    expect(container?.textContent).toContain("test title")
  });
});
