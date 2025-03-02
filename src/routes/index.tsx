import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import UsernamePage from "../pages/username";
import GamePage from "../pages/game";
import Layout from "../layout";
import { Suspense } from "react";
import Loader from "../components/Loader";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      }
    >
      <Route index element={<App />} />
      <Route path="/username" element={<UsernamePage />} />
      <Route path="/game" element={<GamePage />} />
    </Route>
  )
);
