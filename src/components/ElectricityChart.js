import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { formatInTimeZone } from 'date-fns-tz';

function ElectricityChart({ data, timeZone }) {
  const theme = useTheme();

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Carbon Intensity and Renewable Percentage Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="datetime"
              tickFormatter={(tick) =>
                formatInTimeZone(new Date(tick), timeZone, 'HH:mm')
              }
              tick={{ fill: theme.palette.text.primary }}
            />
<YAxis
              yAxisId="left"
              label={{
                value: 'Carbon Intensity (gCO₂eq/kWh)',
                angle: -90,
                position: 'insideLeft',
                dx: 0, // Adjust the label position to the right
                style: {
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                },
              }}
              tick={{ fill: theme.palette.text.primary }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: 'Renewable Percentage (%)',
                angle: -90,
                position: 'insideRight',
                dx: -0, // Adjust the label position to the left
                style: {
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                },
              }}
              tick={{ fill: theme.palette.text.primary }}
            />
            <Tooltip
              labelFormatter={(label) =>
                formatInTimeZone(new Date(label), timeZone, 'PPPppp')
              }
              contentStyle={{ borderRadius: 8 }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="carbonIntensity"
              stroke={theme.palette.primary.main}
              name="Carbon Intensity"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="renewablePercentage"
              stroke={theme.palette.success.main}
              name="Renewable Percentage"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ElectricityChart;