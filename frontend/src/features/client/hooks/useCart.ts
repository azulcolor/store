import useSWR from "swr";
import { axiosInstance } from "../../../api/axios";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export const useCart = () => {
  const { data, error, mutate } = useSWR("/cart", fetcher);

  const addOrUpdateProduct = async (productId: number, quantity: number) => {
    try {
      console.log("Entré con", productId, quantity)
      await axiosInstance.post('/cart/add', { productId, quantity });
      mutate(); // Refrescar el carrito después de la actualización
    } catch (err: any) {
      console.log(err)
      throw new Error(err.response?.data?.error || 'Falló algo al agregar un producto');
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`);
      mutate(); // Refrescar el carrito después de la eliminación
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to remove product from cart');
    }
  };

  const checkout = async (orderId: number) => {
    try {
      await axiosInstance.post('/cart/checkout', { orderId });
      mutate();
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to remove product from cart');
    }
  }

  return {
    cart: data?.cart || [],
    error,
    isLoading: !data && !error,
    addOrUpdateProduct,
    removeProduct,
    checkout
  };
};
