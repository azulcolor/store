import { Box, Grid, Typography, Button } from '@mui/material';

export const OrderItem = ({ order }: { order: any }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5">Order #{order.id}</Typography>
      <Typography>Subtotal: ${order.subtotal}</Typography>
      <Typography>IVA: ${order.iva}</Typography>
      <Typography>Total: ${order.total}</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {order.OrderProducts.map((product: any) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid>
      <Box>
        <Button variant="contained" color="primary">
          Confirmar Compra
        </Button>
      </Box>
    </Box>
  );
};
