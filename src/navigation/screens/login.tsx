import { useState } from "react"
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native"
import { useAuth } from "@/context/AuthContext"

export default function LoginScreen() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="blue" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <Button title="Sign in" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
