import React from 'react'
import dayjs from 'dayjs'

import RichText from '@/components/RichText'
import { CMSLink } from '../../components/Link'

import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'features' }>

export const FeaturesBlock: React.FC<
  Props & {
    id?: string
  }
> = (props) => {
  const { features, headline } = props

  return (
    <section className="container py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-3xl mx-auto space-y-3">
          {headline?.description && (
            <RichText content={headline?.description} enableGutter={false} />
          )}

          {headline?.enableLink && <CMSLink {...headline?.link} />}
        </div>
        <div className="mt-12">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {features?.map((item, index) => {
              const { richText, enableLink, link } = item
              return (
                <li key={index} className="flex gap-x-4 border border-slate-200 p-4 rounded-xl">
                  {/* <div className="flex-none w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div> */}
                  <div>
                    {richText && <RichText content={richText} enableGutter={false} />}

                    {enableLink && <CMSLink {...link} />}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
