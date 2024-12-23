import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import { SVGMedia } from './SVGMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const isSVG = typeof resource === 'object' && resource?.mimeType?.includes('svg')
  const Tag = (htmlElement as any) || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? (
        <VideoMedia {...props} />
      ) : isSVG ? (
        <SVGMedia {...props} />
      ) : (
        <ImageMedia {...props} />
      )}
    </Tag>
  )
}
