import React from 'react'

const Header = (props) => {
  return (

       <header>
        {props.lang ?
        <>
        <h1 className='uppercase'>Assembly Endgame</h1>
        <p className='header-text'>Guess the word in under 8 attempts to keep the programming world safe!</p>
        </>
        : 
        <>
        <h1 className='uppercase'>Assembly Endspiel</h1>
        <p className='header-text'>Errate das Wort in unter 8 Versuchen, um die Programmierwelt zu schützen!</p>
        </>
        }
         
       </header>
   
  )
}

export default Header