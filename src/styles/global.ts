import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    border: 0,
  },
  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    margin: 0,
    '--webkit-font-smoothing': 'antialiased',
  },
})
