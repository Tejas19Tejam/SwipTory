import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles.js";
import { Toaster } from "react-hot-toast";

// Presentational Components
import AppLayout from "./ui/AppLayout.jsx";
import Stories from "./pages/Stories";
import Bookmarks from "./pages/Bookmarks";
import PageNoFound from "./pages/PageNotFound";
import { AuthProvider } from "./features/authentication/useAuth.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AuthProvider>
                <AppLayout />
              </AuthProvider>
            }
          >
            <Route index element={<Navigate replace to="stories" />} />
            <Route path="stories" element={<Stories />}></Route>
            <Route path="bookmarks" element={<Bookmarks />}></Route>
          </Route>
          <Route path="*" element={<PageNoFound />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-gray-0)",
            color: "var(--color-gray-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
