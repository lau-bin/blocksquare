import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameBlockType } from './updater';

interface GameState {
  [boardId: string]: {
    values: number[],
    width: number
  };
}

interface Router{
  view: RouterView
}
enum RouterView{
  PLAY,
  BUILD
}

interface SelectActionPayload {
  boardId: string;
  pos: number;
}

type LoadActionPayload = GameState;

interface ResetActionPayload {
  boardId: string;
}

type State = Router & {gameState: GameState};

const initialState: State = {
  view: RouterView.PLAY,
  gameState: {}
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<SelectActionPayload>) => {
      const { boardId, pos } = action.payload;
      selectBlockOperator(state.gameState[boardId].values, state.gameState[boardId].width, pos);
    },
    load: (state, action: PayloadAction<LoadActionPayload>) => {
      state.gameState = action.payload;
    },
    reset: (state, action: PayloadAction<ResetActionPayload>) => {
      const { boardId } = action.payload;
      if (state[boardId]) {
        state.gameState[boardId].values = new Array(state.gameState[boardId].values.length).fill(GameBlockType.OFF);
      }
    },
  },
});

function selectBlockOperator(values: number[], width: number, pos: number){
  selectBlock(values, pos);
  const y = Math.trunc(pos / width);
  const x = pos - (y * width);

  // select top
  if (y > 0){
    const posTop = ((y - 1) * width) + x;
    selectBlock(values, posTop);
  }
  // select bottom
  if (y < (values.length / width) - 1){
    const posBottom = ((y + 1) * width) + x;
    selectBlock(values, posBottom);
  }
  // select left
  if (x > 0){
    const posLeft = x + (y * width) - 1;
    selectBlock(values, posLeft);
  }
  // select right
  if (x < width - 1){
    const posRight = x + (y * width) + 1;
    selectBlock(values, posRight);
  }
}
function selectBlock(values: number[], pos: number){
  if (values.length > pos)
    if (values[pos] == GameBlockType.ON) {
      values[pos] = GameBlockType.OFF;
    }else{
      values[pos] = GameBlockType.ON;
    }
}

export const actions = gameSlice.actions;
export {RouterView};
export type {GameState, State, Router}
export default gameSlice.reducer;
