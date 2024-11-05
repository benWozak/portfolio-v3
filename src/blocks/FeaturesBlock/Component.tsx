import React from 'react'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'features' }>

export const FeaturesBlock: React.FC<
  Props & {
    id?: string
  }
> = (props) => {
  const { features, headline } = props

  const topIconSize = { width: 96, height: 96 }
  const bottomIconSize = { width: 32, height: 32 }

  return (
    <section className="container py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-3xl mx-auto space-y-3 flex justify-center">
          {headline?.description && (
            <RichText content={headline?.description} enableGutter={false} />
          )}

          {headline?.enableLink && <CMSLink {...headline?.link} />}
        </div>
        <div className="mt-12">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {features?.map((item, index) => {
              const { richText, enableLink, link, topIcon, bottomIcons } = item

              return (
                <li
                  key={index}
                  className="flex flex-col gap-4 border border-slate-200 p-8 rounded-xl"
                >
                  {topIcon && (
                    <div className="flex justify-center">
                      <Media
                        resource={topIcon}
                        enforceSize={topIconSize}
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-grow">
                    {richText && <RichText headingCenter content={richText} enableGutter={false} />}
                    {enableLink && <CMSLink {...link} />}
                  </div>

                  {bottomIcons && bottomIcons.length > 0 && (
                    <div
                      className={cn(
                        'flex flex-wrap gap-4 justify-center mt-4',
                        bottomIcons.length > 3 && 'border-t border-slate-200 pt-4',
                      )}
                    >
                      {bottomIcons.map((iconObj, i) => (
                        <div key={i} className="w-8 h-8">
                          <Media
                            resource={iconObj.icon}
                            enforceSize={bottomIconSize}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
