export type Dictionary = {
  auth: {
    emailAuthForm: {
      emailInputLabel: string,
      emailInputPlaceholder: string,
      buttonLabel: string,
      successToastTitle: string,
      successToastDescription: string,
      errorToastTitle: string,
      errorToastDescription: string,
    },
    socialAuthForm: {
      errorToastTitle: string,
      errorToastDescription: string,
    },
    userAuthDialog: {
      title: string,
      description: string,
      orContinueWith: string,
      termsOfService: string,
      privacyPolicy: string,
      agreementText: string,
      and: string,
    },
    signOutButton: {
      buttonLabel: string
    }
  },
  home: {
    heroSection: {
      welcome: string,
      signIn: string,
      accessLimited: string,
      signUp: string
    }
  },
  layout: {
    themeToggle: {
      toggle: string,
      light: string,
      dark: string,
      system: string
    }
  }
}