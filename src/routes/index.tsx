import { createBrowserRouter } from "react-router-dom";
import { rootRoute } from "./root";
import { homeRoute } from "./home";

const routes = [rootRoute, homeRoute];

export const router = createBrowserRouter(routes);
