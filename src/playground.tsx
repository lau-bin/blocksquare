import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameState, actions, State, RouterView } from './state.js';
import Board from './board.jsx';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';


const PlayGround: React.FC = () => {
  const boardKeys = useSelector((state: State) => Object.keys(state.gameState));
  const state = useSelector((state: State) => state.view);

  return (
    <React.Fragment>
      {state === RouterView.PLAY ?
        <Box color="primary">
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {boardKeys.map(k => <Board key={k} boardId={k} solution={[]} />)}
          </Stack>
        </Box>
        :
        undefined
      }
    </React.Fragment>
  )
}

export default PlayGround;