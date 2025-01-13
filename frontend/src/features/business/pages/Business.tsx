import { Box, CircularProgress, Typography, Button, Grid } from "@mui/material";
import { useProducts } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { ProductList } from "../components/ProductList";
import { ProductDialog } from "../components/ProductDialog";
import { Product } from "../../client/interfaces";

export const Business = () => {
  const {
    products,
    isLoading,
    error,
    openDialog,
    dialogData,
    editId,
    openDialogWithData,
    closeDialog,
    saveDialogData,
    deleteProduct,
  } = useProducts();

  const navigate = useNavigate();

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
        onClick={() => openDialogWithData()}
        sx={{ mb: 3 }}
      >
        Añadir producto
      </Button>

      <Grid container spacing={2}>
        {products.map((product: Product) => (
          <ProductList
            key={product.id}
            product={product}
            handleOpenDialog={openDialogWithData}
            deleteProduct={deleteProduct}
          />
        ))}
      </Grid>

      <ProductDialog
        openDialog={openDialog}
        handleCloseDialog={closeDialog}
        dialogData={dialogData}
        setDialogData={(data) => openDialogWithData(data, editId)}
        handleSave={saveDialogData}
        editId={editId}
      />
    </Box>
  );
};

