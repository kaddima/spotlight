import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SignedOut, useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export default function SignOutButton() {
  //use clerk to access the sign out function
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      //redirect to your desired page
      Linking.createURL('/')
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))

    }
  }

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  )

}