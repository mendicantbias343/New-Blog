import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pages',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      title: 'Page Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'readtime',
      title: 'ReadTime',
      type: 'number',
      hidden: true,
    }),
    // add homepage elements
  ],
})
