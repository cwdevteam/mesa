import { Dictionary } from "@/dictionaries/types";

import auth from './auth'
import home from './home'
import layout from './layout'

const dictionary: Dictionary = {
  auth,
  home,
  layout
} as const

export default dictionary