'use client';

import { useEffect, useMemo, useState } from 'react';
import type { VocabularyWord } from '../lib/words';
import { currentWeekWords } from '../lib/words';

type TabKey = 'week' | 'learned';

const STORAGE_KEY = 'icelandic-vocab-learned-words';

export default function VocabApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('week');
  const [flippedWord, setFlippedWord] = useState<string | null>(null);
  const [learnedWords, setLearnedWords] = useState<VocabularyWord[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as VocabularyWord[];
        if (Array.isArray(parsed)) {
          setLearnedWords(parsed);
        }
      }
    } catch {
      // Ef geymsla bregst byrjum við með tóman lista.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(learnedWords));
  }, [learnedWords, hydrated]);

  const learnedWordSet = useMemo(() => new Set(learnedWords.map((word) => word.word)), [learnedWords]);

  function markAsLearned(word: VocabularyWord) {
    setLearnedWords((current) => {
      if (current.some((item) => item.word === word.word)) return current;
      return [...current, word];
    });
  }

  function removeFromLearned(wordToRemove: string) {
    setLearnedWords((current) => current.filter((word) => word.word !== wordToRemove));
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Íslenskur orðaforði</p>
        <h1>3 háþróuð orð á viku.</h1>
        <p className="subhead">
          Snúðu hverju spjaldi til að sjá skýringu orðsins og lestu svo dæmasetningarnar fyrir neðan.
          Lærðu orðin eru vistuð í öðrum flipa í þessari tölvu/vafra.
        </p>
      </section>

      <div className="tab-bar" role="tablist" aria-label="Orðaforðaflipar">
        <button
          type="button"
          className={activeTab === 'week' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('week')}
          role="tab"
          aria-selected={activeTab === 'week'}
        >
          Vikunnar
        </button>
        <button
          type="button"
          className={activeTab === 'learned' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('learned')}
          role="tab"
          aria-selected={activeTab === 'learned'}
        >
          Lærð orð ({learnedWords.length})
        </button>
      </div>

      {activeTab === 'week' ? (
        <section className="content-grid" role="tabpanel">
          {currentWeekWords.map((word) => {
            const isFlipped = flippedWord === word.word;
            const isLearned = learnedWordSet.has(word.word);

            return (
              <article key={word.word} className="word-card">
                <button
                  type="button"
                  className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => setFlippedWord(isFlipped ? null : word.word)}
                  aria-label={`Snúa spjaldi fyrir ${word.word}`}
                >
                  <div className="flashcard-inner">
                    <div className="flashcard-face flashcard-front">
                      <span className="part-of-speech">{word.partOfSpeech}</span>
                      <h2>{word.word}</h2>
                      <p>Smelltu til að sjá skýringu</p>
                    </div>
                    <div className="flashcard-face flashcard-back">
                      <span className="part-of-speech">Skýring</span>
                      <h2>{word.meaning}</h2>
                    </div>
                  </div>
                </button>

                <div className="card-footer">
                  <button type="button" className="learn-button" onClick={() => markAsLearned(word)} disabled={isLearned}>
                    {isLearned ? 'Þegar lært' : 'Merkja sem lært'}
                  </button>
                  <p className="sentence-label">Dæmasetningar</p>
                  <ul className="sentence-list">
                    {word.exampleSentences.map((sentence) => (
                      <li key={sentence}>{sentence}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="content-grid" role="tabpanel">
          {learnedWords.length === 0 ? (
            <div className="empty-state">
              <h2>Engin orð eru vistuð enn</h2>
              <p>Notaðu hnappinn á vikuspjöldunum til að geyma orð hér.</p>
            </div>
          ) : (
            learnedWords.map((word) => (
              <article key={word.word} className="learned-card">
                <div>
                  <span className="part-of-speech">{word.partOfSpeech}</span>
                  <h2>{word.word}</h2>
                  <p className="meaning-line">{word.meaning}</p>
                </div>
                <div className="learned-actions">
                  <button type="button" className="secondary-button" onClick={() => removeFromLearned(word.word)}>
                    Fjarlægja
                  </button>
                </div>
                <div className="learned-examples">
                  <p className="sentence-label">Dæmasetningar</p>
                  <ul className="sentence-list">
                    {word.exampleSentences.map((sentence) => (
                      <li key={sentence}>{sentence}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
}
