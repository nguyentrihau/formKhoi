import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BaiTapFormLifecycle from "./components/BaiTapFormLifecycle/BaiTapFormRedux.jsx";
import Nav from "./components/BaiTapFormLifecycle/Nav/Nav.jsx";
import Page404 from "./components/Page404/Page404.jsx";
// Setup redux store
import { Provider } from "react-redux";
import { store } from "./redux/configStore.jsx";
import BaiTapFormRedux from "./components/BaiTapFormLifecycle/BaiTapFormRedux.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="" element={<Nav />}>
          <Route index element={<BaiTapFormLifecycle />}></Route>
          <Route path="/form" element={<BaiTapFormRedux />}></Route>
          {/* PAGE 404 */}
          <Route path="/page404" element={<Page404 />}></Route>
          <Route path="*" element={<Navigate to="/page404" />}></Route>
        </Route>
      </Routes>
    </Router>
  </Provider>
);
