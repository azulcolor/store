import { Box, Button, Grid, Typography } from "@mui/material"
import { Order, OrderProduct } from "../../../types"

interface Props {
    order: Order
    handleReturnOrder: (id: number) => void
}

export const OrderList = ({ order, handleReturnOrder }: Props) => {
    return (
        <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc" }}>
        <Typography variant="h6">Orden {order.id}</Typography>
        <Typography>Id de usuario: {order.userId}</Typography>
        <Typography>Estatus: {order.statusId}</Typography>
        <Typography>Subtotal: ${order.subtotal}</Typography>
        <Typography>IVA: ${order.iva}</Typography>
        <Typography>Total: ${order.total}</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {order.OrderProducts.map((orderProduct: OrderProduct) => (
            <Grid item xs={12} key={orderProduct.id}>
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
                  <Typography>Precio: ${orderProduct.price}</Typography>
                  <Typography>Pruductos: {orderProduct.quantity}</Typography>
                  <Typography>Subtotal: ${orderProduct.price * orderProduct.quantity}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {order.statusId < 3 && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleReturnOrder(order.id)}
            sx={{ mt: 2 }}
          >
            Devolver orden
          </Button>
        )}
      </Box>
    )
}