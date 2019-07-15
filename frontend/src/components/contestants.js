import React, { Fragment } from 'react';
import ContestantList from './contestantList';

function Contestants({contestants, saveRefreshContestants}) {

  return (
      <Fragment>
          <h1 className="text-center">Concursantes</h1>
          <ul className="list-group mt-5">
            {contestants.map(contestant => (
                <ContestantList
                  key={contestant._id}
                  contestant={contestant}
                  saveRefreshContestants={saveRefreshContestants}
                />

              ))}
          </ul>
      </Fragment>
)
}
export default Contestants;
