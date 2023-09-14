#!/usr/bin/env node

import { NlpManager } from 'node-nlp'

// Building REPL (Read Evaluate Print Loop)
import readline from 'readline'
import { default_answers } from './utils/helper.js'

const manager = new NlpManager({ languages: ['en'] })

// Loading our saved model
manager.load()

const rl = readline.createInterface(process.stdin, process.stdout)
console.log('======================= Welcome to tchat bot! =======================')

rl.setPrompt('> ')
rl.prompt()
rl.on('line', async (line) => {
  const response = await manager.process('en', line)
  if (response.answer) {
    console.log(response.answer);
  }else {
    console.log(default_answers.answer);
  }
  rl.prompt() //re-prompt
}).on('close', function () {
  process.exit(0)
})
