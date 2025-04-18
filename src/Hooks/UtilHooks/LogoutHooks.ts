import { useAuthDispatch } from "../StateHooks";
import { logout } from "../../GlobalStateContext/AuthSlice";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../Services/API/ApiInstance";

const useLogout = () => {
    const dispatch = useAuthDispatch(); // ✅ Call inside another hook
    const navigate = useNavigate();

    return () => {
      queryClient.invalidateQueries();
      queryClient.clear();

      dispatch(logout());
      navigate("/");
    };
};

export default useLogout;