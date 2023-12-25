import {useDocumentOperation} from 'sanity'

export function createAsyncPublishAction(originalAction, context) {
  //   const client = context.getClient({apiVersion: '2022-11-29'})
  const AsyncPublishAction = (props) => {
    const originalResult = originalAction(props)
    const {patch, publish} = useDocumentOperation(props.id, props.type)
    console.log('Operation is ' + originalAction.action)
    return {
      ...originalResult,
      onHandle: async () => {
        // await client.patch('publish-counter').setIfMissing({counter: 0}).inc({counter: 1}).commit()
        // await client
        //   .fetch("*[_id == 'publish-counter'][0]{counter}")
        //   .then((res) => console.log(res))
        // add code to change the current documents published state
        if (originalAction.action === 'publish') {
          if (context.schemaType == 'post' || context.schemaType == 'note') {
            patch.execute([{set: {published: true}}])
          }
        } else {
          if (context.schemaType == 'post' || context.schemaType == 'note') {
            patch.execute([{set: {published: false}}])
          }
        }
        originalResult.onHandle()
      },
    }
  }
  return AsyncPublishAction
}
