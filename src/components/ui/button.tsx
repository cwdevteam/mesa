import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

interface IButton {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  ref?: React.MutableRefObject<null>
  color?: string
  className?: string
  compact?: boolean
  eventName?: string
  isDisabled?: boolean
  isLoading?: boolean
  isActive?: boolean
  size?: 'xs' | 'sm'
  type?: 'button' | 'submit' | 'reset' | undefined
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

export function MiniButton(btn: IButton): JSX.Element {
  const isDisabled = btn.isDisabled || btn.isLoading

  const eventName = btn.eventName
  const onClick = eventName
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        btn.onClick?.(e)
      }
    : btn.onClick

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={btn.type ? btn.type : 'button'}
      className={`whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-medium backdrop-blur-sm ${
        !btn.compact && `w-full`
      } flex items-center justify-center transition focus:outline-none ${
        isDisabled
          ? `cursor-default opacity-50`
          : btn.isActive
            ? `cursor-wait opacity-50`
            : `hover:opacity-80`
      }
      ${btn.className}`}
    >
      {btn.isLoading && (
        <div>
          <div
            style={{ borderTopColor: 'transparent' }}
            className="mr-2 size-2.5 animate-spin rounded-full border-2 border-solid border-gray-500"
          />
        </div>
      )}
      {btn.children}
    </button>
  )
}

export function SecondaryButton(btn: IButton): JSX.Element {
  const textSize = btn.size ? `text-${btn.size}` : 'text-xs'
  const isDisabled = btn.isDisabled || btn.isLoading

  const eventName = btn.eventName
  const onClick = eventName
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        btn.onClick?.(e)
      }
    : btn.onClick

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={btn.type ? btn.type : 'button'}
      className={`whitespace-nowrap rounded ${textSize} border border-gray-500/20 bg-gray-400/5 px-2 py-1 text-black shadow shadow-black/5 dark:border-white/20 dark:bg-white/5 dark:text-white ${
        !btn.compact && `w-full`
      } flex items-center justify-center transition focus:outline-none ${
        isDisabled
          ? `cursor-default opacity-50`
          : btn.isActive
            ? `opacity-50`
            : `hover:border-black/20 hover:shadow focus:ring-2 dark:hover:border-white/40`
      }
      ${btn.className}`}
    >
      {btn.isLoading && (
        <div>
          <div
            style={{ borderTopColor: 'transparent' }}
            className="mr-2 size-3 animate-spin rounded-full border-2 border-solid border-gray-500"
          />
        </div>
      )}
      {btn.children}
    </button>
  )
}
