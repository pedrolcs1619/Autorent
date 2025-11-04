// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedLayout from "./routes/ProtectedLayout";

import DashboardPage from "./pages/DashboardPage";
import CarsPage from "./pages/CarsPage";
import ReservationsPage from "./pages/ReservationsPage";
import ClientsPage from "./pages/ClientsPage";
import CategoriaPage from "./pages/CategoriaPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Todas essas rotas ficam dentro do layout protegido */}
          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                <DashboardPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/cars"
            element={
              <ProtectedLayout>
                <CarsPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedLayout>
                <ReservationsPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedLayout>
                <ClientsPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/categoria"
            element={
              <ProtectedLayout>
                <CategoriaPage />
              </ProtectedLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
