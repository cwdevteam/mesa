import { Dictionary } from '@/dictionaries/types'

import auth from './auth'
import dashboard from './dashboard'
import home from './home'
import layout from './layout'

const dictionary: Dictionary = {
  auth,
  dashboard,
  home,
  layout,
} as const

export default dictionary
