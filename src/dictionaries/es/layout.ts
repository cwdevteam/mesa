import { Dictionary } from '@/dictionaries/types'

const layout: Dictionary['layout'] = {
  themeToggle: {
    toggle: 'Cambiar tema',
    light: 'Luz',
    dark: 'Oscuro',
    system: 'Sistema',
  },
} as const

export default layout
