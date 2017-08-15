import { parse, buildSchema, graphql } from 'graphql'

const wrapGcl = gcl => `query { config(gcl: ${gcl}) }`

export default function gclToJson(
  gcl: string,
  schemaString: string,
): Promise<any> {
  const query = wrapGcl(gcl)
  const schema = buildSchema(schemaString)

  let inputObject: any = null
  const root = {
    config(input) {
      inputObject = input
      return true
    },
  }

  return new Promise((resolve, reject) => {
    graphql(schema, query, root)
      .then(() => {
        resolve(inputObject)
      })
      .catch(reject)
  })
}
