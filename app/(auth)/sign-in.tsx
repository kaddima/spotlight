import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignInScreen() {
  const { signIn, isLoaded, setActive } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")

  const onSignInPress = async () => {
    if (!isLoaded) return

    //start signin with email and password
    try {
      const signInAttempt = await signIn.create({ identifier: emailAddress, password })
      /**
       * If sign-in process is complete, set the created session as active 
       * and redirect the user
       */
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/")
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }

    } catch (e) {
      console.error(JSON.stringify(e, null, 2))

    }
  }
  return (
    <View>
      <Text>Sign In</Text>
      <TextInput
      autoCapitalize='none'
      value={emailAddress}
      placeholder='Enter email address'
      onChangeText={(email)=>setEmailAddress(email)}
      />
      <TextInput
      secureTextEntry={true}
      value={password}
      placeholder='Enter password'
      onChangeText={(password)=>setPassword(password)}
      />
      <TouchableOpacity onPress={onSignInPress}>
        <Text>Continue</Text>
      </TouchableOpacity>
      <View>
        <Link href={"/sign-up"}>
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  )
}