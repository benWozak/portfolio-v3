'use client'
import type { Props as MediaProps } from '../types'
import React, { useEffect, useState } from 'react'
import { cn } from 'src/utilities/cn'

export const SVGMedia: React.FC<MediaProps> = (props) => {
  const {
    enforceSize,
    resource,
    alt: altFromProps,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
  } = props

  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSVG = async () => {
      if (resource && typeof resource === 'object') {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resource.url}`)
          const svgText = await response.text()
          setSvgContent(svgText)
          setLoading(false)
          if (typeof onLoadFromProps === 'function') {
            onLoadFromProps()
          }
        } catch (error) {
          console.error('Error loading SVG:', error)
          setLoading(false)
        }
      }
    }

    fetchSVG()
  }, [resource, onLoadFromProps])

  if (!resource || typeof resource !== 'object') {
    return null
  }

  const width = enforceSize?.width ?? resource.width
  const height = enforceSize?.height ?? resource.height

  return (
    <div
      className={cn('relative inline-block', imgClassName)}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }}
      onClick={onClick}
      role="img"
      aria-label={altFromProps || ''}
    >
      {!loading && svgContent && (
        <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svgContent }} />
      )}
    </div>
  )
}
