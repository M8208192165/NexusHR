import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashBoardPage";
import AttendancePage from "./pages/AttendancePage";
import LeavePage from "./pages/LeavePage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><DashboardPage /></ProtectedRoute>
      } />
      <Route path="/attendance" element={
        <ProtectedRoute><AttendancePage /></ProtectedRoute>
      } />
      <Route path="/leaves" element={
        <ProtectedRoute><LeavePage /></ProtectedRoute>
      } />
    </Routes>
  );
}