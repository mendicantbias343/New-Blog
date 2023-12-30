import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
    defineField({
      name: 'navMenu',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'navTitle',
              type: 'string',
              title: 'Item',
            },
            {
              name: 'navLink',
              type: 'string',
              title: 'URL (slug)',
            },
          ],
        },
      ],
    }),
    {
      type: 'object',
      name: 'person',
      fieldsets: [{name: 'social', title: 'Social media handles'}],
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          title: 'Medium',
          name: 'medium',
          type: 'string',
          fieldset: 'social',
        },
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'string',
          fieldset: 'social',
        },
        {
          title: 'Linkedin',
          name: 'linkedin',
          type: 'string',
          fieldset: 'social',
        },
      ],
    },
    defineField({
      name: 'introtext',
      title: 'Intro Text For Homepage',
      type: 'blockContent',
    }),
    // add homepage elements
  ],
})
