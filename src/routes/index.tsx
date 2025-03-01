import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import UsernamePage from "../pages/username";
import GamePage from "../pages/game";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/username" element={<UsernamePage />} />
      <Route path="/game" element={<GamePage />} />
    </Route>
  )
);
