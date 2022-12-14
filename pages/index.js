import Head from "next/head";
import styles from "../styles/Home.module.css";
import db from "../assets/db.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const randomSolution = db[Math.floor(Math.random() * db.length)];
    setSolution(randomSolution);
  }, [setSolution]);

  return (
    <div>
      <Head>
        <title>Swordle</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Nanagram</h1>
        <div className={styles.grid}>
          <div className={styles.row}>
            <div className={styles.letter}>c</div>
            <div className={styles.letter}>l</div>
            <div className={styles.letter}>o</div>
            <div className={styles.letter}>u</div>
            <div className={styles.letter}>d</div>
          </div>
          <div className={styles.row}>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
          </div>
          <div className={styles.row}>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
          </div>
          <div className={styles.row}>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
          </div>
          <div className={styles.row}>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
            <div className={styles.letter}></div>
          </div>
        </div>
        {db.solutions.map(({ word }, index) => (
          <p key={index}>Secret word: {word}</p>
        ))}

        <div>
          <h1>Swordle Word of the Day</h1>
          {solution && <div>Word: {solution}</div>}
        </div>
      </main>
    </div>
  );
}

/*
Data we need to track:
  ??? Solution
    - 5 letter string, e.g. "cloud"
  ??? Past guesses
    - an array of past guesses
    - each past guess is an array of letter objects [{}, {}, {}, {}, {}]
    - each object represents a letter in the guess word {key: "a", color: "yellow"}
  ??? Current guess
    - string "cloud"
  ??? Keypad letters
    - array of letter objects [{key: "a", color: "yellow"}, {key: "b", color: "green"}, {}, {}, {}]
  ??? Number of turns
    - an integer 0 - 6

Game process:
  ??? Entering words
    - user enters a letter and a square is filled with that letter
    - when a user hits delete it deletes the previous letter
    - when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a previous guess then the word is not submitted
  ??? Checking submitted words:
    - each letter is checked to see if it matches the solution
    - each letter is assigned a color based on its inclusion in the solution
      -- exact matches are green
      -- partial matches are yellow
      -- no matches are gray
    - the guess is added to the grid with the correct colors
    - the current guess moves to the next row
    - the keypad letters are updated
  ??? Ending the game:
    - when the guessed word fully matches the solution:
      -- a modal pops up and says "Golly gosh, that was amazing!"
    - when the user runs out of guesses:
      -- a modal pops up and says "Unlucky"
*/
