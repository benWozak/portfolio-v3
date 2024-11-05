'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Brand } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
  brand: Brand
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, brand }) => {
  const { theme } = useTheme()
  /* Storing the value in a useState to avoid hydration errors */
  const [newTheme, setNewTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== newTheme) setNewTheme(headerTheme)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="container relative z-20 py-4 flex justify-between"
      {...(newTheme ? { 'data-theme': newTheme } : {})}
    >
      <Link href="/">
        <Logo image={theme === 'dark' ? brand.logo_light : brand.logo_dark} />
      </Link>
      <HeaderNav header={header} />
    </header>
  )
}
