import { Alert, Snackbar } from "@mui/material";

type Snackbar = {
  open: boolean;
  message: string;
  severity: "success" | "error";
};

type SetSnackbar = React.Dispatch<
  React.SetStateAction<Snackbar>
>;

interface Props {
  snackbar: Snackbar;
  setSnackbar: SetSnackbar;
}

export const AlertSnackbar = ({ snackbar, setSnackbar }: Props) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
    >
      <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};
