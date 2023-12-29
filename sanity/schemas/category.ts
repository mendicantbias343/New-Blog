import {SanityDocument, defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: Document) => {
          return `categories/${doc.title}`
        },
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'isSeries',
      title: 'Is A Series',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

function customRule(value: string, context: SanityDocument) {
  if (!value) {
    return 'No value found'
  }
  return true
}
