import { useFonts, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Main from "./src/components/Main";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
