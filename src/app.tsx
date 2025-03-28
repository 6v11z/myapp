import { AuthProvider } from "./context/AuthContext"
import { Navigation } from "./navigation"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

export default function app() {
  return (
    <AuthProvider>
      <Navigation
        onReady={() => {
          SplashScreen.hideAsync()
        }}
      />
    </AuthProvider>
  )
}
