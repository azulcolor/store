import { useState } from "react";
import { Box, CircularProgress, Typography, Button, Grid } from "@mui/material";
import { useProducts } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { ProductList } from "../components/ProductList";
import { Product } from "../../client/interfaces";
import { ProductDialog } from "../components/ProductDialog";

export const Business = () => {
  const {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    name: "",
    price: 0,
    stock: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleOpenDialog = (
    data = { name: "", price: 0, stock: 0 },
    id: number | null = null
  ) => {
    setDialogData(data);
    setEditId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogData({ name: "", price: 0, stock: 0 });
    setEditId(null);
  };

  const handleSave = async () => {
    if (editId) {
      await updateProduct(editId, dialogData);
    } else {
      await createProduct(dialogData);
    }
    handleCloseDialog();
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error al cargar los productos</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName={"Productos"}>
        <button onClick={() => navigate("/business/orders")}>Ordenes</button>
      </Header>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3 }}
      >
        Añadir producto
      </Button>

      <Grid container spacing={2}>
        {products.map((product: Product) => (
          <ProductList
            product={product}
            handleOpenDialog={handleOpenDialog}
            deleteProduct={deleteProduct}
          />
        ))}
      </Grid>

      <ProductDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        dialogData={dialogData}
        setDialogData={setDialogData}
        handleSave={handleSave}
        editId={editId}
      />
    </Box>
  );
};
