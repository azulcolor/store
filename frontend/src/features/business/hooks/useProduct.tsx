import useSWR from 'swr';
import { axiosInstance } from '../../../api/axios';

export const useProducts = () => {
  const { data, error, mutate } = useSWR('/products/my-products', async (url) => {
    const response = await axiosInstance.get(url);
    return response.data.products;
  });

  const createProduct = async (data: any) => {
    const response = await axiosInstance.post('/products', data);
    mutate(); 
    return response.data.product;
  };

  const updateProduct = async (id: number, data: any) => {
    const response = await axiosInstance.patch(`/products/${id}`, data);
    mutate();
    return response.data.product;
  };

  const deleteProduct = async (id: number) => {
    await axiosInstance.delete(`/products/${id}`);
    mutate();
  };

  return {
    products: data || [],
    isLoading: !data && !error,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
