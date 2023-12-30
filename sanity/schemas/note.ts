import {SanityDocument, defineField, defineType} from 'sanity'

export default defineType({
  name: 'note',
  title: 'Notes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: Document) => {
          const date = formatDate(new Date(), 'YYYY-MMM-DD')
          return `/notes/${date}/${doc.title}`
        },
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notetags',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromRelated: 'notetags',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readtime',
      title: 'Reading Time',
      type: 'number',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      initialValue: '',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      tags: 'notetags',
    },
    prepare(selection) {
      const author = 'Rameez Kakodker'
      return {
        ...selection,
        subtitle: author && `Tags: ${selection.tags.map((tag: any) => tag.label)} `,
      }
    },
  },
})

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

function customRule(value: string, context: SanityDocument) {
  if (!value) {
    return 'No value found'
  }
  return true
}
