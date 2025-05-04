import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { router, Stack, useSegments } from 'expo-router'

export default function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  const segments = useSegments()

  useEffect(() => {
    if (!isLoaded) return
    const inAuthScreen = segments[0] === "(auth)"

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)/sign-in")
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)")
  }, [isLoaded, isSignedIn, segments])

  if (!isLoaded) return null

  return <Stack screenOptions={{ headerShown: false }} />
  
}