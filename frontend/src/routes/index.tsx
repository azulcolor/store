import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "./PrivateRoute";
import { Business } from "../features/business/pages/Business";
import { ProductList } from "../features/client/pages/ProductList";
import { Cart } from "../features/client/pages/Cart";
import { BusinessOrder } from "../features/business/pages/BusinessOrder";
import { ClientOrder } from "../features/client/pages/ClientOrder";

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
