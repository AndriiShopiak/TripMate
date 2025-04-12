import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NewTrip from "../pages/NewTrip";
import { RoutesEnum } from "./RoutesEnum";
import TripPage from "../pages/TripPage";
import LoginPage from "../pages/LoginPage";
import DashBoard from "../pages/DashBoard";
import RegistartionPage from "../pages/Registration";

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) return <div>Завантаження...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesEnum.MAIN} element={user ? <Navigate to={RoutesEnum.DASHBOARD} /> : <Navigate to={RoutesEnum.LOGIN} />} />
        <Route path={RoutesEnum.LOGIN} element={user ? <Navigate to={RoutesEnum.DASHBOARD} /> : <LoginPage />} />
        <Route path={RoutesEnum.REGISTER} element={user ? <Navigate to={RoutesEnum.DASHBOARD} /> : <RegistartionPage />} />
        <Route path={RoutesEnum.DASHBOARD} element={user ? <DashBoard /> : <Navigate to={RoutesEnum.LOGIN} />} />
        <Route path={RoutesEnum.NEW_TRIP} element={user ? <NewTrip /> : <Navigate to={RoutesEnum.LOGIN} />} />
        <Route path={RoutesEnum.TRIP} element={user ? <TripPage /> : <Navigate to={RoutesEnum.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
}
