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
          'after:z-10',

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
          'hover:[&>a]:text-primary',
          // 'hover:[&>a]:animate-[scale-up_0.3s_ease-in-out]',
        ],
        link: [
          'border-none bg-transparent cursor-pointer group',
          '[&>a]:relative [&>a]:pb-2 [&>a]:tracking-wider [&>a]:text-sm [&>a]:uppercase',
          // Underline animation
          '[&>a]:after:content-[""] [&>a]:after:absolute [&>a]:after:w-full',
          '[&>a]:after:scale-x-0 [&>a]:after:h-0.5 [&>a]:after:bottom-0 [&>a]:after:left-0',
          '[&>a]:after:bg-black',
          '[&>a]:after:origin-right',
          '[&>a]:after:transition-transform [&>a]:after:duration-300 [&>a]:after:ease-out',
          // Hover state
          'hover:[&>a]:after:scale-x-100 hover:[&>a]:after:origin-left',
        ],
        outline: [
          'border border-border bg-background text-primary',
          // After pseudo-element for sliding animation
          'after:content-["_"] after:absolute after:h-full',
          'after:bg-[#DF5901] after:w-0 after:right-0',
          'after:transition-all after:duration-300 after:ease-in-out',
          'after:z-10',

          // Hover state for after element
          'hover:after:right-auto hover:after:left-0 hover:after:w-full',

          // anchor styling
          '[&>a]:relative [&>a]:z-20',
          '[&>a]:w-full',
          '[&>a]:text-center [&>a]:no-underline',
          '[&>a]:px-6 [&>a]:py-4',
          '[&>a]:text-primary [&>a]:text-lg',
          '[&>a]:transition-all [&>a]:duration-300',

          // Hover state for anchor
          'hover:[&>a]:text-primary-foreground',
          // 'hover:[&>a]:animate-[scale-up_0.3s_ease-in-out]',
        ],
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
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
