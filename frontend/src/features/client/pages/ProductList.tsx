import { useProducts } from "../hooks/useProducts";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Product } from "../interfaces";
import { useCart } from "../hooks/useCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const { products, error, isLoading } = useProducts();
  const { cart, addOrUpdateProduct } = useCart();

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Failed to load products</Typography>;

  const isProductInCart = (productId: number) => {
    return cart.some((order: any) =>
      order.OrderProducts.some(
        (orderProduct: any) => orderProduct.productId === productId
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <div className="product-header">
        <h1 className="product-header__title">Products</h1>
        <IconButton component={Link} to="/cart" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </div>

      <Grid container spacing={2}>
        {products.products.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Stock: {product.stock}</Typography>
                {isProductInCart(product.id) ? (
                  <Typography color="primary" sx={{ mt: 2 }}>
                    Ya ha sido agregado
                  </Typography>
                ) : product.stock === 0 ? (
                  <Typography color="info" sx={{ mt: 2 }}>
                    Sin stock 
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => addOrUpdateProduct(product.id, 1)}
                  >
                    Añadir al carrito
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
