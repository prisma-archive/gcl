#!/usr/bin/env node
import gclToJson from './index'
import * as minimist from 'minimist'
import * as path from 'path'
import * as fs from 'fs'

async function run() {
  const argv = minimist(process.argv.slice(2))

  const schemaPath = argv.s || argv.schema
  const configPath = argv.c || argv.config

  if (!schemaPath && !configPath) {
    return console.log(`\
 
  Convert gcl to json (with gcl validation)
  
  Usage: gcl-json [options]
  
  Options:
    -s, --schema    Path to GCL Schema
    -c, --config    Path to GCL File
  
  Example:
    $ gcl-json -s schema.graphql -c config.gcl
`)
  }

  const schema = fs.readFileSync(path.resolve(schemaPath), 'utf-8')
  const config = fs.readFileSync(path.resolve(configPath), 'utf-8')

  const json = await gclToJson(config, schema)

  console.log(JSON.stringify(json, null, 2))
}

run().catch(e => onError(e))

process.on('unhandledRejection', e => onError(e))

function onError(e) {
  console.error(e)
}
