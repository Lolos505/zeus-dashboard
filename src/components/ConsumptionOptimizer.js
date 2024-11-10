import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  Slider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SavingsIcon from '@mui/icons-material/Savings';
import BarChartIcon from '@mui/icons-material/BarChart';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ConsumptionOptimizer() {
  const theme = useTheme();

  // State variables
  const [currentConsumption, setCurrentConsumption] = useState('');
  const [pricePerKwh, setPricePerKwh] = useState('');
  const [reductionPercentage, setReductionPercentage] = useState(10);
  const [result, setResult] = useState(null);

  // Handler for form submission
  const handleCalculate = () => {
    // Validate inputs
    const consumption = parseFloat(currentConsumption);
    const price = parseFloat(pricePerKwh);
    const reduction = parseFloat(reductionPercentage);

    if (
      isNaN(consumption) ||
      isNaN(price) ||
      isNaN(reduction) ||
      consumption <= 0 ||
      price <= 0 ||
      reduction <= 0
    ) {
      alert('Please enter valid positive numbers for all fields.');
      return;
    }

    // Perform calculations
    const minimizedConsumption = consumption * (1 - reduction / 100);
    const potentialSavings = (consumption - minimizedConsumption) * price;

    // Prepare data for the chart
    const chartData = [
      {
        name: 'Current Consumption',
        Consumption: consumption,
        fill: theme.palette.primary.main,
      },
      {
        name: 'Minimized Consumption',
        Consumption: minimizedConsumption,
        fill: theme.palette.success.main, // Green color
      },
    ];

    // Update the result state
    setResult({
      minimizedConsumption: minimizedConsumption.toFixed(2),
      potentialSavings: potentialSavings.toFixed(2),
      chartData,
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            <SavingsIcon sx={{ mr: 1, color: 'primary.main' }} />
            Electricity Consumption Optimizer
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Input Fields */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Total Electricity Consumption */}
            <TextField
              label="Total Consumption (kWh per month)"
              variant="outlined"
              type="number"
              value={currentConsumption}
              onChange={(e) => setCurrentConsumption(e.target.value)}
              fullWidth
            />

            {/* Price per kWh */}
            <TextField
              label="Price per kWh (€)"
              variant="outlined"
              type="number"
              value={pricePerKwh}
              onChange={(e) => setPricePerKwh(e.target.value)}
              fullWidth
            />

            {/* Desired Reduction Percentage */}
            <Box>
              <Typography gutterBottom>
                Desired Reduction Percentage: {reductionPercentage}%
              </Typography>
              <Slider
                value={reductionPercentage}
                onChange={(e, newValue) => setReductionPercentage(newValue)}
                aria-labelledby="reduction-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={50}
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </Box>

            {/* Calculate Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCalculate}
              startIcon={<BarChartIcon />}
              sx={{
                alignSelf: 'flex-start',
                textTransform: 'none',
                borderRadius: 2,
                paddingX: 4,
                paddingY: 1.5,
                boxShadow: '0 4px 20px rgba(0, 122, 255, 0.2)',
              }}
            >
              Calculate Savings
            </Button>
          </Box>

          {/* Results */}
          {result && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Results
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Typography variant="body1">
                  <strong>Minimized Consumption:</strong> {result.minimizedConsumption} kWh/month
                </Typography>
                <Typography variant="body1">
                  <strong>Potential Savings:</strong> {result.potentialSavings}€ per month
                </Typography>
              </Box>

              {/* Chart */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Consumption Comparison
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={result.chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      label={{
                        value: 'Consumption (kWh)',
                        angle: -90,
                        position: 'insideLeft',
                        dy: 0,
                        style: {
                          textAnchor: 'middle',
                          fill: theme.palette.text.primary,
                        },
                      }}
                      tick={{ fill: theme.palette.text.primary }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Consumption" name="Consumption">
                      {result.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ConsumptionOptimizer;
