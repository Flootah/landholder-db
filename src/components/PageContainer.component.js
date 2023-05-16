import { Box, Paper, useTheme } from '@mui/material';
import React from 'react'

const PageContainer = (props) => {
  const theme = useTheme();

  return (
  <Box sx={{ backgroundColor: theme.palette.grey[300], padding: 0}}>
    <Paper sx={
      {
        maxWidth: "100vw", 
        marginX: "auto",
        marginY: "0",
        minHeight: "100vh", 
        height: "100%", 
        padding: "0 100px",
      }}>
      {props.children}
    </Paper>
  </Box>
  )
}

export default PageContainer;