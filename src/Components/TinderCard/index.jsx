import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import TinderCard from 'react-tinder-card';
import './tinderCard.scss';

const alreadyRemoved = [];

function TinderCardCustom({ users }) {
  let charactersState = users;
  console.log(charactersState);
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  useEffect(() => {
    setCharacters(users);
  }, [users]);

  const childRefs = useMemo(
    () =>
      Array(characters.length)
        .fill(0)
        .map((i) => React.createRef()),
    [],
  );

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
    charactersState = charactersState.filter(
      (character) => character.name !== name,
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.id),
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      const index = users.map((person) => person.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  console.log(characters);
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
              onSwipe={(dir) => swiped(dir, character.id)}
              onCardLeftScreen={() => outOfFrame(character.id)}
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
