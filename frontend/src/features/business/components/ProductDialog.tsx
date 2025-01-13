import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

export const ProductDialog = ({openDialog, handleCloseDialog, dialogData, setDialogData, handleSave, editId}: any) => {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editId ? "Editar producto" : "Añadir producto"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={dialogData.name}
            onChange={(e) =>
              setDialogData({ ...dialogData, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Precio"
            type="number"
            value={dialogData.price}
            onChange={(e) =>
              setDialogData({ ...dialogData, price: +e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={dialogData.stock}
            onChange={(e) =>
              setDialogData({ ...dialogData, stock: +e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    )
}