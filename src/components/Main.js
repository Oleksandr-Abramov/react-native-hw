import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authStateCahngeUser } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, [stateChange]);
  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
export default Main;
