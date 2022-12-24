import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DataForm from "./pages/DataForm";
import ListDataTable from "./pages/ListDataTable";
import LayoutDashboard from "./layouts/LayoutDashboard";
import LayoutLanding from "./layouts/LayoutLanding";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Lowongan from "./pages/Lowongan";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProfileUser from "./pages/ProfileUser";
import ChangePassword from "./pages/ChangePassword";
import { GlobalProvider } from "./context/GlobalContext";
import { Auth, AuthDashboard } from "./Auth";
import DetailJob from "./pages/DetailJob";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route
              path="/"
              element={
                <LayoutLanding>
                  <Home />
                </LayoutLanding>
              }
            />
            <Route
              path="/lowongan"
              element={
                <LayoutLanding>
                  <Lowongan />
                </LayoutLanding>
              }
            />
            <Route
              path="/lowongan/:jobtitle"
              element={
                <LayoutLanding>
                  <Lowongan />
                </LayoutLanding>
              }
            />
            <Route
              path="/detail-job/:idData"
              element={
                <LayoutLanding>
                  <DetailJob />
                </LayoutLanding>
              }
            />
            <Route
              path="/login"
              element={
                <Auth>
                  <Login />
                </Auth>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="dashboard"
              element={
                <AuthDashboard>
                  <LayoutDashboard>
                    <Dashboard />
                  </LayoutDashboard>
                </AuthDashboard>
              }
            />
            <Route
              path="dashboard/list-job-vacancy"
              element={
                <LayoutDashboard>
                  <ListDataTable />
                </LayoutDashboard>
              }
            />
            <Route
              path="dashboard/list-job-vacancy/form"
              element={
                <LayoutDashboard>
                  <DataForm />
                </LayoutDashboard>
              }
            />
            <Route
              path="dashboard/list-job-vacancy/edit/:idData"
              element={
                <LayoutDashboard>
                  <DataForm />
                </LayoutDashboard>
              }
            />
            <Route
              path="dashboard/profile"
              element={
                <LayoutDashboard>
                  <ProfileUser />
                </LayoutDashboard>
              }
            />
            <Route
              path="dashboard/change-password"
              element={
                <LayoutDashboard>
                  <ChangePassword />
                </LayoutDashboard>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
