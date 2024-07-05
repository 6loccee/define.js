#!/usr/bin/env node

const words = process.argv.slice(2).join(' ')

if(!words) {
  console.error('Please enter a word / phrase to search for')
}

console.log(words)