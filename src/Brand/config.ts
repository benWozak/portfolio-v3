import { GlobalConfig } from 'payload';

export const Brand: GlobalConfig = {
  slug: 'brand',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo_light',
      type: 'upload',
      relationTo: 'media',
      // required: true,
      label: 'Brand Logo - light version',
    },
    {
      name: 'logo_dark',
      type: 'upload',
      relationTo: 'media',
      // required: true,
      label: 'Brand Logo - dark version',
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn Profile URL',
        },
        {
          name: 'github',
          type: 'text',
          label: 'GitHub Profile URL',
        },
        {
          name: 'portfolio',
          type: 'text',
          label: 'Portfolio Website URL',
        },
      ]
    },
  ],
};

export default Brand;