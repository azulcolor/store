import React, { useState } from 'react';
import { useCart } from '../../client/hooks/useCart';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  IconButton,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cart, isLoading, error, addOrUpdateProduct, removeProduct, checkout } = useCart();
  const navigate = useNavigate(); 
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load cart</Typography>;

  const handleAddProduct = async (productId: number, quantity: number) => {
    try {
      await addOrUpdateProduct(productId, quantity);
      setSnackbar({ open: true, message: 'Product updated successfully', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    try {
      await removeProduct(productId);
      setSnackbar({ open: true, message: 'Product removed successfully', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  const handleCheckout = async (orderId: number) => {
    console.log(orderId)
      try {
        await checkout(orderId)
        setSnackbar({ open: true, message: 'Tu compra se realizó con éxito', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.error || 'Falló tu compra', severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <div className='cart-header'>
        <h1 className='cart-header__title'>Carrito de compras</h1>
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)} 
        sx={{ mb: 3 }}
      >
        Regresar
      </Button> 
      </div>
      

      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        cart.map((order: any) => (
          <Box key={order.id} sx={{ mb: 4 }}>
            <Typography variant="h5">Order #{order.id}</Typography>
            <Typography>Subtotal: ${order.subtotal}</Typography>
            <Typography>IVA: ${order.iva}</Typography>
            <Typography>Total: ${order.total}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.OrderProducts.map((orderProduct: any) => (
                <Grid item xs={12} key={orderProduct.id}>
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
                      <Typography variant="h6">
                        {orderProduct.Product.name}
                      </Typography>
                      <Typography>
                        Price: ${orderProduct.price} x {orderProduct.quantity}
                      </Typography>
                      <Typography>
                        Subtotal: ${orderProduct.price * orderProduct.quantity}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleAddProduct(orderProduct.productId, 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleAddProduct(orderProduct.productId, -1)
                        }
                        disabled={orderProduct.quantity === 1}
                      >
                        -
                      </Button>
                      <IconButton
                        onClick={() => handleRemoveProduct(orderProduct.productId)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box>
          <Button variant="contained" color="primary" onClick={() => handleCheckout(order.id)}>
            Confirmar Compra
          </Button>
        </Box>
          </Box>
        ))
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

