import { createBrowserRouter } from "react-router-dom";
// pages
import LoginV2 from "@/pages/LoginV2";
import ToGoogle from '@/pages/ToGoogle'
import ToGoogleBoth from "@/pages/ToGoogleBoth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ToGoogle />,
  },
  {
    path: "/v2",
    element: <LoginV2 />
  },
  {
    path:"/both",
    element: <ToGoogleBoth />
  }
]);

export default router;
