// Imports
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { generate, count } from "random-words";

// Import Components
import Header from "./components/Header";
import Status from "./components/Status";
import clsx from "clsx";
import Confetti from 'react-confetti';

// Import Images and JS
import { languages } from "../languages";
import dead from "/images/dead.png";
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

  const ref = useRef(null);
  const newRef = useRef(null);
  const buttonRef = useRef(null);


  // VARIABLES
  const umlaute = "äöü"
  const alphabet = !isChecked ? "abcdefghijklmnopqrstuvwxyz" + umlaute : "abcdefghijklmnopqrstuvwxyz" ;
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameLost = fails === 8;
  
  console.log(guessedLetters[guessedLetters.length -1])
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
    
    if (isGameWon) {
      scrollToTop();
    }
    setFails(newFails);
}

  // Start new Game after click Button

  function handleNewGame(){
    !isChecked ? setCurrentWord(pickGermanWord()) : setCurrentWord(generate());
    setGuessedLetters([""]);
    setShowImage(prev => prev.map((item) => ({...item, isOn: true}) ));
    setFails(0);
    setCount(0);
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

  // Scroll to top of Page function

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Scroll to top when won
  
  if (isGameWon) {
    scrollToTop();
  }

  // Focus on New Game Button
  useEffect(() => {
    if (isGameWon || isGameLost){
      buttonRef.current.focus();
    }
}, [isGameWon,isGameLost]);


  return (
    <>
      <main ref={ref}>

        {isGameWon && <Confetti />}

        <Header lang={isChecked}/>

        <div ref={buttonRef} className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Switch onClick={handleToggle} className="" id="switch"/>
          <Label className="text-xl" htmlFor="switch">{isChecked ? "English" : "Deutsch"}</Label>
        </div>

        <section className="section-status"
        aria-live="polite"
        role="ststus"
        >
          {isGameWon || isGameLost ? <Status won={isGameWon} word={currentWord} checked={isChecked}/> : null }

          {isGameWon || isGameLost ? 
        <button ref={buttonRef}  onClick={handleNewGame} className="btn-newgame my-8">
        {!isChecked ? "NEUES SPIEL" : "NEW GAME"  }  
          </button> : null}

        </section>
       

        

        <section className="languages">
          {showImage.map((item) => (
            <img
              key={nanoid()}
              src={item.isOn ? "../assembly_endgame_v2/" + item.src : dead}
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
                  disabled={fails ===  8 || guessedLetters.includes(item)}
                  aria-disabled={fails === 8}
                  aria-label={`LETTER ${item}`}
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

        {/* Unvisible only for screen readers */}

        <section 
        className="sr-only"
        aria-live="polite"
        role="status"
        > 
          <p> {currentWord.includes(guessedLetters[guessedLetters.length -1]) ?
          `Correct! The letter ${guessedLetters[guessedLetters.length -1]} is in the word.`:
          `Incorrect. The letter ${guessedLetters[guessedLetters.length -1]} is not in the word.`}

          You have {fails} attempts left.

          </p>
          <p>Current word {
            currentWord.split("").map(letter =>
              guessedLetters.includes(letter.toLowerCase()) ? letter + "." : "blank")
              .join(" ")}
          </p>
        </section>
      
      </main>
    </>
  );
}

export default App;
