const testData = {
  combination: 'LGV7',
  question1: {
    questionCode: 'Q12',
    title: 'Loading the vehicle',
    subtitle: 'Show me: ',
    additionalItems: [
      'a) how you\'d check the maximum authorised mass of this vehicle',
      'b) what other checks you\'d carry out to make sure the vehicle\'s not overloaded',
      'c) if you\'re still in doubt, what else you could do',
    ],
    answer1: {
      selected: true,
      label: 'Check vehicle design weight (VI Plate)',
    },
    answer2: {
      selected: true,
      label: 'Check paperwork relating to the load (or check load)',
    },
    answer3: {
      selected: true,
      label: 'Tyre checks for signs of bulging',
    },
    answer4: {
      selected: true,
      label: 'Further check by taking vehicle to nearest weigh bridge',
    },
    score: 20,
  },
  question2: {
    questionCode: 'Q04',
    title: 'Security of vehicle and contents',
    subtitle: 'You are about to drive a high sided vehicle on an unfamilar route. ',
    additionalItems: [
      'a) Show me the visual checks you would make before starting your journey',
      'b) If there is any doubt of the vehicles height what else could you do?',
      'c) If you are involved in a railway bridge strike what action should you take?',
    ],
    answer1: {
      selected: true,
      label: 'Check the vehicle height sign matches the vehicle or load',
    },
    answer2: {
      selected: true,
      label: 'Plan a suitable route / look out for any height restrictions',
    },
    answer3: {
      selected: true,
      label: 'Measure the highest point of the vehicle or load',
    },
    answer4: {
      selected: true,
      label: 'Call the police and railway authority using the bridge ID plate ',
    },
    score: 20,
  },
  question3: {
    questionCode: 'Q15',
    title: 'Preventing criminality and trafficking in illegal immigrants',
    subtitle: 'You\'ve parked at the docks and, following a rest break, you suspect your vehicle' +
      ' may have been tampered with. Show me what checks you\'d make ' +
      'around and inside your vehicle before continuing your journey.',
    additionalItems: [],
    answer1: {
      selected: true,
      label: 'Check external compartments',
    },
    answer2: {
      selected: true,
      label: 'Check under and on top (visual if possible) of the vehicle',
    },
    answer3: {
      selected: true,
      label: 'Check inside the cab and load security. For example, check the trailer seals and curtains',
    },
    answer4: {
      selected: true,
      label: 'Check fuel cap in place (not tampered with). Visual check',
    },
    score: 20,
  },
  question4: {
    questionCode: 'Q11',
    title: 'Assessing emergency situations',
    subtitle: 'You\'re driving on a motorway and flames appear from the engine compartment. Show me:',
    additionalItems: [
      'a) how you’d deal with this small electrical wiring fire',
      'b) which is the appropriate fire extinguisher to use on this fire',
    ],
    answer1: {
      selected: true,
      label: 'Stop as quickly and safely as possible on the hard shoulder. ',
    },
    answer2: {
      selected: true,
      label: 'Identifies correct extinguisher to use on electrical system fire (CO2 / Powder) (Refer to photograph)',
    },
    answer3: {
      selected: true,
      label: 'Awareness of need to contact emergency services',
    },
    answer4: {
      selected: true,
      label: 'Isolate the vehicle (disconnect electric supply)',
    },
    score: 20,
  },
  question5: {
    questionCode: 'Q05',
    title: 'Ability to prevent physical risk',
    subtitle: 'Show me and explain the daily safety checks you\'d make to this vehicle before driving on the road.',
    additionalItems: [],
    answer1: {
      selected: true,
      label: 'Brakes',
    },
    answer2: {
      selected: true,
      label: 'Horn',
    },
    answer3: {
      selected: true,
      label: 'Exhaust system(s)',
    },
    answer4: {
      selected: true,
      label: 'Lights/Reflectors',
    },
    answer5: {
      selected: true,
      label: 'Mirrors',
    },
    answer6: {
      selected: true,
      label: 'Instrument panel warning lights',
    },
    answer7: {
      selected: true,
      label: 'Tyres / Wheel fixings ',
    },
    answer8: {
      selected: true,
      label: 'Height marker',
    },
    answer9: {
      selected: true,
      label: 'Wipers / Washers',
    },
    answer10: {
      selected: true,
      label: 'Air leaks',
    },
    score: 20,
  },
  totalPercent: 100,
};

describe('CPC TestDetailsCardComponent', () => {

});
