import { Navigate, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DictionaryPage from "./pages/DictionaryPage/DictionaryPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dictionary" />} />

      <Route
        path="/register"
        element={
          <RestrictedRoute>
            <RegisterPage />
          </RestrictedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <RestrictedRoute>
            <LoginPage />
          </RestrictedRoute>
        }
      />

      <Route
        path="/dictionary"
        element={
          <PrivateRoute>
            <DictionaryPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/recommend"
        element={
          <PrivateRoute>
            <RecommendPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/training"
        element={
          <PrivateRoute>
            <TrainingPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
