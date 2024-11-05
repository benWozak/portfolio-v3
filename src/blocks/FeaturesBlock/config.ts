import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const FeatureFields: Field[] = [
  {
    name: 'topIcon',
    type: 'upload',
    relationTo: 'media',
    label: 'Top Icon',
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
    name: 'bottomIcons',
    type: 'array',
    label: 'Bottom Icons',
    minRows: 0,
    maxRows: 5,
    admin: {
      description: 'Add up to 5 icons to display at the bottom of the feature card',
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

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'headline',
      type: 'group',
      fields: [
        {
          name: 'description',
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
      ]
    },
    {
      name: 'features',
      type: 'array',
      fields: FeatureFields,
    },
  ],
}