import { Dimensions, StyleSheet } from "react-native";
import { ColorTheme } from "../../style/Colors";

const { width, height } = Dimensions.get('window');

export const AuthScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  circle1: {
    position: 'absolute',
    top: height * 0.1,
    left: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(74, 134, 232, 0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: height * 0.1,
    right: -width * 0.2,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(74, 134, 232, 0.08)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: ColorTheme.main_color,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 10,
  },
  subText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: '#f5f5f5',
  },
  button_2: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: ColorTheme.main_color,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  button_2_pressed: {
    backgroundColor: '#aa89d1'
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonText_2: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center'

  },
  footer: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 30,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    lineHeight: 18,
  },
  link: {
    color: ColorTheme.main_color,
    fontWeight: '600',
  },
});