import { createBrowserRouter } from "react-router-dom";
import Lobby from "./Lobby";
import Room from "./Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby></Lobby>,
    children: [
      {
        path: ":room",
        element: <Room />,
      },
    ],
  },
]);

export { router };
