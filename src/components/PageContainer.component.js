import { Box, Paper, useTheme } from '@mui/material';
import React from 'react'

const PageContainer = (props) => {
  const theme = useTheme();

  return (
  <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
    <Paper sx={{ maxWidth: "80vw", marginX: "auto", minHeight: "100vh", height: "100%", padding: 0 }}>
      {props.children}
    </Paper>
  </Box>
  )
}

export default PageContainer;