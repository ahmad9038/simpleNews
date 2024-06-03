import { BASE_URL } from "../services/helper";

const { createContext, useContext, useReducer, useEffect } = require("react");

const postContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_DATA":
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
      };

    case "QUERY":
      return {
        ...state,
        query: action.payload,
      };

    case "LIMIT":
      return {
        ...state,
        limit: action.payload,
      };

    case "PREV_PAGE":
      let page = state.currentPage;
      if (page > 0) {
        page = 1;
      } else {
        page = page - 1;
      }
      return {
        ...state,
        currentPage: page,
      };

    case "NEXT_PAGE":
      let pages = state.currentPage;
      if (pages >= state.totalPages) {
        pages = 1;
      } else {
        pages = pages + 1;
      }
      return {
        ...state,
        currentPage: pages,
      };

    case "USER_LOGIN":
      localStorage.setItem("admin", JSON.stringify(action.payload));
      return {
        ...state,
        admin: action.payload,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  admin: JSON.parse(window?.localStorage.getItem("admin")) ?? {},
  isLoading: false,
  query: "",
  currentPage: 1,
  totalPages: 1,
  posts: [],
  limit: 10,
  active: false,
  selectedCategory: "All",
};

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPosts = (data) => {
    dispatch({ type: "SAVE_DATA", payload: data });
  };

  const setSearchedText = (text) => {
    dispatch({ type: "QUERY", payload: text });
  };

  const setLimit = (limit) => {
    dispatch({ type: "LIMIT", payload: limit });
  };

  const getPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  const getNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  const adminLogin = (admin) => {
    dispatch({ type: "USER_LOGIN", payload: admin });
  };

  const setCurrentPage = () => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  };

  const setCategory = (category) => {
    setCurrentPage();
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  const getData = async () => {
    const API = `${BASE_URL}/api?page=${state.currentPage}&search=${state.query}&limit=${state.limit}&category=${state.selectedCategory}`;

    try {
      const res = await fetch(API);
      const data = await res.json();

      getPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <postContext.Provider
      value={{
        ...state,
        getPosts,
        setSearchedText,
        getPrevPage,
        getNextPage,
        adminLogin,
        getData,
        setLimit,
        setCategory,
        setCurrentPage,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

const usePostContext = () => {
  return useContext(postContext);
};

export { PostProvider, usePostContext };
