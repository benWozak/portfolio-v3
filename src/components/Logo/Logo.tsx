'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'
import { Theme } from '@/providers/Theme/types'

export const Logo = () => {
  const { theme } = useTheme()

  const [value, setValue] = React.useState<Theme | null | undefined>()

  React.useEffect(() => {
    setValue(theme)
  }, [theme])

  if (value === 'dark') {
    return (
      /* eslint-disable @next/next/no-img-element */
      <img alt="BW Logo" height="90" width="90" src="/media/BW_logo_light.svg" />
    )
  } else {
    return (
      /* eslint-disable @next/next/no-img-element */
      <img alt="BW Logo" height="90" width="90" src="/media/BW_logo.svg" />
    )
  }
}
