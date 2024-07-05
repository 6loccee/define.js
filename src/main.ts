#!/usr/bin/env node

interface Response {
  meanings: Meaning[]
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}

interface Definition {
  definition: string
  example: string
}

const words = process.argv.slice(2).join(' ')
const dictionary_api = 'https://api.dictionaryapi.dev/api/v2/entries/en'

if (!words) {
  console.error('Please enter a word / phrase to search for')
  process.exit(1)
}

async function fetchDefinition(): Promise<void> {
  const response = await fetch(`${dictionary_api}/${encodeURIComponent(words)}`)
  const data: Response[] = await response.json()
  const definition = extractDefinition(data)

  if(!definition) {
    console.error(`No results for: ${words}`)
    process.exit(0)
  }

  console.log(definition)
}

function extractDefinition(data: Response[]): string | null {
  if (!Array.isArray(data) || data.length === 0) return null

  const meanings = data[0]?.meanings
  if (!meanings || meanings.length === 0) return null

  const definitions = meanings[0]?.definitions
  if (!definitions || definitions.length === 0) return null

  return definitions[0]?.definition || null
}

fetchDefinition()