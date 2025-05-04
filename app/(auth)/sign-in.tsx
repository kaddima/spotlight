import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import styles from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/contants/theme'

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
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name='leaf' size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Spotlight</Text>
        <Text style={styles.tagLine}>Don't miss anything</Text>
      </View>

      {/* ILLUSTRATION */}
      <View style={styles.illustrationContainer}>
        <Image source={require("@/assets/images/auth-bg.png")}
          style={styles.illustration}
          resizeMode='cover'
        />
      </View>

      {/* GOOGLE LOGIN SECTION */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={()=>console.log("Continue with google")}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name='logo-google' size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>By continuing, you agree to our Terms and Privacy Policy</Text>
      </View>

      {/* WITH EMAIL AND PASSWORD */}
      <View>
        <TextInput
          autoCapitalize='none'
          value={emailAddress}
          placeholder='Enter email address'
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          placeholder='Enter password'
          onChangeText={(password) => setPassword(password)}
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

    </View>
  )
}