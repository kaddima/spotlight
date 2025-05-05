import { COLORS } from "@/contants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  scrollContainer:{
    flexGrow:1
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  brandSection: {
    alignItems: "center",
    marginTop: 12
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  appName: {
    fontSize: 42,
    fontWeight: "700",
    fontFamily: "JetBrainMono-Medium",
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 5
  },
  tagLine: {
    fontSize: 16,
    color: COLORS.grey,
    letterSpacing: 1,
    textTransform: "lowercase"
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40
  },
  illustration: {
    width: width * 0.75,
    height: width * 0.75,
    maxHeight: 200
  },
  loginSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: "center"
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.surface
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.grey,
    maxHeight: 280
  },

  //FORM sign in or sign up
  form: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    height: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#777',
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },

})

export default styles