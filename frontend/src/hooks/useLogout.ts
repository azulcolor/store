import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clear } from "../redux/slices/authSlice"

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clear());
    localStorage.removeItem("token"); 

    navigate("/login");
  };

  return { logout };
};
