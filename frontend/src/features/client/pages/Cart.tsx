import { useState } from "react";
import { useCart } from "../../client/hooks/useCart";
import { Box, CircularProgress, Typography, Button, IconButton, Grid, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { OrderList } from "../components/cart/OrderList";
import { AlertSnackbar } from "../components/cart";

export const Cart = () => {
  const { cart, isLoading, error, addOrUpdateProduct, removeProduct, checkout } = useCart();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>(
    {
      open: false,
      message: "",
      severity: "success",
    }
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load cart</Typography>;

  const handleAddProduct = async (productId: number, quantity: number) => {
    try {
      await addOrUpdateProduct(productId, quantity);
      setSnackbar({ open: true, message: "Se actualizó correctamente", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    try {
      await removeProduct(productId);
      setSnackbar({ open: true, message: "Se removió correctamente", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleCheckout = async (orderId: number) => {
    console.log(orderId);
    try {
      await checkout(orderId);
      setSnackbar({ open: true, message: "Tu compra se realizó con éxito", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.error || "Falló tu compra", severity: "error" });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
        <Header pageName="Carrito de compras">
          <Button variant="contained" color="primary" onClick={() => navigate(-1)} >
            Regresar
          </Button>
        </Header>

      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        cart.map((order: any) => (
          <Box key={order.id} sx={{ mb: 9 }}>
            <Typography variant="h5">Orden: {order.id}</Typography>
            <Typography>Subtotal: ${order.subtotal}</Typography>
            <Typography>IVA: ${order.iva}</Typography>
            <Typography>Total: ${order.total}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.OrderProducts.map((orderProduct: any) => (
                <OrderList orderProduct={orderProduct} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} key={orderProduct.id}/>
              ))}
            </Grid>
            <Box>
              <Button variant="contained" color="primary" onClick={() => handleCheckout(order.id)}>
                Confirmar Compra
              </Button>
            </Box>
          </Box>
        ))
      )}
      <AlertSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </Box>
  );
};
