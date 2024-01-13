import {useDocumentOperation} from 'sanity'
// import OpenAI from 'openai'
import {useToast} from '@sanity/ui'
// import {useEffect, useState} from 'react'

export function createAsyncPublishAction(originalAction, context) {
  //   const client = context.getClient({apiVersion: '2022-11-29'})
  const AsyncPublishAction = (props) => {
    const originalResult = originalAction(props)
    const {patch, publish} = useDocumentOperation(props.id, props.type)

    return {
      ...originalResult,
      onHandle: async () => {
        if (originalAction.action === 'publish' && ['post', 'note'].includes(props.draft._type)) {
          // Update the readtime

          const plainBody = toPlainText(props.draft.body)
          if (props.draft) {
            if (props.draft.readtime < 2 || !props.draft.readtime) {
              //check if it's not set
              let readtime = readingTime(plainBody)
              patch.execute([{set: {readtime: readtime}}])
            }
          }

          const summary = plainBody.split(' ').slice(0, 25).join(' ')
          patch.execute([{set: {summary: summary}}])
          console.log(props.draft)
          if (!props.draft.publishedAt) {
            // if this is set - do nothing
            var now = new Date()
            patch.execute([{set: {publishedAt: now.toISOString()}}])
            console.log(props.draft.publishedAt)
          }

          // check if the published date is valid - if yes, then do nothing, else update it to created_at date
        }

        originalResult.onHandle()
      },
    }
  }
  return AsyncPublishAction
}

function toPlainText(blocks = []) {
  if (blocks) {
    return (
      blocks
        // loop through each block
        .map((block) => {
          // if it's not a text block with children,
          // return nothing
          if (block._type !== 'block' || !block.children) {
            return ''
          }
          // loop through the children spans, and join the
          // text strings
          return block.children.map((child) => child.text).join('')
        })
        // join the paragraphs leaving split by two linebreaks
        .join('\n\n')
    )
  } else {
    return ''
  }
}

function readingTime(body) {
  const wpm = 225
  const words = body.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return time
}

// async function getSummaryAndKeywords(body) {
//   const openai = new OpenAI({
//     apiKey: process.env.SANITY_STUDIO_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true,
//   })
//   const completion = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content:
//           "You are a sophisticated writer, and an expert at SEO.You'll be given a blog post. Generate an introductory paragraph, which would be included in the blog post (maximum of 20 words). The paragraph must not allude to the blog post. The paragraph should invite the user to read more without sounding too click-bait.You have to respond only in a JSON format as shown below:{intro: <intro>, keywords: [<array of keywords>], title: <proposed title>}",
//       },
//       {role: 'user', content: body},
//     ],
//   })
//   return completion.choices[0]?.message?.content
// }
