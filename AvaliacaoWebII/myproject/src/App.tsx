import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CarsPage from "./pages/CarsPage";
import ReservationsPage from "./pages/ReservationsPage";
import ClientsPage from "./pages/ClientsPage";
import CategoriaAdd from "./pages/CategoriaPage";
import ProtectedLayout from "./components/ProtectedLayout";
import CategoriaPage from "./pages/CategoriaPage";

const isAuthenticated = () => !!localStorage.getItem("token");

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rotas protegidas */}
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
        <Route
          path="/categoria"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <CategoriaPage />
              </ProtectedLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
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

        {/* Rota catch-all: redireciona para login se nenhum path combinar */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
