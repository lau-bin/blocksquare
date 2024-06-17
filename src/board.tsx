import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, State } from './state.jsx';
import { styled, Grid } from '@mui/joy';
import Block, {BlockType} from "./block.jsx";

const BoardContent = styled('div')`
width: 30%;
`;

const Board: React.FC<{ boardId: string, solution: number[] }> = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state.gameState[props.boardId]);

  const handleReset = (boardId: string) => {
    dispatch(actions.reset({ boardId }));
  };

  return (
    <BoardContent>
      <Grid container spacing={0} columns={state.width}>
      {state.values.map((v, i)=>{
        if (v == 0){
          return (
            <Grid xs={1} key={i}>
              <Block type={BlockType.OFF} id={props.boardId} pos={i} dot={isBlockSol(props.solution, i, state.width)}/>
            </Grid>
          )
        }
        else{
          return (
            <Grid xs={1} key={i}>
              <Block type={BlockType.LIGHT} id={props.boardId} pos={i} dot={isBlockSol(props.solution, i, state.width)}/>
            </Grid>
          )
        }
      })}
      </Grid>
    </BoardContent>
  );
};

function isBlockSol(path: number[], pos: number, width: number){
  if (path.length > 0){
    const y = pos / width;
    const x = pos - (y * width)
    for (let i = 0; i+1 < path.length; i+=2){
      if (path[i] == x && path[i+1] == y){
        return true;
      }
    }
  }
  return false;
}

export default Board;