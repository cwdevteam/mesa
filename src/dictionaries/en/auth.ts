import { Dictionary } from '@/dictionaries/types'

const auth: Dictionary['auth'] = {
  error: {
    message: 'Oops! Something went wrong.',
    instructions: 'Please try again',
  },
  emailAuthForm: {
    emailInputLabel: 'Email',
    emailInputPlaceholder: 'name@example.com',
    buttonLabel: 'Continue with Email',
    successToastTitle: 'Success',
    successToastDescription: 'Please check your email to finish signing in.',
    errorToastTitle: 'Error',
    errorToastDescription: 'An error occurred while signing in',
  },
  socialAuthForm: {
    errorToastTitle: 'Error',
    errorToastDescription: 'An error occurred while signing in with OAuth',
  },
  userAuthDialog: {
    titleOpen: 'Sign-in or create an account',
    titleClosed: 'Sign-in',
    description: 'Enter your email below to continue',
    orContinueWith: 'Or continue with',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    agreementText: 'By clicking continue, you agree to our',
    and: 'and',
  },
  signOutButton: {
    buttonLabel: 'Sign out',
  },
} as const

export default auth
