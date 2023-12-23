import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './src/structure'
import {workflow} from 'sanity-plugin-workflow'

import {dashboardTool, projectUsersWidget, projectInfoWidget} from '@sanity/dashboard'

import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'

export default defineConfig({
  name: 'default',
  title: 'mendicantbias.com',

  projectId: '1s3iny7g',
  dataset: 'production',

  plugins: [
    dashboardTool({
      widgets: [
        // documentListWidget({title: 'New', types: ['post'], showCreateButton: true}),

        projectInfoWidget(),
        projectUsersWidget(),
      ],
    }),
    deskTool({structure}),
    visionTool(),
    workflow({
      // Required, list of document type names
      // schemaTypes: ['article', 'product'],
      schemaTypes: ['post'],
      // Optional, see below
      // states: [],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
