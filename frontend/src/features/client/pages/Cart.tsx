import { Box, CircularProgress, Typography, Button, Grid } from "@mui/material";
import { useCart } from "../../client/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { OrderList } from "../components/cart/OrderList";
import { AlertSnackbar } from "../../../components/AlertSnackbar";
import { Order, OrderProduct } from "../../../types";
import { OrderInfo } from "../components/orders/OrderInfo";

export const Cart = () => {
  const { cart, isLoading, error, addOrUpdateProduct, removeProduct, checkout, snackbar, setSnackbar } = useCart();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error al cargar el carrito</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName="Carrito">
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Regresar
        </Button>
      </Header>

      {cart.length === 0 ? (
        <Typography>Tu carro está vacío</Typography>
      ) : (
        cart.map((order: Order) => (
          <Box key={order.id} sx={{ mb: 9 }}>
            <OrderInfo order={order}/>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.OrderProducts.map((orderProduct: OrderProduct) => (
                <OrderList
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                  handleAddProduct={(productId, quantity) => addOrUpdateProduct(productId, quantity)}
                  handleRemoveProduct={(productId) => removeProduct(productId)}
                />
              ))}
            </Grid>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => checkout(order.id)}
              >
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

