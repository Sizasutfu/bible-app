// src/data/quizzes.ts
export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  reference?: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  questions: Question[];
};

export const quizzes: Quiz[] = [
  {
    id: 'creation',
    title: 'The Creation',
    description: 'Genesis 1 & 2',
    emoji: '🌍',
    questions: [
      {
        id: 'c1',
        question: 'On which day did God create light?',
        options: ['First day', 'Second day', 'Third day', 'Fourth day'],
        correctIndex: 0,
        explanation: 'God said "Let there be light" on the first day of creation.',
        reference: 'Genesis 1:3',
      },
      {
        id: 'c2',
        question: 'What did God create on the fourth day?',
        options: [
          'Fish and birds',
          'The sun, moon, and stars',
          'Land animals',
          'Man and woman',
        ],
        correctIndex: 1,
        explanation: 'The fourth day brought the lights in the firmament of heaven.',
        reference: 'Genesis 1:14–19',
      },
      {
        id: 'c3',
        question: 'From what did God form the first man?',
        options: ['Clay', 'Water', 'The dust of the ground', 'A rib'],
        correctIndex: 2,
        explanation: 'The LORD God formed man of the dust of the ground.',
        reference: 'Genesis 2:7',
      },
      {
        id: 'c4',
        question: 'On which day did God rest from all his work?',
        options: ['Fifth day', 'Sixth day', 'Seventh day', 'Eighth day'],
        correctIndex: 2,
        explanation: 'God blessed the seventh day and sanctified it, because in it he rested.',
        reference: 'Genesis 2:2–3',
      },
      {
        id: 'c5',
        question: 'What was the first thing God created, according to Genesis 1:1?',
        options: [
          'The heavens and the earth',
          'The light',
          'The sea',
          'The garden of Eden',
        ],
        correctIndex: 0,
        explanation: '"In the beginning God created the heaven and the earth."',
        reference: 'Genesis 1:1',
      },
    ],
  },
  {
    id: 'commandments',
    title: 'The Ten Commandments',
    description: 'Exodus 20',
    emoji: '📜',
    questions: [
      {
        id: 't1',
        question: 'How many commandments were given to Moses on Sinai?',
        options: ['Seven', 'Ten', 'Twelve', 'Forty'],
        correctIndex: 1,
        explanation: 'God gave Moses ten commandments, written on two stone tablets.',
        reference: 'Exodus 20:1–17',
      },
      {
        id: 't2',
        question: 'On which mountain did Moses receive the commandments?',
        options: ['Mount Ararat', 'Mount Carmel', 'Mount Sinai', 'Mount Zion'],
        correctIndex: 2,
        explanation: 'Moses went up to Mount Sinai to receive the law from God.',
        reference: 'Exodus 19:20',
      },
      {
        id: 't3',
        question: 'Which is the FIRST commandment?',
        options: [
          'Honor your father and mother',
          'Do not steal',
          'You shall have no other gods before me',
          'Remember the Sabbath day',
        ],
        correctIndex: 2,
        explanation: 'The first commandment forbids the worship of other gods.',
        reference: 'Exodus 20:3',
      },
      {
        id: 't4',
        question: 'Which commandment deals with honoring parents?',
        options: ['The third', 'The fourth', 'The fifth', 'The sixth'],
        correctIndex: 2,
        explanation: '"Honor thy father and thy mother" is the fifth commandment.',
        reference: 'Exodus 20:12',
      },
      {
        id: 't5',
        question: 'What did Moses do when he came down and saw the golden calf?',
        options: [
          'He prayed for forgiveness',
          'He broke the two stone tablets',
          'He built an altar',
          'He returned up the mountain',
        ],
        correctIndex: 1,
        explanation: 'Moses cast the tablets out of his hands and broke them at the foot of the mount.',
        reference: 'Exodus 32:19',
      },
    ],
  },
  {
    id: 'nativity',
    title: 'The Birth of Jesus',
    description: 'Matthew 1–2 & Luke 1–2',
    emoji: '⭐',
    questions: [
      {
        id: 'n1',
        question: 'Which angel appeared to Mary to announce the birth of Jesus?',
        options: ['Michael', 'Gabriel', 'Raphael', 'Uriel'],
        correctIndex: 1,
        explanation: 'The angel Gabriel was sent from God to a city of Galilee named Nazareth.',
        reference: 'Luke 1:26–27',
      },
      {
        id: 'n2',
        question: 'In which town was Jesus born?',
        options: ['Nazareth', 'Jerusalem', 'Bethlehem', 'Capernaum'],
        correctIndex: 2,
        explanation: 'Jesus was born in Bethlehem of Judaea, in the days of Herod the king.',
        reference: 'Matthew 2:1',
      },
      {
        id: 'n3',
        question: 'Who raised Jesus as his own son on earth?',
        options: ['Zechariah', 'Joseph', 'Simeon', 'John'],
        correctIndex: 1,
        explanation: 'Joseph, the husband of Mary, took Jesus as his own son.',
        reference: 'Matthew 1:24–25',
      },
      {
        id: 'n4',
        question: 'What did the wise men from the east follow?',
        options: ['An angel', 'A cloud by day', 'A star', 'A pillar of fire'],
        correctIndex: 2,
        explanation: 'The wise men followed a star in the east to find the young child.',
        reference: 'Matthew 2:2',
      },
      {
        id: 'n5',
        question: 'In what did Mary wrap the newborn Jesus?',
        options: ['A linen cloth', 'Swaddling clothes', 'A shepherd\u2019s cloak', 'A purple robe'],
        correctIndex: 1,
        explanation: 'Mary wrapped him in swaddling clothes and laid him in a manger.',
        reference: 'Luke 2:7',
      },
    ],
  },
  {
    id: 'parables',
    title: 'Parables of Jesus',
    description: 'The stories Jesus told',
    emoji: '🌱',
    questions: [
      {
        id: 'p1',
        question: 'In the parable of the prodigal son, how many sons did the father have?',
        options: ['One', 'Two', 'Three', 'Four'],
        correctIndex: 1,
        explanation: 'A certain man had two sons — the younger left home, the elder stayed.',
        reference: 'Luke 15:11',
      },
      {
        id: 'p2',
        question: 'In the parable of the Good Samaritan, where was the wounded man traveling to?',
        options: ['Jerusalem', 'Bethlehem', 'Jericho', 'Samaria'],
        correctIndex: 2,
        explanation: 'A certain man went down from Jerusalem to Jericho and fell among thieves.',
        reference: 'Luke 10:30',
      },
      {
        id: 'p3',
        question: 'What did the sower in Jesus\u2019 parable go out to sow?',
        options: ['Wheat', 'Seeds', 'Barley', 'Vines'],
        correctIndex: 1,
        explanation: 'A sower went forth to sow his seed.',
        reference: 'Luke 8:5',
      },
      {
        id: 'p4',
        question: 'In the parable of the talents, how many servants received talents?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctIndex: 1,
        explanation: 'The master delivered his goods to three servants — five, two, and one talent.',
        reference: 'Matthew 25:14–15',
      },
      {
        id: 'p5',
        question: 'How many sheep did the shepherd leave behind to find the one lost sheep?',
        options: ['Fifty', 'Seventy', 'Ninety-nine', 'One hundred'],
        correctIndex: 2,
        explanation: 'He left the ninety and nine and went after the one that was lost.',
        reference: 'Luke 15:4',
      },
    ],
  },
];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}