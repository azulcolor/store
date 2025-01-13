import useSWR from 'swr';
import { axiosInstance } from '../../../api/axios';
import { useState } from 'react';

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

  // Dialog Management
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: '',
    price: 0,
    stock: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const openDialogWithData = (
    data = { name: '', price: 0, stock: 0 },
    id: number | null = null
  ) => {
    setDialogData(data);
    setEditId(id);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setDialogData({ name: '', price: 0, stock: 0 });
    setEditId(null);
  };

  const saveDialogData = async () => {
    if (editId) {
      await updateProduct(editId, dialogData);
    } else {
      await createProduct(dialogData);
    }
    closeDialog();
  };

  return {
    products: data || [],
    isLoading: !data && !error,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    openDialog,
    dialogData,
    editId,
    openDialogWithData,
    closeDialog,
    saveDialogData,
  };
};

