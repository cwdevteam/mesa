export type Dictionary = {
  auth: {
    error: {
      message: string
      instructions: string
    }
    emailAuthForm: {
      emailInputLabel: string
      emailInputPlaceholder: string
      buttonLabel: string
      successToastTitle: string
      successToastDescription: string
      errorToastTitle: string
      errorToastDescription: string
    }
    socialAuthForm: {
      errorToastTitle: string
      errorToastDescription: string
    }
    userAuthDialog: {
      titleOpen: string
      titleClosed: string
      description: string
      orContinueWith: string
      termsOfService: string
      privacyPolicy: string
      agreementText: string
      and: string
    }
    signOutButton: {
      buttonLabel: string
    }
  }
  dashboard: {
    newProjectButton: {
      buttonLabel: string
    }
  }
  home: {
    heroSection: {
      welcome: string
      signIn: string
      accessLimited: string
      signUp: string
    }
  }
  layout: {
    themeToggle: {
      toggle: string
      light: string
      dark: string
      system: string
    }
  }
}
