import useSWR from 'swr';
import { axiosInstance } from '../../../api/axios';

export const useOrderHistory = () => {
  const { data, error, mutate } = useSWR('/orders', async (url) => {
    const response = await axiosInstance.get(url);
    return response.data.orders;
  });

  const cancelOrder = async (orderId: number) => {
    await axiosInstance.patch(`/orders/cancel/${orderId}`);
    mutate(); 
  };

  return {
    orders: data || [],
    isLoading: !data && !error,
    error,
    cancelOrder,
  };
};
