import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Header, Footer, ElectricityDataDisplay, ElectricityChart, ConsumptionOptimizer } from './components';
import { countries } from './countries';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [electricityData, setElectricityData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchElectricityData = async (zone) => {
    if (!zone) {
      setElectricityData(null);
      setChartData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Fetch latest carbon intensity data
      const carbonIntensityResponse = await axios.get(
        'https://api.electricitymap.org/v3/carbon-intensity/latest',
        {
          headers: {
            'auth-token': process.env.REACT_APP_AUTH_TOKEN,
          },
          params: {
            zone: zone,
          },
        }
      );

      // Fetch latest power breakdown data
      const powerBreakdownResponse = await axios.get(
        'https://api.electricitymap.org/v3/power-breakdown/latest',
        {
          headers: {
            'auth-token': process.env.REACT_APP_AUTH_TOKEN,
          },
          params: {
            zone: zone,
          },
        }
      );

      // Merge the data
      const latestData = {
        ...carbonIntensityResponse.data,
        renewablePercentage: powerBreakdownResponse.data.renewablePercentage,
        fossilFreePercentage: powerBreakdownResponse.data.fossilFreePercentage,
        powerConsumptionBreakdown: powerBreakdownResponse.data.powerConsumptionBreakdown,
        powerProductionBreakdown: powerBreakdownResponse.data.powerProductionBreakdown,
        // Add any other fields you need
      };

      setElectricityData(latestData);

      // Fetch historical carbon intensity data
      const carbonIntensityHistoryResponse = await axios.get(
        'https://api.electricitymap.org/v3/carbon-intensity/history',
        {
          headers: {
            'auth-token': process.env.REACT_APP_AUTH_TOKEN,
          },
          params: {
            zone: zone,
          },
        }
      );

      // Fetch historical power breakdown data
      const powerBreakdownHistoryResponse = await axios.get(
        'https://api.electricitymap.org/v3/power-breakdown/history',
        {
          headers: {
            'auth-token': process.env.REACT_APP_AUTH_TOKEN,
          },
          params: {
            zone: zone,
          },
        }
      );

      // Merge historical data based on datetime
      const carbonHistory = carbonIntensityHistoryResponse.data.history;
      const powerHistory = powerBreakdownHistoryResponse.data.history;

      // Create a map for quick lookup of power data by datetime
      const powerHistoryMap = new Map();
      powerHistory.forEach((item) => {
        powerHistoryMap.set(item.datetime, item);
      });

      // Merge the data
      const mergedHistory = carbonHistory.map((carbonItem) => {
        const powerItem = powerHistoryMap.get(carbonItem.datetime);
        return {
          datetime: carbonItem.datetime,
          carbonIntensity: carbonItem.carbonIntensity,
          renewablePercentage: powerItem ? powerItem.renewablePercentage : null,
        };
      });

      setChartData(mergedHistory);
    } catch (error) {
      console.error('Error fetching electricity data:', error);
      setError(error);
      setElectricityData(null);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectricityData(selectedCountry?.zone);
  }, [selectedCountry]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} />
      <Box sx={{ flex: 1, bgcolor: 'background.default', p: 2 }}>
        {!selectedCountry ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            Please select a country to view data.
          </Typography>
        ) : loading ? (
          <Box sx={{ textAlign: 'center', marginTop: '20%' }}>
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', marginTop: '20%' }}>
            <Typography variant="h6" color="error">
              Error fetching data: {error.message}
            </Typography>
          </Box>
        ) : electricityData ? (
          <>
            <ElectricityDataDisplay
              data={electricityData}
              timeZone={selectedCountry.timeZone}
            />
            {chartData.length > 0 ? (
              <ElectricityChart
                data={chartData}
                timeZone={selectedCountry.timeZone}
              />
            ) : (
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                No chart data available.
              </Typography>
            )}
            {/* Integrate the Consumption Optimizer */}
            <ConsumptionOptimizer />
          </>
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No data available.
          </Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
