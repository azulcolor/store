import { Box, CircularProgress, Typography, Button, Grid } from '@mui/material';
import { useOrderHistory } from '../hooks/useOrderHistory';

export const OrderHistory = () => {
  const { orders, isLoading, error, cancelOrder } = useOrderHistory();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load order history</Typography>;

  const handleCancelOrder = async (orderId: number) => {
    try {
      await cancelOrder(orderId);
      alert('Order canceled successfully');
    } catch (err) {
      alert('Failed to cancel order');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Historial de Órdenes
      </Typography>

      {orders.length === 0 ? (
        <Typography>No tienes órdenes</Typography>
      ) : (
        orders.map((order) => (
          <Box key={order.id} sx={{ mb: 4 }}>
            <Typography variant="h5">Orden #{order.id}</Typography>
            <Typography>Fecha: {new Date(order.createdAt).toLocaleDateString()}</Typography>
            <Typography>Total: ${order.total}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.OrderProducts.map((product) => (
                <Grid item xs={12} key={product.id}>
                  <Typography>
                    {product.Product.name} - ${product.price} x {product.quantity}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            {order.statusId === 2 && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleCancelOrder(order.id)}
                sx={{ mt: 2 }}
              >
                Cancelar Orden
              </Button>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};
