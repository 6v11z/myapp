import { useState } from "react"
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native"
import { useAuth } from "@/context/AuthContext"

export default function HomeScreen() {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="red" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user ? user.email : "Please login"}</Text>
      <Button title="Log out" color="red" onPress={handleSignOut} />
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
