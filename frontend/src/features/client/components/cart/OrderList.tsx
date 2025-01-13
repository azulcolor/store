import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderProduct } from "../../../../types";

interface Props {
  orderProduct: OrderProduct
  handleAddProduct: (productId: number, quantity: number) => void
  handleRemoveProduct: (productId: number) => void
}

export const OrderList = ({ orderProduct, handleAddProduct, handleRemoveProduct }: Props) => {

  return (
    <Grid item xs={12} >
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
          <Typography>
            Precio: ${orderProduct.price} 
          </Typography>
          <Typography>
            Cantidad:  {orderProduct.quantity}
          </Typography>
          <Typography>Subtotal: ${orderProduct.price * orderProduct.quantity}</Typography>
        </Box>
        <Box>
          <Button variant="outlined" onClick={() => handleAddProduct(orderProduct.productId, 1)}>
            +
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleAddProduct(orderProduct.productId, -1)}
            disabled={orderProduct.quantity === 1}
          >
            -
          </Button>
          <IconButton onClick={() => handleRemoveProduct(orderProduct.productId)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
};
