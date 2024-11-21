import { GestureHandlerRootView } from "react-native-gesture-handler";
import Naivgation from "./router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Naivgation />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
