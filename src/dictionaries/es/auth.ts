import { Dictionary } from "@/dictionaries/types"

const auth: Dictionary['auth'] = {
  emailAuthForm: {
    emailInputLabel: "Correo electrónico",
    emailInputPlaceholder: "nombre@ejemplo.com",
    buttonLabel: "Continuar con el correo electrónico",
    successToastTitle: "Éxito",
    successToastDescription: "Por favor, revisa tu correo electrónico para terminar de iniciar sesión.",
    errorToastTitle: "Error",
    errorToastDescription: "Ocurrió un error al iniciar sesión",
  },
  socialAuthForm: {
    errorToastTitle: "Error",
    errorToastDescription: "Ocurrió un error al iniciar sesión con OAuth",
  },
  userAuthForm: {
    title: 'Inicia sesión o crea una cuenta',
    description: 'Ingresa tu correo electrónico a continuación para continuar',
    orContinueWith: "O continuar con",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    agreementText: "Al hacer clic en continuar, aceptas nuestro",
    and: "y",
  },
  signOutButton: {
    buttonLabel: "Cerrar sesión"
  }
} as const

export default auth