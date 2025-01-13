import { Typography } from "@mui/material";
import { OrderProduct } from "../../../../types";

interface Props {
  orderProduct: OrderProduct;
}

export const ProductInfo = ({ orderProduct }: Props) => {
  return (
    <>
      <Typography variant="h6">{orderProduct.Product.name}</Typography>
      <Typography>Precio: ${orderProduct.price}</Typography>
      <Typography>Pruductos: {orderProduct.quantity}</Typography>
      <Typography>Subtotal: ${orderProduct.price * orderProduct.quantity}</Typography>
    </>
  );
};
