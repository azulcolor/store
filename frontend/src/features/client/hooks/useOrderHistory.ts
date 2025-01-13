import useSWR from "swr";
import { axiosInstance } from "../../../api/axios";

export const useOrderHistory = () => {
  const { data, error, mutate } = useSWR("/orders", async (url) => {
    const response = await axiosInstance.get(url);
    return response.data.orders;
  });

  const cancelOrder = async (orderId: number) => {
    await axiosInstance.patch(`/orders/${orderId}`, { statusId: 3 });
    mutate(); 
  };

  return {
    orders: data || [],
    isLoading: !error && !data,
    error,
    cancelOrder,
  };
};
