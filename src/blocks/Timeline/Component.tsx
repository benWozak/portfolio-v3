import React from 'react'
import dayjs from 'dayjs'

import RichText from '@/components/RichText'
import { CMSLink } from '../../components/Link'

import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'timeline' }>

export const Timeline: React.FC<
  Props & {
    id?: string
  }
> = (props) => {
  const { event } = props

  return (
    <section className="container my-16">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {event?.map((item, index) => {
          const { richText, enableLink, link, title } = item
          return (
            <li key={index} className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {`${dayjs(item['start-date']).format('MMM, YYYY')}`}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              {richText && <RichText content={richText} enableGutter={false} />}

              {enableLink && <CMSLink {...link} />}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
