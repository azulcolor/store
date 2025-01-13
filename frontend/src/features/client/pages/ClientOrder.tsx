import { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Header } from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { Order } from "../../../types";
import { AlertSnackbar } from "../../../components/AlertSnackbar";
import { useOrderHistory } from "../hooks/useOrderHistory";
import { OrderList } from "../components/orders/OrderList";

export const ClientOrder = () => {
  const { orders, isLoading, error, cancelOrder } = useOrderHistory();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const navigator = useNavigate();

  const handleCancelOrder = async (orderId: number) => {
    try {
      await cancelOrder(orderId);
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
        <Button variant="contained" color="primary" onClick={() => navigator("/client")}>
          Regresar
        </Button>
      </Header>

      {orders.length === 0 ? (
        <Typography>Ordenes no encontradas</Typography>
      ) : (
        orders.map((order: Order) => (
          <OrderList handleCancelOrder={handleCancelOrder} order={order} key={order.id}/>
        ))
      )}

     <AlertSnackbar setSnackbar={setSnackbar} snackbar={snackbar}/> 
    </Box>
  );
};
