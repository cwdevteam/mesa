import { Dictionary } from "@/dictionaries/types"

const home: Dictionary['home'] = {
  heroSection: {
    welcome: "Bienvenido a Mesa",
    signIn: "Iniciar sesión",
    accessLimited: "El acceso está actualmente limitado a nuestros socios de lanzamiento alfa.",
    signUp: "Regístrese para un acceso temprano"
  }
} as const

export default home
