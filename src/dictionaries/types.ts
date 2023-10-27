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
    userAuthForm: {
      title: string,
      description: string,
      orContinueWith: string,
      termsOfService: string,
      privacyPolicy: string,
      agreementText: string,
      and: string,
    }
  }
}