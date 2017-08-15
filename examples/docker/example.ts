import { readFileSync } from 'fs'
import gclToJson from '../../src/index'

async function run() {
  const example = readFileSync('./config.gcl', 'utf-8')
  const schemaString = readFileSync('./examples/docker/schema.graphql', 'utf-8')

  const json = await gclToJson(example, schemaString)
  console.log(JSON.stringify(json, null, 2))
}

run()
