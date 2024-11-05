import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        // Handle SVG files
        if (data.mimeType?.includes('svg')) {
          // If we have access to the file data
          if (req?.file && typeof req.file !== 'string') {
            const fileData = req.file.data.toString()
            // Modify SVG attributes
            const modifiedData = fileData.replace(
              /(width|height)="([^"]*)"/g,
              (match, attr) => `${attr}="100%"`
            )
            req.file.data = Buffer.from(modifiedData)

            // Set dimensions to null in the database
            data.width = null
            data.height = null
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        generateImageName: ({ height, sizeName, extension, width, originalName }) => {
          return `${originalName}-${sizeName}-${height}-${width}.${extension}`
        },
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        generateImageName: ({ height, sizeName, extension, width, originalName }) => {
          return `${originalName}-${sizeName}-${height}-${width}.${extension}`
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        generateImageName: ({ height, sizeName, extension, width, originalName }) => {
          return `${originalName}-${sizeName}-${height}-${width}.${extension}`
        },
      },
    ],
  },
}