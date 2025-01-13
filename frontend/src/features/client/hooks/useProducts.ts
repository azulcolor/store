import useSWR from 'swr';
import { axiosInstance } from '../../../api/axios';

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export const useProducts = () => {
  const { data, error, isLoading } = useSWR('/products', fetcher);

  return {
    products: data || [],
    error,
    isLoading,
  };
};
