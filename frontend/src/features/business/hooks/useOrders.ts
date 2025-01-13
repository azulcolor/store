import useSWR from "swr";
import { axiosInstance } from "../../../api/axios";

export const useOrders = () => {
  const { data, error, mutate } = useSWR("/orders/business", async (url) => {
    const response = await axiosInstance.get(url);
    return response.data.orders;
  });

  const returnOrder = async (orderId: number) => {
    await axiosInstance.patch(`/orders/${orderId}`, { statusId: 4 });
    mutate(); 
  };

  return {
    orders: data || [],
    isLoading: !error && !data,
    error,
    returnOrder,
  };
};
