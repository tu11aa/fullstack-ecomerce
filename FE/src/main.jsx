import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth/AuthContext";
import ShopProvider from "./contexts/shop/ShopContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ShopProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ShopProvider>
    </AuthProvider>
  </BrowserRouter>
);
