import { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useOrders } from "../hooks/useOrders";
import { Header } from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { Order } from "../../../types";
import { OrderList } from "../components";
import { AlertSnackbar } from "../../../components/AlertSnackbar";

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
        message: "Orden devuelta satisfactoriamente",
        severity: "success",
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Error en devolver la orden",
        severity: "error",
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error en cargar las órdenes, por favor de volver a intentarlo</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName="Ordenes">
        <Button variant="contained" color="primary" onClick={() => navigator("/business")}>
          Regresar
        </Button>
      </Header>

      {orders.length === 0 ? (
        <Typography>Ordenes no encontradas</Typography>
      ) : (
        orders.map((order: Order) => (
          <OrderList handleReturnOrder={handleReturnOrder} order={order} key={order.id}/>
        ))
      )}

     <AlertSnackbar setSnackbar={setSnackbar} snackbar={snackbar}/> 
    </Box>
  );
};
