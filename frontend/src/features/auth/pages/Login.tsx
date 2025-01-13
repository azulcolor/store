import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import { schema } from "../schema/login";
import { LoginFormInputs } from "../types/login";
import { useLogin } from "../hooks/useLogin";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const Login = () => {
  useAuthRedirect()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const { error, setError, onSubmit } = useLogin();

  return (
    <div className="login-container">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
      >
        <TextField
          label="Correo"
          variant="outlined"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          onChange={() => setError(null)}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          onChange={() => setError(null)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Iniciar sesión 
        </Button>
        {error && <p className="error mt-3"> {error.response.data.error}</p>}
      </Box>
    </div>
  );
};

export default Login;
