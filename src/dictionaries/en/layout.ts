import { Dictionary } from '@/dictionaries/types'

const layout: Dictionary['layout'] = {
  themeToggle: {
    toggle: 'Toggle theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
} as const

export default layout
