import { NlpManager } from 'node-nlp'
import { getRandomNumber } from '../utils/helper.js'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
const manager = new NlpManager({ languages: ['en'] })

// Loading our saved model
manager.load()

// load available questions
const intents_path = path.join(__dirname, '../intents');
const files = readdirSync(intents_path);

var availableQuestions = new Array();

// Looping through the files and Parsing the string to object and passing it to manager instance to train and process it.
for (const file of files) {
  const fileContentLocation = path.join(__dirname, '../intents', file)
  const fileConent = readFileSync(fileContentLocation)
  const data = JSON.parse(fileConent)

  for (const question of data.questions) {
    availableQuestions.push(question);
  };

};

test("Check if bot can answer questions that were used to train it: ", async () => {

  //get random index to get a question
  let min = 0;
  let max = availableQuestions.length - 1;
  let randIndex = getRandomNumber(min, max);

  //ask a random question
  const response = await manager.process('en', availableQuestions[randIndex]);

  expect(response).toBeDefined();
});