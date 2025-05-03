import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")

  // Handle submission of signup form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({ emailAddress, password })
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      /**
       * set pending verification to true to display secons screen
       * to catch otp
       */
      setPendingVerification(true)
    } catch (e) {
      console.error(JSON.stringify(e, null, 2))
    }
  }

  // handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      //use the code the user provided to attempt email verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })

      /**
       *  If verification was completed, set the session to active
       *  and redirect the user
       */
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace("/")
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (e) {
      console.error(JSON.stringify(e, null, 2))
    }
  }

  if(pendingVerification){
    return(
      <>
        <Text>Verify your email</Text>
        <TextInput 
        value={code}
        placeholder='Enter your verification code'
        onChangeText={(code)=>setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View>
      <>
        <Text>Sign Up</Text>
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
        <TouchableOpacity onPress={onSignUpPress}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{display:'flex', flexDirection:"row", gap:3}}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text>Sign in</Text>
          </Link>
        </View>
      </>
      
    </View>
  )
}