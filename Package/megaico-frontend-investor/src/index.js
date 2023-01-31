import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./Redux/actions/actions";
if (localStorage.token) setAuthToken(localStorage.token);
const AppIndex = () => {
  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      let user = JSON.parse(localStorage.getItem("userDetails"));
      store.dispatch(loadUser(user._id));
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppIndex />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
