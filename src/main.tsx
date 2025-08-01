import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleAuth: string = import.meta.env.VITE_AUTH_GOOGLE_CLIENT_ID ?? "";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleAuth}>
    <App />
  </GoogleOAuthProvider>
);
