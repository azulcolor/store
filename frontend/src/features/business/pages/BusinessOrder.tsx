import { useState } from "react";
import { Box, Typography, Grid, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useOrders } from "../hooks/useOrders";
import { Header } from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { Order } from "../../../types";

export const BusinessOrder = () => {
  const { orders, isLoading, error, returnOrder } = useOrders();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const navigator = useNavigate();

  const handleReturnOrder = async (orderId: number) => {
    try {
      await returnOrder(orderId);
      setSnackbar({
        open: true,
        message: "Order returned successfully!",
        severity: "success",
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Failed to return order.",
        severity: "error",
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load orders. Please try again.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName="Ordenes">
        <Button variant="contained" color="primary" onClick={() => navigator("/business")}>
          Regresar
        </Button>
      </Header>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order: Order) => (
          <Box key={order.id} sx={{ mb: 4, p: 2, border: "1px solid #ccc" }}>
            <Typography variant="h6">Orden {order.id}</Typography>
            <Typography>Id de usuario: {order.userId}</Typography>
            <Typography>Estatus: {order.statusId}</Typography>
            <Typography>Subtotal: ${order.subtotal}</Typography>
            <Typography>IVA: ${order.iva}</Typography>
            <Typography>Total: ${order.total}</Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.OrderProducts.map((orderProduct: any) => (
                <Grid item xs={12} key={orderProduct.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{orderProduct.Product.name}</Typography>
                      <Typography>Precio: ${orderProduct.price}</Typography>
                      <Typography>Pruductos: {orderProduct.quantity}</Typography>
                      <Typography>Subtotal: ${orderProduct.price * orderProduct.quantity}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {order.statusId !== 4 && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleReturnOrder(order.id)}
                sx={{ mt: 2 }}
              >
                Devolver orden
              </Button>
            )}
          </Box>
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
