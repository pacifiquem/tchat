import { NlpManager } from 'node-nlp'

// Building REPL (Read Evaluate Print Loop)
import readline from 'readline'

const manager = new NlpManager({ languages: ['en'] })

// Loading our saved model
manager.load()

const rl = readline.createInterface(process.stdin, process.stdout)
console.log('======================= Welcome to tchat bot! =======================')

rl.setPrompt('> ')
rl.prompt()
rl.on('line', async (line) => {
  const response = await manager.process('en', line)
  console.log(response.answer)
  rl.prompt()
}).on('close', function () {
  process.exit(0)
})
