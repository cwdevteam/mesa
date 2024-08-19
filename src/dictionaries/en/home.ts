import { Dictionary } from '@/dictionaries/types'

const home: Dictionary['home'] = {
  heroSection: {
    welcome: 'Welcome to Mesa',
    signIn: 'Sign in',
    accessLimited: 'Access is currently limited to our alpha release partners.',
    signUp: 'Sign up for early access',
  },
} as const

export default home
