const Alexa = require('ask-sdk-core');
const fs = require('fs');
const storyData = JSON.parse(fs.readFileSync(__dirname + '/stories/MyStory.json', 'utf8'));

const extractCharacters = (storyData) => {
  const characters = new Set();
  for (const key in storyData) {
    const node = storyData[key];
    if (!node || !node.text) continue;
    const matches = node.text.matchAll(/(?:^|[\s.])([A-Z][\w\-]+):/g);
    for (const match of matches) {
      const name = match[1].trim();
      if (!["THE", "END"].includes(name.toUpperCase())) {
        characters.add(name);
      }
    }
  }
  return Array.from(characters);
};

function withVoice(text, sessionAttributes) {
  const characterVoices = sessionAttributes.characterVoices || {};
  const defaultVoice = sessionAttributes.voice || 'Amy';
  const lines = text.split(/\n|(?<=\.)\s+/);
  const voicedLines = lines.map(line => {
    const match = line.match(/^\s*([\w\s\-]+):\s*(.*)/);
    if (match) {
      const character = match[1];
      const dialogue = match[2];
      const assignedVoice = characterVoices[character.toLowerCase().replace(/\s+/g, '')] || defaultVoice;
      return `<voice name="${assignedVoice}">${dialogue}</voice>`;
    } else {
      return `<voice name="${defaultVoice}">${line}</voice>`;
    }
  });
  return `<speak>${voicedLines.join(' ')}</speak>`;
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const characters = extractCharacters(storyData);
    const characterList = characters.join(', ');
    const prompt = characters.length > 0
      ? `Welcome to your interactive story. This story includes the following characters: ${characterList}. You can assign a specific voice to each. For example, say: use Amy for Lira. When you're ready, say 'start story'.`
      : `Welcome to your interactive story. When you're ready, say 'start story'.`;
    return handlerInput.responseBuilder
      .speak(prompt)
      .reprompt("Which voice would you like to assign first?")
      .getResponse();
  }
};

const StartStoryIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartStoryIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.currentNode = 'root';
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    const node = storyData['root'];
    if (!node || !node.text) {
      return handlerInput.responseBuilder
        .speak('There was an error loading the beginning of the story. Please try again later.')
        .getResponse();
    }
    const options = Object.keys(node.options || {});
    const speakOutput = `${node.text} You can say: ${options.join(' or ')}`;
    return handlerInput.responseBuilder
      .speak(withVoice(speakOutput, sessionAttributes))
      .reprompt('What do you choose?')
      .getResponse();
  }
};

const ChooseOptionIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseOptionIntent';
  },
  handle(handlerInput) {
    const option = handlerInput.requestEnvelope.request.intent.slots.option.value.toLowerCase();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const currentNode = sessionAttributes.currentNode || 'root';
    const node = storyData[currentNode];
    const nextNodeKey = node.options[option];
    if (!nextNodeKey || !storyData[nextNodeKey]) {
      return handlerInput.responseBuilder
        .speak('I didn\'t understand that choice. Please try again.')
        .reprompt('Please say your choice again.')
        .getResponse();
    }
    const nextNode = storyData[nextNodeKey];
    if (!nextNode.options || nextNode.text.includes('THE END')) {
      return handlerInput.responseBuilder
        .speak(withVoice(nextNode.text, sessionAttributes))
        .getResponse();
    }
    sessionAttributes.currentNode = nextNodeKey;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    const speakOutput = `${nextNode.text} You can say: ${Object.keys(nextNode.options).join(' or ')}`;
    return handlerInput.responseBuilder
      .speak(withVoice(speakOutput, sessionAttributes))
      .reprompt('What do you choose?')
      .getResponse();
  }
};

const RestartIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'RestartIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.currentNode = 'root';
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    const node = storyData['root'];
    if (!node || !node.text) {
      return handlerInput.responseBuilder
        .speak('There was an error restarting the story. Please try again later.')
        .getResponse();
    }
    const options = Object.keys(node.options || {});
    const speakOutput = `${node.text} You can say: ${options.join(' or ')}`;
    return handlerInput.responseBuilder
      .speak(withVoice(speakOutput, sessionAttributes))
      .reprompt('What do you choose?')
      .getResponse();
  }
};

const SetVoiceIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
           Alexa.getIntentName(handlerInput.requestEnvelope) === 'SetVoiceIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const intent = handlerInput.requestEnvelope.request.intent;
    const voiceSlot = intent.slots.voice;
    const characterSlot = intent.slots.character;
    const voice = voiceSlot && voiceSlot.value;
    const character = characterSlot && characterSlot.value;
    if (!voice) {
      return handlerInput.responseBuilder
        .speak("I didn't catch the voice you want to use. Please say something like: use Emma, or assign Brian to Lira.")
        .reprompt("Try saying: use Emma for Lira.")
        .getResponse();
    }
    const selectedVoice = voice.toLowerCase();
    const voiceMap = {
      amy: 'Amy',
      brian: 'Brian',
      emma: 'Emma',
      matthew: 'Matthew',
      joanna: 'Joanna'
    };
    if (!voiceMap[selectedVoice]) {
      return handlerInput.responseBuilder
        .speak("Sorry, I didn't recognize that voice. Please choose Amy, Brian, Emma, Matthew, or Joanna.")
        .reprompt("Please choose a valid voice.")
        .getResponse();
    }
    if (character) {
      const characterKey = character.toLowerCase().replace(/\s+/g, '');
      sessionAttributes.characterVoices = sessionAttributes.characterVoices || {};
      sessionAttributes.characterVoices[characterKey] = voiceMap[selectedVoice];
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .speak(`Assigned ${voiceMap[selectedVoice]} to ${character}.`)
        .reprompt("You can assign another voice or say start story.")
        .getResponse();
    } else {
      sessionAttributes.voice = voiceMap[selectedVoice];
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .speak(`Great! I will use ${voiceMap[selectedVoice]}'s voice from now on.`)
        .reprompt("Are you ready to start?")
        .getResponse();
    }
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'You are playing an interactive story. Just say your choice when prompted.';
    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak('Goodbye!').getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Sorry, I didn\'t understand that. Please try again.')
      .reprompt('Please say your choice.')
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(' ERROR:', JSON.stringify(error, null, 2));
    return handlerInput.responseBuilder
      .speak('Sorry, there was an error. Please try again.')
      .reprompt('Please try again.')
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ChooseOptionIntentHandler,
    SetVoiceIntentHandler,
    StartStoryIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    RestartIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
