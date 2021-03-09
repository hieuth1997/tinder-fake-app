import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import TinderCard from 'react-tinder-card';
import './tinderCard.scss';
const alreadyRemoved = [];
function TinderCardCustom({ users }) {
  let charactersState = users;
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  useEffect(() => {
    setCharacters(users);
  }, [users]);
  const childRefs = useMemo(() => {
    return Array(characters.length)
      .fill(0)
      .map((i) => React.createRef());
  }, [characters]);
  console.log(childRefs);

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (email) => {
    charactersState = charactersState.filter(
      (character) => character.email !== email,
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.email),
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].email; // Find the card object to be removed
      const index = characters
        .map((person) => person.email)
        .indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
    if (cardsLeft.length === 1) {
      console.log('OUT OF ITEM');
    }
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <div className="container">
        <div className="cardContainer">
          {characters.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.id}
              onSwipe={(dir) => swiped(dir, character.email)}
            >
              <div className="card">
                <img
                  src={character.picture}
                  alt="profilePicture"
                  className="card-image"
                />
                <div className="overlay">
                  <div className="text-box">
                    <h4 className="name">{character.firstName}</h4>
                  </div>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="button-container">
          <div className="buttons">
            <button onClick={() => swipe('left')}>Dislike</button>
            <button onClick={() => swipe('right')}>Like</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TinderCardCustom;
