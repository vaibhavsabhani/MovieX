import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./store/Store.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routesConfig.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <RouterProvider router={routes} />
  </Provider>
);
