import React, { Fragment } from 'react';
import ContestantList from './contestantList';
import CharacterList from './characterList';

function Characters({characters}) {

  return (
      <Fragment>
          <h1 className="text-center">Personajes</h1>
          <ul className="list-group mt-5">
          {characters.map(character => (
                <CharacterList
                    key={character.created}
                    character={character}

                />

              ))}
          </ul>
      </Fragment>
)
}
export default Characters;