import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Product } from "../../client/interfaces";

interface Props {
    deleteProduct: (id: number) => void,
    handleOpenDialog: (body: {name: string, price: number, stock: number}, id: number) => void,
    product: Product
}

export const ProductList = ({ deleteProduct, handleOpenDialog, product }: Props) => {
  const getStockColor = (stock: number) => {
    if (stock < 10) return "error.main";
    if (stock <= 20) return "warning.main"; 
    return "success.main";
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={product.id}>
      <Card>
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography>Precio: ${product.price}</Typography>
          <Typography sx={{ color: getStockColor(product.stock) }}>
            Stock: {product.stock}
          </Typography>
          {product.stock < 10 && (
            <Typography color="error" variant="body2">
              ¡Recomendamos reabastecer este producto!
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() =>
              handleOpenDialog(
                {
                  name: product.name,
                  price: product.price,
                  stock: product.stock,
                },
                product.id
              )
            }
          >
            Editar
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => deleteProduct(product.id)}
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
