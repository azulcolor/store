import { Box, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductItem = ({ product }: { product: any }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        pb: 1,
        mb: 2,
      }}
    >
      <Box>
        <Typography variant="h6">{product.Product.name}</Typography>
        <Typography>
          Price: ${product.price} x {product.quantity}
        </Typography>
        <Typography>
          Subtotal: ${product.price * product.quantity}
        </Typography>
      </Box>
      <Box>
        <Button variant="outlined">+</Button>
        <Button variant="outlined" disabled={product.quantity === 1}>
          -
        </Button>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
