export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',

            // 'category',
            // 'author',
          ].includes(listItem.getId()),
      ),
    ])
