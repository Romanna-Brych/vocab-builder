import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DictionaryPage from "./pages/DictionaryPage/DictionaryPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import { refreshUser } from "./redux/auth/operations";
import {
  selectIsRefreshing,
  selectToken,
  selectIsInitialized,
  selectIsLoggedIn,
} from "./redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { authInitialized } from "./redux/auth/authSlice";
import Header from "./components/Header/Header";
import LoadingState from "./components/LoadingState";

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const isInitialized = useAppSelector(selectIsInitialized);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    } else {
      dispatch(authInitialized());
    }
  }, [dispatch, token]);

  if (!isInitialized || isRefreshing) {
    return <LoadingState />;
  }

  if (isRefreshing) {
    return <LoadingState />;
  }

  return (
    <>
      {isLoggedIn && <Header />}
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
    </>
  );
}

export default App;
