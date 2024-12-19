// Imports
import { useState } from "react";
import { nanoid } from "nanoid";
import { generate, count } from "random-words";

// Import Components
import Header from "./components/Header";
import Status from "./components/Status";
import clsx from "clsx";

// Import Images and JS
import { languages } from "../languages";
import dead from "/images/dead.png";
import { use} from "react";
import { germanWords } from "../germanWords";


// Shadcn
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


// ########## APP #############
function App() {

  // STATES
  const [currentWord, setCurrentWord] = useState(generate());
  const [guessedLetters, setGuessedLetters] = useState([""]);
  const [count, setCount] = useState(0)
  const [showImage, setShowImage] = useState(languages);
  const [fails, setFails] = useState(0);
  const [isChecked, setIsChecked] = useState(true);

  // VARIABLES
  const umlaute = "äöü"
  const alphabet = !isChecked ? "abcdefghijklmnopqrstuvwxyz" + umlaute : "abcdefghijklmnopqrstuvwxyz" ;
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameLost = fails === 8;
  
  
  // Save guessed Letter in Array(State) guessedLetters and handle Image
  function handleGuess(event) {
    setCount(prev => prev + 1);
    let letter = event.currentTarget.id.toLowerCase();
    let newFails = fails;

    setGuessedLetters((prev) => {
        if (prev.includes(letter)) {
            return prev;
        } else {
            return [...prev, letter];
        }
    });

    // SET FAILS
    if (!currentWord.includes(letter)) {
        newFails += 1; 
    }

    // CHANGE IMAGE
    setShowImage(prev => prev.map((item, index) => {
        if (index === fails && !currentWord.includes(letter)) {
            return { ...item, isOn: false };
        } else {
            return item;
        }
    }));

    setFails(newFails);
}

  // Start new Game after click Button

  function handleNewGame(){
    !isChecked ? setCurrentWord(pickGermanWord()) : setCurrentWord(generate());
    setGuessedLetters([""])
    setShowImage(prev => prev.map((item) => ({...item, isOn: true}) ))
    setFails(0)
    setCount(0)
  }

  // Toggle Language

  const handleToggle = () => {
    isChecked ? setCurrentWord(pickGermanWord()) : setCurrentWord(generate());
    setIsChecked(!isChecked);
    setGuessedLetters([""])
    setShowImage(prev => prev.map((item) => ({...item, isOn: true}) ))
    setFails(0);
    setCount(0);
  };

  // PICK GERMAN WORD

  function pickGermanWord() {
    const randomNumber = Math.ceil(Math.random()*germanWords.length)
    return germanWords[randomNumber].toUpperCase().toLowerCase()
  }
  

  return (
    <>
      <main>
        <Header lang={isChecked}/>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Switch onClick={handleToggle} className="bg-white inline" id="switch"/>
          <Label className="text-xl" htmlFor="switch">{isChecked ? "English" : "Deutsch"}</Label>
        </div>
        {isGameWon || isGameLost ? <Status won={isGameWon} word={currentWord}/> : null }
        <section className="languages">
          {showImage.map((item) => (
            <img
              key={nanoid()}
              src={item.isOn ? item.src : dead}
              alt={item.title}
              width="80px"
            />
          ))}
        </section>

        <section className="word">
          {
          isGameLost ? <h3 className="bg-[var(--clr-error)] text-xl sm:text-6xl p-4 rounded-md">{currentWord.toUpperCase()}</h3>
          :
          currentWord
            .toUpperCase()
            .split("")
            .map((letter) => (
              <h2 id={nanoid()} key={nanoid()}>
                { guessedLetters.includes(letter.toLowerCase()) ? letter : "🤔"}
              </h2>
            ))}
        </section> 

        {isGameWon || isGameLost ? <button onClick={handleNewGame} className="btn-newgame">NEW GAME</button> : null}

        <section className="keyboard">
          {alphabet
            .toUpperCase()
            .split("")
            .map((item) => {
              const inList = guessedLetters.includes(item.toLowerCase());
              const inWord = inList && currentWord.includes(item.toLowerCase());
              const notInWord =
                inList && !currentWord.includes(item.toLowerCase());
              const btnClass = clsx({
                right: inWord,
                wrong: notInWord,
              });
              return (
                <button
                  onClick={handleGuess}
                  className={btnClass}
                  id={item}
                  key={nanoid()}
                >
                  {" "}
                  {item}
                </button>
              );
            })}
        </section>
        
        
      </main>
    </>
  );
}

export default App;
