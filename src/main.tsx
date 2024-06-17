import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import {CssBaseline, Typography} from '@mui/joy';
import { ContextProvider } from './context.jsx';
import Updater from './updater.jsx';
import PlayGround from './playground.jsx';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { useSelector } from 'react-redux';


function Main(){
  return (
    <React.Fragment>
    <ContextProvider>
    <Updater apiUrl='http://localhost:8080'/>
      <CssVarsProvider defaultMode="dark">
        <CssBaseline />
        <Box color="primary">
          <Stack 
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{
              marginLeft: "2em",
              marginTop: "1em",
            }}
          >
          <Typography
            color="primary" variant="soft" 
            sx={{
              width: "fit-content"
            }}
          >
            Lights OUT!
          </Typography>
          <Button
            onClick={function(){}}
            size="sm"
            variant="soft"
          >
            Play
          </Button>
          <Button
            onClick={function(){}}
            size="sm"
            variant="soft"
          >
            Build your Own!
          </Button>
          </Stack>
        </Box>
        <PlayGround />
      </CssVarsProvider>
    </ContextProvider>
  </React.Fragment>
  )
}


const root = createRoot(document.getElementById('root')!);
root.render(<Main/>)