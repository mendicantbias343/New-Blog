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
        source: (doc: Document) => {
          const date = formatDate(new Date(), 'YYYY-MMM-DD')
          return `/${date}/${doc.title}`
        },
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
      initialValue: '',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
    }),
    defineField({
      name: 'readtime',
      title: 'Reading Time',
      type: 'number',
      initialValue: 5,
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

function formatDate(date: Date, format: string) {
  const options: any = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  let x: any = new Intl.DateTimeFormat('en-US', options).format(date)
  x = x.split('/')
  x = x[2] + '-' + x[0] + '-' + x[1]
  return x
}
