import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import People from "./components/pages/People/People";
import PeopleDetail from "./components/pages/People/PeopleDetail/PeopleDetail";
import config from "./config/app.json"

const apiUrl = config.baseUrl = 'FLEXIDEV.REACT.TEST'
const router = createBrowserRouter([
  {
    path: apiUrl+"/",
    Component: People
  },
  {
    path: apiUrl+"/:id",
    Component: PeopleDetail
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);