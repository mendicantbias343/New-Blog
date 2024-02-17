import {SanityDocument, defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
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
          return `/${doc.title}`
        },
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.custom((val, context) => customRule(val, context)),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'projecttags',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromRelated: 'projecttags',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      initialValue: '',
    }),
    defineField({
      name: 'projectLink',
      title: 'Project Link',
      type: 'url',
      initialValue: '',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readmore',
      title: 'Read More Link',
      type: 'url',
      initialValue: '',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      tags: 'projecttags',
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

function customRule(value: string, context: SanityDocument) {
  if (!value) {
    return 'No value found'
  }
  return true
}
