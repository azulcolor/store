import { Typography } from "@mui/material";
import { Order } from "../../../../types";

interface Props {
  order: Order;
}

export const OrderInfo = ({ order }: Props) => {
  return (
    <>
      <Typography variant="h5">Orden: {order.id}</Typography>
      <Typography>Subtotal: ${order.subtotal}</Typography>
      <Typography>IVA: ${order.iva}</Typography>
      <Typography>Total: ${order.total}</Typography>
    </>
  );
};
