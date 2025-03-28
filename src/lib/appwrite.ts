import { Account, Client, Databases } from "react-native-appwrite"

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e432b7000fa176f873")
  .setPlatform("com.example.myapp")

export const account = new Account(client)
export const databases = new Databases(client)
