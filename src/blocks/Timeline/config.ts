import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const timelineFields: Field[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
  },
  {
    name: 'start-date',
    label: 'Start Date',
    type: 'date',
  },
  {
    name: 'end-date',
    label: 'End Date',
    type: 'date',
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
  {
    name: 'icons',
    type: 'array',
    label: 'Technologies',
    minRows: 0,
    maxRows: 10,
    admin: {
      description: 'Add up to 10 icons to display at the bottom of the timeline card',
    },
    fields: [
      {
        name: 'icon',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
    ],
  },
]

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'event',
      type: 'array',
      fields: timelineFields,
    },
  ],
}
