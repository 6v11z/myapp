import {
  createStaticNavigation,
  type StaticParamList,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "@/context/AuthContext"
import HomeScreen from "./screens/home"
import LoginScreen from "./screens/login"

function useIsSignedIn() {
  const { user } = useAuth()
  const isSignedIn = user ? true : false
  return isSignedIn
}

function useIsSignedOut() {
  const { user } = useAuth()
  const isSignedIn = user ? true : false
  return !isSignedIn
}

const RootStack = createNativeStackNavigator({
  groups: {
    LoggedIn: {
      if: useIsSignedIn,
      screens: {
        Home: HomeScreen,
      },
    },
    LoggedOut: {
      if: useIsSignedOut,
      screens: {
        Login: LoginScreen,
      },
    },
  },
})

export const Navigation = createStaticNavigation(RootStack)

type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
