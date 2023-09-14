import { readdirSync, readFileSync } from 'fs'
import { NlpManager } from 'node-nlp'

// Creating new Instance of NlpManager class && read intents directory
const manager = new NlpManager({ languages: ['en'] })
const files = readdirSync("./intents");

// Looping through the files and Parsing the string to object and passing it to manager instance to train and process it.
for (const file of files) {
  const fileConent = readFileSync(`./intents/${file}`)
  const data = JSON.parse(fileConent)
  const intent = file.replace('.json', '')

  for (const question of data.questions) {
    manager.addDocument('en', question, intent)
  };

  for (const answer of data.answers) {
    manager.addAnswer('en', intent, answer)
  };
};

(async function trainSave () {
  await manager.train().catch((error) => {
    // Handle the error here if needed.
    console.error('Error while training:', error)
  })
  manager.save()
})();