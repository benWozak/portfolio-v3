import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links, richText }) => {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[60vh] lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          {richText && <RichText className="mb-0" content={richText} enableGutter={false} />}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
