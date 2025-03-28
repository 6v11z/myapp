import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { ID, Models } from "react-native-appwrite"
import { account } from "@/lib/appwrite"

const AuthContext = createContext<{
  user: Models.User<Models.Preferences> | null
  login: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}>({
  user: null,
  login: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function init() {
      try {
        const loggedInUser = await account.get()
        setUser(loggedInUser)
      } catch (error) {
        console.log(error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password)
      const loggedInUser = await account.get()
      setUser(loggedInUser)
    } catch (error) {
      console.error(error)
    }
  }

  async function signUp(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password)
      await login(email, password)
      const loggedInUser = await account.get()
      setUser(loggedInUser)
    } catch (error) {
      console.error(error)
    }
  }

  async function signOut() {
    try {
      await account.deleteSession("current")
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, login, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
