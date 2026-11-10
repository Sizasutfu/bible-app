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

    // ─────────────────────────────────────────────
  //  Existing quizzes 1–4 stay above this block
  // ─────────────────────────────────────────────

  {
    id: 'noah',
    title: 'Noah and the Flood',
    description: 'Genesis 6–9',
    emoji: '🌊',
    questions: [
      {
        id: 'no1',
        question: 'How many of each clean animal was Noah to take into the ark?',
        options: ['One pair', 'Two pairs', 'Seven pairs', 'Twelve pairs'],
        correctIndex: 2,
        explanation:
          'Of every clean beast Noah was to take seven pairs; of the unclean, one pair.',
        reference: 'Genesis 7:2',
      },
      {
        id: 'no2',
        question: 'How long did the rain fall upon the earth?',
        options: [
          'Seven days',
          'Forty days and forty nights',
          'Seventy days',
          'One hundred days',
        ],
        correctIndex: 1,
        explanation: 'The rain was upon the earth forty days and forty nights.',
        reference: 'Genesis 7:12',
      },
      {
        id: 'no3',
        question: 'Which bird did Noah first send out from the ark?',
        options: ['A dove', 'A raven', 'An eagle', 'A sparrow'],
        correctIndex: 1,
        explanation:
          'Noah sent forth a raven first; later he sent a dove three times.',
        reference: 'Genesis 8:7',
      },
      {
        id: 'no4',
        question: 'What did the dove return with in its beak?',
        options: ['An olive leaf', 'A twig of cedar', 'A grape vine', 'A fig leaf'],
        correctIndex: 0,
        explanation:
          'The dove came back with an olive leaf plucked off, showing the waters had abated.',
        reference: 'Genesis 8:11',
      },
      {
        id: 'no5',
        question: 'On which mountain did the ark come to rest?',
        options: ['Mount Sinai', 'Mount Ararat', 'Mount Carmel', 'Mount Hermon'],
        correctIndex: 1,
        explanation: 'The ark rested upon the mountains of Ararat.',
        reference: 'Genesis 8:4',
      },
    ],
  },
  {
    id: 'exodus',
    title: 'Moses and the Exodus',
    description: 'Exodus 1–14',
    emoji: '🏜️',
    questions: [
      {
        id: 'ex1',
        question: 'In what was the infant Moses placed to be set in the river?',
        options: ['A clay jar', 'An ark of bulrushes', 'A linen basket', 'A wooden chest'],
        correctIndex: 1,
        explanation:
          'His mother made an ark of bulrushes and daubed it with slime and pitch.',
        reference: 'Exodus 2:3',
      },
      {
        id: 'ex2',
        question: 'Who drew Moses out of the water?',
        options: [
          "Pharaoh's daughter",
          'His sister Miriam',
          'An Egyptian guard',
          "Pharaoh's wife",
        ],
        correctIndex: 0,
        explanation: "The daughter of Pharaoh came down to wash herself at the river and found the child.",
        reference: 'Exodus 2:5',
      },
      {
        id: 'ex3',
        question: 'From what did God first speak to Moses at Horeb?',
        options: [
          'A pillar of cloud',
          'A burning bush',
          'A still small voice',
          'A pillar of fire',
        ],
        correctIndex: 1,
        explanation:
          'The bush burned with fire, but was not consumed — and God called to Moses out of it.',
        reference: 'Exodus 3:2',
      },
      {
        id: 'ex4',
        question: 'What was the tenth and final plague upon Egypt?',
        options: ['Locusts', 'Hail', 'Darkness', 'Death of the firstborn'],
        correctIndex: 3,
        explanation:
          'At midnight the LORD smote all the firstborn in the land of Egypt.',
        reference: 'Exodus 12:29',
      },
      {
        id: 'ex5',
        question: 'How did the Israelites cross the Red Sea?',
        options: [
          'On a stone path',
          'God parted the waters',
          'On rafts',
          'Through a tunnel',
        ],
        correctIndex: 1,
        explanation:
          'Moses stretched out his hand, and the LORD caused the sea to go back by a strong east wind.',
        reference: 'Exodus 14:21',
      },
    ],
  },
  {
    id: 'david',
    title: 'David: Shepherd to King',
    description: '1 Samuel 16 – 2 Samuel 5',
    emoji: '👑',
    questions: [
      {
        id: 'd1',
        question: "What was David's occupation before he was anointed?",
        options: ['Fisherman', 'Carpenter', 'Shepherd', 'Scribe'],
        correctIndex: 2,
        explanation:
          'David kept his father\u2019s sheep; he was the youngest of Jesse\u2019s sons.',
        reference: '1 Samuel 16:11',
      },
      {
        id: 'd2',
        question: 'What weapon did David use to strike down Goliath?',
        options: ['A sword', 'A spear', 'A sling and a stone', 'A bow and arrow'],
        correctIndex: 2,
        explanation:
          'David took his sling and a stone, and smote the Philistine in his forehead.',
        reference: '1 Samuel 17:49',
      },
      {
        id: 'd3',
        question: 'How many smooth stones did David take from the brook?',
        options: ['Three', 'Four', 'Five', 'Seven'],
        correctIndex: 2,
        explanation:
          'David chose five smooth stones out of the brook, and his sling was in his hand.',
        reference: '1 Samuel 17:40',
      },
      {
        id: 'd4',
        question: "Who was David's closest friend, the son of Saul?",
        options: ['Joab', 'Jonathan', 'Abner', 'Abiathar'],
        correctIndex: 1,
        explanation:
          'The soul of Jonathan was knit with the soul of David, and Jonathan loved him as his own soul.',
        reference: '1 Samuel 18:1',
      },
      {
        id: 'd5',
        question: 'Which city did David capture and make his capital?',
        options: ['Hebron', 'Bethlehem', 'Jerusalem', 'Gibeah'],
        correctIndex: 2,
        explanation:
          'David took the strong hold of Zion, and it became the city of David.',
        reference: '2 Samuel 5:6–9',
      },
    ],
  },
  {
    id: 'miracles',
    title: 'Miracles of Jesus',
    description: 'Signs in the Gospels',
    emoji: '✨',
    questions: [
      {
        id: 'm1',
        question: "What was Jesus' first recorded miracle?",
        options: [
          'Healing a leper',
          'Turning water into wine',
          'Walking on water',
          'Feeding the five thousand',
        ],
        correctIndex: 1,
        explanation:
          'At the wedding in Cana, Jesus turned water into wine — the beginning of miracles.',
        reference: 'John 2:1–11',
      },
      {
        id: 'm2',
        question: 'How many loaves and fishes fed five thousand men?',
        options: [
          'Three loaves and two fishes',
          'Five loaves and two fishes',
          'Seven loaves and a few fishes',
          'Twelve loaves and three fishes',
        ],
        correctIndex: 1,
        explanation:
          'Five loaves and two fishes were blessed and multiplied, with twelve baskets left over.',
        reference: 'Matthew 14:17–21',
      },
      {
        id: 'm3',
        question: 'Whom did Jesus raise after four days in the tomb?',
        options: [
          "Jairus' daughter",
          "The widow's son at Nain",
          'Lazarus',
          'Tabitha',
        ],
        correctIndex: 2,
        explanation:
          'Lazarus had been in the grave four days when Jesus called him forth.',
        reference: 'John 11:39–44',
      },
      {
        id: 'm4',
        question: 'What did Jesus walk upon before his disciples?',
        options: ['The sea', 'Hot coals', 'The Mount of Olives', 'A cloud'],
        correctIndex: 0,
        explanation:
          'In the fourth watch of the night Jesus went unto them, walking on the sea.',
        reference: 'Matthew 14:25',
      },
      {
        id: 'm5',
        question: 'What did Jesus calm with the words "Peace, be still"?',
        options: ['A crowd', 'A storm on the sea', 'A fever', 'A demon'],
        correctIndex: 1,
        explanation:
          'He arose and rebuked the wind, and said unto the sea, "Peace, be still."',
        reference: 'Mark 4:39',
      },
    ],
  },
  {
    id: 'resurrection',
    title: 'The Resurrection',
    description: 'Matthew 28 · John 20 · Acts 1',
    emoji: '🕊️',
    questions: [
      {
        id: 'r1',
        question: 'Who was the first to see the empty tomb?',
        options: ['Peter', 'John', 'Mary Magdalene', 'Thomas'],
        correctIndex: 2,
        explanation:
          'Mary Magdalene came early, while it was yet dark, unto the sepulchre.',
        reference: 'John 20:1',
      },
      {
        id: 'r2',
        question: 'On what day of the week did Jesus rise from the dead?',
        options: [
          'The Sabbath',
          'The first day of the week',
          'The third day of the week',
          'The seventh day',
        ],
        correctIndex: 1,
        explanation:
          'As it began to dawn toward the first day of the week, the women came to see the sepulchre.',
        reference: 'Matthew 28:1',
      },
      {
        id: 'r3',
        question: 'Who rolled away the stone from the tomb?',
        options: [
          'An angel of the Lord',
          'Peter and John',
          'A Roman guard',
          'Joseph of Arimathaea',
        ],
        correctIndex: 0,
        explanation:
          'The angel of the Lord descended from heaven, and came and rolled back the stone.',
        reference: 'Matthew 28:2',
      },
      {
        id: 'r4',
        question:
          'For how many days did Jesus appear to his disciples after his resurrection?',
        options: ['Seven days', 'Ten days', 'Forty days', 'Fifty days'],
        correctIndex: 2,
        explanation:
          'He showed himself alive by many infallible proofs, being seen of them forty days.',
        reference: 'Acts 1:3',
      },
      {
        id: 'r5',
        question: 'From what place did Jesus ascend into heaven?',
        options: ['Mount Sinai', 'Bethany', 'Mount Carmel', 'The Sea of Galilee'],
        correctIndex: 1,
        explanation:
          'He led them out as far as to Bethany, and was carried up into heaven.',
        reference: 'Luke 24:50–51',
      },
    ],
  },
  {
    id: 'early-church',
    title: 'The Early Church',
    description: 'Acts of the Apostles',
    emoji: '🔥',
    questions: [
      {
        id: 'e1',
        question: 'On what day did the Holy Spirit descend upon the disciples?',
        options: ['Passover', 'Pentecost', 'The Sabbath', 'The Feast of Tabernacles'],
        correctIndex: 1,
        explanation:
          'When the day of Pentecost was fully come, they were all with one accord in one place.',
        reference: 'Acts 2:1–4',
      },
      {
        id: 'e2',
        question: 'Who was the first Christian martyr?',
        options: ['James', 'Stephen', 'Peter', 'Paul'],
        correctIndex: 1,
        explanation:
          'Stephen, full of the Holy Ghost, was stoned — and he kneeled down and prayed for his killers.',
        reference: 'Acts 7:59–60',
      },
      {
        id: 'e3',
        question: 'On what road did Saul encounter the risen Jesus?',
        options: [
          'The road to Emmaus',
          'The road to Damascus',
          'The road to Jericho',
          'The road to Gaza',
        ],
        correctIndex: 1,
        explanation:
          'As he journeyed, he came near Damascus, and suddenly there shined round about him a light from heaven.',
        reference: 'Acts 9:3',
      },
      {
        id: 'e4',
        question: "What was Saul's name changed to?",
        options: ['Silas', 'Barnabas', 'Paul', 'Timothy'],
        correctIndex: 2,
        explanation:
          'Then Saul (who also is called Paul), filled with the Holy Ghost, began his ministry to the Gentiles.',
        reference: 'Acts 13:9',
      },
      {
        id: 'e5',
        question:
          "In Peter's vision at Joppa, what did he see let down from heaven?",
        options: [
          'A ladder',
          'A great sheet with unclean animals',
          'A flaming sword',
          'A dove',
        ],
        correctIndex: 1,
        explanation:
          'A great sheet knit at the four corners was let down, filled with all manner of beasts.',
        reference: 'Acts 10:11–16',
      },
    ],
  },
  {
    id: 'women',
    title: 'Women of the Bible',
    description: 'Faithful women of Scripture',
    emoji: '💐',
    questions: [
      {
        id: 'w1',
        question: 'Who was the mother of Isaac?',
        options: ['Rebekah', 'Sarah', 'Rachel', 'Hagar'],
        correctIndex: 1,
        explanation:
          'Sarah conceived and bare Abraham a son in his old age, whom Abraham named Isaac.',
        reference: 'Genesis 21:1–2',
      },
      {
        id: 'w2',
        question: 'Which woman hid Israelite spies in Jericho?',
        options: ['Deborah', 'Rahab', 'Ruth', 'Jael'],
        correctIndex: 1,
        explanation:
          'Rahab hid the two spies under stalks of flax on her roof, and her household was spared.',
        reference: 'Joshua 2:1–4',
      },
      {
        id: 'w3',
        question: 'Who was the mother of the prophet Samuel?',
        options: ['Hannah', 'Elizabeth', 'Anna', 'Abigail'],
        correctIndex: 0,
        explanation:
          'Hannah prayed for a son and vowed to give him to the LORD; Samuel was her firstborn.',
        reference: '1 Samuel 1:20',
      },
      {
        id: 'w4',
        question: 'Which Jewish queen saved her people in Persia?',
        options: ['Vashti', 'Esther', 'Jezebel', 'Athaliah'],
        correctIndex: 1,
        explanation:
          'Esther risked her life to plead with the king on behalf of the Jews.',
        reference: 'Esther 4:14',
      },
      {
        id: 'w5',
        question: 'Which woman was the first to see the risen Christ?',
        options: [
          'Mary, the mother of Jesus',
          'Mary Magdalene',
          'Martha of Bethany',
          'Salome',
        ],
        correctIndex: 1,
        explanation:
          'Mary Magdalene stood at the sepulchre weeping until Jesus called her by name.',
        reference: 'John 20:14–18',
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Bible Numbers',
    description: 'Key numbers of Scripture',
    emoji: '🔢',
    questions: [
      {
        id: 'nb1',
        question: 'How many books are in the entire Bible?',
        options: ['27', '39', '66', '72'],
        correctIndex: 2,
        explanation:
          '66 books: 39 in the Old Testament, 27 in the New Testament.',
      },
      {
        id: 'nb2',
        question: 'How many books are in the New Testament?',
        options: ['21', '27', '29', '39'],
        correctIndex: 1,
        explanation:
          '27 books — the Gospels, Acts, the Epistles, and Revelation.',
      },
      {
        id: 'nb3',
        question: 'How many plagues did God send upon Egypt?',
        options: ['Seven', 'Ten', 'Twelve', 'Forty'],
        correctIndex: 1,
        explanation:
          'Ten plagues, ending with the death of the firstborn and Israel\u2019s deliverance.',
        reference: 'Exodus 7–12',
      },
      {
        id: 'nb4',
        question: 'How many apostles did Jesus choose?',
        options: ['Seven', 'Ten', 'Twelve', 'Seventy'],
        correctIndex: 2,
        explanation:
          'He called his disciples and chose twelve of them, whom he also named apostles.',
        reference: 'Luke 6:13',
      },
      {
        id: 'nb5',
        question: 'How many churches are addressed in Revelation?',
        options: ['Three', 'Five', 'Seven', 'Twelve'],
        correctIndex: 2,
        explanation:
          'Seven churches of Asia: Ephesus, Smyrna, Pergamos, Thyatira, Sardis, Philadelphia, Laodicea.',
        reference: 'Revelation 2–3',
      },
    ],
  },
];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}