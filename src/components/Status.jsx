import React from 'react';

const Status = (props) => {
  
  const style = {
    backgroundColor: props.won ? "#0aaa5b" : "#bb2b2a",
  }

  return (
    <section style={style} className='status'>
      {props.won ? (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      ) : (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😃</p>
        </>
      )}
    </section>
  );
}

export default Status;