import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: 'auto',
        backgroundColor: '#ffffff',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} ZEUS Dashboard. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;