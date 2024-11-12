import { cn } from 'src/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded font-bold tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden cursor-pointer',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-12 px-12',
        sm: 'h-9 px-3',
      },
      variant: {
        default: [
          'bg-primary text-primary-foreground group',
          // Base button styles
          'relative flex justify-center items-center rounded',
          'overflow-hidden cursor-pointer border-none',

          // After pseudo-element for sliding animation
          'after:content-["_"] after:absolute after:h-full',
          'after:bg-[#DF5901] after:w-0 after:right-0',
          'after:transition-all after:duration-300 after:ease-in-out',
          'after:z-10', // Ensure this is below the text

          // Hover state for after element
          'hover:after:right-auto hover:after:left-0 hover:after:w-full',

          // anchor styling
          '[&>a]:relative [&>a]:z-20',
          '[&>a]:w-full',
          '[&>a]:text-center [&>a]:no-underline',
          '[&>a]:px-6 [&>a]:py-4',
          '[&>a]:text-white [&>a]:text-lg',
          '[&>a]:transition-all [&>a]:duration-300',

          // Hover state for anchor
          'hover:[&>a]:text-primary-foreground',
          'hover:[&>a]:animate-[scaleUp_0.3s_ease-in-out]',
        ],
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size = 'lg', variant, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} {...props} className={cn(buttonVariants({ className, size, variant }))}>
        <span>{children}</span>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
