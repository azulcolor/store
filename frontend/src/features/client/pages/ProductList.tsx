import { useProducts } from "../hooks/useProducts";
import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Product } from "../interfaces";
import { useCart } from "../hooks/useCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { ProductCard } from "../components/products/ProductCard";
import { Order, OrderProduct } from "../../../types";

export const ProductList = () => {
  const { products, error, isLoading } = useProducts();
  const { cart, addOrUpdateProduct } = useCart();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error al cargar los componentes</Typography>;

  const isProductInCart = (productId: number) => {
    return cart.some((order: Order) =>
      order.OrderProducts.some((orderProduct: OrderProduct) => orderProduct.productId === productId)
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName="Productos">
        <IconButton component={Link} to="/cart" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <button className="text-xl" onClick={() => navigate("/client/orders")}>
          Ordenes
        </button>
      </Header>

      <Grid container spacing={2}>
        {products.products.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              isProductInCart={isProductInCart}
              addOrUpdateProduct={addOrUpdateProduct}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
