import { GestureHandlerRootView } from "react-native-gesture-handler";
import Naivgation from "./router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TripProvider } from "./context/TripContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TripProvider>
        <BottomSheetModalProvider>
          <Naivgation />
        </BottomSheetModalProvider>
      </TripProvider>

    </GestureHandlerRootView>
  );
}
