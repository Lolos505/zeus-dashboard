import React from 'react';
import { AppBar, Toolbar, Typography, Box, Autocomplete, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BoltIcon from '@mui/icons-material/Bolt';
import { countries } from '../countries';

function Header({ selectedCountry, onCountryChange }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        mx: 2,
        borderRadius: 2,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          color: theme.palette.text.primary,
          borderRadius: 2,
pt:2,
pb:2,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BoltIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" component="div">
              ZEUS - Electric Power Consumption Dashboard
            </Typography>
          </Box>
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            value={selectedCountry}
            onChange={(event, newValue) => {
              onCountryChange(newValue);
            }}
            sx={{
              width: 250,
              backgroundColor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Country" variant="outlined" />
            )}
            isOptionEqualToValue={(option, value) => option.zone === value?.zone}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;