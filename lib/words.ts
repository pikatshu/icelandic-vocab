export type VocabularyWord = {
  word: string;
  meaning: string;
  partOfSpeech: string;
  exampleSentences: string[];
};

export const currentWeekWords: VocabularyWord[] = [
  {
    word: 'tvíræður',
    meaning: 'Sem má skilja á fleiri en einn hátt; óljós eða margræð.',
    partOfSpeech: 'lýsingarorð',
    exampleSentences: [
      'Yfirlýsingin hans var svo tvíræð að allir túlkuðu hana á sinn hátt.',
      'Ég reyni að forðast tvíræð orð í formlegum texta.'
    ]
  },
  {
    word: 'ráðdeildarsamur',
    meaning: 'Sem fer vel með fé, tíma eða aðrar auðlindir; sparsamur og skynsamur í ráðstöfun.',
    partOfSpeech: 'lýsingarorð',
    exampleSentences: [
      'Hún er ráðdeildarsöm og eyðir alltaf af yfirvegun.',
      'Ráðdeildarsöm ákvarðanataka skiptir miklu máli þegar fjárhagurinn er þröngur.'
    ]
  },
  {
    word: 'yfirdrifinn',
    meaning: 'Sem er ýktur eða gert meira úr en efni standa til.',
    partOfSpeech: 'lýsingarorð',
    exampleSentences: [
      'Fréttaflutningurinn var yfirdrifinn og hjálpaði ekki til við að skýra málið.',
      'Hann notar stundum yfirdrifin lýsingarorð til að leggja áherslu á punktinn sinn.'
    ]
  }
];
