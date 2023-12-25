import {SanityDocument, defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'published',
      title: 'Is Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare(selection) {
      const author = 'Rameez Kakodker'
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})

function customRule(value: string, context: SanityDocument) {
  if (!value) {
    return 'No value found'
  }
  return true
}
