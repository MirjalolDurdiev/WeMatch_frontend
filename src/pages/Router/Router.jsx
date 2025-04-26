import { createBrowserRouter } from "react-router-dom";
import Home from "../../components/Home/Home";
import Layout from "../../Layout/Layout";
import Aboutus from "../Aboutus/Aboutus";
import OpportunityDetail from "../OpportunityDetail/OpportunityDetail";
import Profile from "../Profile/Profile";
import ViewMore from "../ViewMore/ViewMore";
import NotFound from "../NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <Aboutus />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/viewmore",
        element: <ViewMore />,
      },
      {
        path: "/cardsid/:id",
        element: <OpportunityDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
