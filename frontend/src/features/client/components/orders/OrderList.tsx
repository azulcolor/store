import { Box, Button, Grid, Typography } from "@mui/material"
import { Order, OrderProduct } from "../../../../types"
import { OrderInfo } from "./OrderInfo"
import { ProductInfo } from "../products/ProductInfo"

interface Props {
    order: Order
    handleCancelOrder: (id: number) => void
}

export const OrderList = ({ order, handleCancelOrder }: Props) => {
    return (
        <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc" }}>
        <OrderInfo order={order}/>

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
                  <ProductInfo orderProduct={orderProduct}/>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {order.statusId < 3 && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleCancelOrder(order.id)}
            sx={{ mt: 2 }}
          >
            Cancelar orden
          </Button>
        )}
      </Box>
    )
}