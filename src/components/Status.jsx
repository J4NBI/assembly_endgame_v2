import React from 'react';

const Status = (props) => {
  
  const style = {
    backgroundColor: props.won ? "#0aaa5b" : "#bb2b2a",
  }

  function setStatus() {
    if (props.won) {
      if(!props.checked){
        return (
          <>
            <h2>🎉 GEWONNEN 🎉 </h2>
            <p className='text-center' >👉 {props.word.toUpperCase()} 👈</p>
          </>
        )

      } else {
        return (
          <>
            <h2>You win!</h2>
            <p className='text-center' >👉 {props.word.toUpperCase()} 👈</p>
          </>
        )
      }

    } else {
      if(!props.checked) {
        return (
          <>
            <h2>DU HAST VERLOREN!</h2>
            <p className=''>👉 {props.word.toUpperCase()} 👈</p>
          </>
        )

      } else {
        return (
          <>
            <h2>GAME OVER!</h2>
            <p className=''>👉 {props.word.toUpperCase()} 👈</p>
          </>
        )

      }
    }
  }
  

  return (
    <section style={style} className='status'>{setStatus()}</section>
  );
}

export default Status;