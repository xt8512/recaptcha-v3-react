import { createBrowserRouter } from "react-router-dom";
// pages
import ToGoogle from '@/pages/ToGoogle'
import LoginV2 from "@/pages/LoginV2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ToGoogle />,
  },
  {
    path: "/v2",
    element: <LoginV2 />
  }
]);

export default router;
