import { createBrowserRouter } from "react-router-dom";
// pages
import LoginV3 from '@/pages/LoginV3'
import LoginV2 from "@/pages/LoginV2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginV3 />,
  },
  {
    path: "/v2",
    element: <LoginV2 />
  }
]);

export default router;
