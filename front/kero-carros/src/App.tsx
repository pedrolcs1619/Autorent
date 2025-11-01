import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedLayout from "./components/ProtectedLayout";
import CarsPage from "./pages/CarsPage";
import ReservationsPage from "./pages/ReservationsPage";
import ClientsPage from "./pages/ClientsPage";

const isAuthenticated = () => !!localStorage.getItem("token");

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <DashboardPage />
              </ProtectedLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/cars"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <CarsPage />
              </ProtectedLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/reservations"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <ReservationsPage />
              </ProtectedLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/clients"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <ClientsPage />
              </ProtectedLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
