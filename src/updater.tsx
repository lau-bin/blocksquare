import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GameState, actions } from './state.js';
import { styled, Grid } from '@mui/joy';

const Updater: React.FC<{ apiUrl: string }> = (props)=>{
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      // load test data
      try {
        await axios.post(props.apiUrl + "/problems", {
          "full_scan": true,
          problem:{
            blocks: [
              true, false, false,
              false, false, false,
              false, false, false
            ],
            width: 3
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        const res = await axios.get<Problem[]>(props.apiUrl + "/problems");
        const data: GameState = {};
        res.data.forEach(el=>{
          data[el.id] = {
            values: el.blocks,
            width: el.width
          }
        });

        dispatch(actions.load(data));
      } catch (err) {
        console.error("Error loading game data")
      }
    };

    fetchData();
  }, []);
  return undefined;
}

interface Problem{
  id: string,
  blocks: GameBlockType[],
  width: number
}

enum GameBlockType{
  ON=1,
  OFF=0
}

export default Updater;
export {Problem, GameBlockType};