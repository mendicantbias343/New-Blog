import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './src/structure'

import {dashboardTool, projectInfoWidget} from '@sanity/dashboard'
import {createAsyncPublishAction} from './actions/index.js'
import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'
import {tags} from 'sanity-plugin-tags'

export default defineConfig({
  name: 'default',
  title: 'mendicantbias.com',

  projectId: '1s3iny7g',
  dataset: 'production',

  plugins: [
    dashboardTool({
      widgets: [
        documentListWidget({
          title: 'Notes in Draft',
          query: '*[_type=="note" && published == false ]',
          showCreateButton: false,
        }),
        documentListWidget({
          title: 'Articles in Draft',
          query: '*[_type == "post" && published == false]',
          showCreateButton: false,
        }),
        projectInfoWidget(),
      ],
    }),
    deskTool({structure}),
    visionTool(),

    tags(),
  ],

  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) =>
      prev.map((originalAction) => {
        return originalAction.action === 'publish'
          ? createAsyncPublishAction(originalAction, context)
          : originalAction
      }),
  },
})
