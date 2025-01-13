import useSWR from "swr";
import { useState } from "react";
import { axiosInstance } from "../../../api/axios";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export const useCart = () => {
  const { data, error, mutate } = useSWR("/cart", fetcher);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const addOrUpdateProduct = async (productId: number, quantity: number) => {
    try {
      await axiosInstance.post("/cart/add", { productId, quantity });
      mutate();
      setSnackbar({ open: true, message: "Producto actualizado con éxito", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.error || "Error al agregar producto", severity: "error" });
      throw new Error(err.response?.data?.error || "Error al agregar producto");
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`);
      mutate();
      setSnackbar({ open: true, message: "Producto eliminado con éxito", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.error || "Error al eliminar producto", severity: "error" });
      throw new Error(err.response?.data?.error || "Error al eliminar producto");
    }
  };

  const checkout = async (orderId: number) => {
    try {
      await axiosInstance.post("/cart/checkout", { orderId });
      mutate();
      setSnackbar({ open: true, message: "Compra realizada con éxito", severity: "success" });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.error || "Error al realizar la compra", severity: "error" });
      throw new Error(err.response?.data?.error || "Error al realizar la compra");
    }
  };

  return {
    cart: data?.cart || [],
    isLoading: !data && !error,
    error,
    addOrUpdateProduct,
    removeProduct,
    checkout,
    snackbar,
    setSnackbar,
  };
};

