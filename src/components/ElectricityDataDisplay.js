import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

function ElectricityDataDisplay({ data, timeZone }) {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Convert current time and data datetime to the country's time zone
  const zonedCurrentTime = timeZone
    ? toZonedTime(currentTime, timeZone)
    : currentTime;
  const zonedDataTime = timeZone
    ? toZonedTime(new Date(data.datetime), timeZone)
    : new Date(data.datetime);

  return (
    <Box sx={{ mt: 4 }}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Electricity Data
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {/* Country */}
            <Box
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LocationOnIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                Country:
              </Typography>
              <Typography variant="body1">{data.zone}</Typography>
            </Box>

            {/* Carbon Intensity */}
            <Box
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LocalFireDepartmentIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                Carbon Intensity:
              </Typography>
              <Typography variant="body1">
                {data.carbonIntensity} gCO₂eq/kWh
              </Typography>
            </Box>

            {/* Renewable Percentage */}
            <Box
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <EnergySavingsLeafIcon sx={{ mr: 1, color: 'green' }} />
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                Renewable Percentage:
              </Typography>
              <Typography variant="body1">
                {data.renewablePercentage !== undefined
                  ? `${data.renewablePercentage}%`
                  : 'Data not available'}
              </Typography>
            </Box>

            {/* Data Time */}
            <Box
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                Data Time:
              </Typography>
              <Typography variant="body1">
                {format(zonedDataTime, 'PPPppp', { timeZone })}
              </Typography>
            </Box>

            {/* Current Time */}
            <Box
              sx={{
                flex: '1 1 100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                Current Time:
              </Typography>
              <Typography variant="body1">
                {format(zonedCurrentTime, 'PPPppp', { timeZone })}
              </Typography>
            </Box>

            {/* Add more data fields as needed */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ElectricityDataDisplay;
