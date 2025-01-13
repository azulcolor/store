import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import PrivateRoute from "./PrivateRoute";
import { BusinessOrder, Business } from "../features/business/pages";
import { ClientOrder, ProductList, Cart } from "../features/client/pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/business"
        element={
          <PrivateRoute allowedRole={1}>
            <Business />
          </PrivateRoute>
        }
      />
      <Route
        path="/business/orders"
        element={
          <PrivateRoute allowedRole={1}>
            <BusinessOrder />
          </PrivateRoute>
        }
      />
      <Route
        path="/client"
        element={
          <PrivateRoute allowedRole={2}>
            <ProductList />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute allowedRole={2}>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/orders"
        element={
          <PrivateRoute allowedRole={2}>
            <ClientOrder />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
