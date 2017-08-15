import { parse, buildSchema, graphql } from 'graphql'

const wrapGcl = gcl => `query { config(gcl: ${gcl}) }`

export default function gclToJson(
  gcl: string,
  schemaString: string,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const query = wrapGcl(gcl)
    const schema = buildSchema(schemaString)

    let inputObject: any = null
    const root = {
      config(input) {
        inputObject = input
        return true
      },
    }

    graphql(schema, query, root)
      .then(res => {
        if (res.errors) {
          return reject(res)
        }
        resolve(inputObject.gcl)
      })
      .catch(e => {
        reject(e)
      })
  })
}
