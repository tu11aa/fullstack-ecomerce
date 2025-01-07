import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ProviderWrapper from "./components/utils/ProviderWrapper";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { routes } from "./routes/RouteConfig";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes.map(
            ({
              path,
              element: Element,
              providers = [],
              isProtected = false,
            }) => (
              <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <ProtectedRoute>
                      <ProviderWrapper providers={providers}>
                        <Element />
                      </ProviderWrapper>
                    </ProtectedRoute>
                  ) : (
                    <ProviderWrapper providers={providers}>
                      <Element />
                    </ProviderWrapper>
                  )
                }
              />
            )
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

const wrapWithProviders = (Element, providers = []) => (
  <ProviderWrapper providers={providers}>
    <Element />
  </ProviderWrapper>
);
