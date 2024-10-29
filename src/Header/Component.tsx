import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Brand } from '@/payload-types'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()
  const brand = (await getCachedGlobal('brand', 1)()) as Brand

  return <HeaderClient header={header} brand={brand} />
}
