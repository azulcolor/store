import { useState } from "react";
import { login } from "../../../api/auth";
import { SubmitHandler } from "react-hook-form";
import { LoginFormInputs } from "../types/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../../redux/slices/authSlice";

interface Error {
  response: {
    data: {
      error: string;
    };
  };
}

export const useLogin = () => {
  const [error, setError] = useState<Error | null>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login(data.email, data.password);
      dispatch(setCredentials({ user: response.user, token: response.token }));
      localStorage.setItem("token", response.token);
      if (response.user.role === 1) {
        navigate("/business");
      } else if (response.user.role === 2) {
        navigate("/client");
      }
      
      console.log("Logged in:", response);
    } catch (error) {
      console.error("Login failed:", error);
      setError(error as Error);
    }
  };

  return { error, setError, onSubmit };
};
