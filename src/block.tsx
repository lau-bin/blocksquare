import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './state.js';
import { styled, Grid } from '@mui/joy';

const BlockOverlay = styled('img')`
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
width: 100%;
height: 100%;
object-fit: fill;
`;
const BoardBlock = styled('img')`
display: flex;
position: relative;
width: 100%;
height: 100%;
object-fit: fill;
`;

const Block: React.FC<{ type: BlockType, id: string, pos: number, dot: boolean }> = (props)=>{
  const dispatch = useDispatch();

  let imgSrc: string;
  
  if (props.type == BlockType.OFF){
    imgSrc = "resources/out.png";
  } else {
    imgSrc = "resources/light.png";
  }
  return (
    <BoardBlock src={imgSrc}
    onClick={()=>dispatch(actions.select({ boardId: props.id, pos: props.pos }))}>
      {props.dot ? <BlockOverlay /> : undefined}
    </BoardBlock>
  )
}

enum BlockType{
  LIGHT,
  OFF
}

export default Block;
export {BlockType};