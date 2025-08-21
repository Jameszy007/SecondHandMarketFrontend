import { RouterProvider } from "react-router-dom";
import router from "./app/router.jsx";

export default function App() {
  return <RouterProvider router={router} />;
}
