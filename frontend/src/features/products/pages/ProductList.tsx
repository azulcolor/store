import { useProducts } from '../hooks/useProducts';
import { CircularProgress, Typography, Box } from '@mui/material';
import { Product } from '../types/Pruduct';

const ProductList = () => {
  const { products, error, isValidating } = useProducts();

  if (isValidating) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load products</Typography>;

  return (
    <Box>
      {products.map(( product: Product ) => (
        <Typography key={product.id}>{product.name}</Typography>
      ))}
    </Box>
  );
};

export default ProductList;
