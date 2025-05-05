import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSignIn, useSSO } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import styles from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/contants/theme'

export default function SignInScreen() {
  const { signIn, isLoaded, setActive } = useSignIn()
  const { startSSOFlow } = useSSO()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive, signIn } = await startSSOFlow({ strategy: "oauth_google" })
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId })
        router.replace("/(tabs)")
      }
    } catch (error) {
      console.log("Google oauth: ", error)
    }
  }

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
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
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
            onPress={handleGoogleSignIn}
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
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            value={emailAddress}
            placeholder='Enter email address'
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            placeholder='Enter password'
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={onSignInPress}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account</Text>
            <Link href={"/sign-up"}>
              <Text style={styles.link}> Sign up</Text>
            </Link>
          </View>
        </View>

      </View>
    </ScrollView>

  )
}