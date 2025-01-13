import { Box, Typography } from '@mui/material';
import { OrderItem } from './OrderItem';

export const OrderList = ({ orders }: { orders: any[] }) => {
  if (orders.length === 0) {
    return <Typography>Your cart is empty</Typography>;
  }

  return (
    <Box>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </Box>
  );
};
