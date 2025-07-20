import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'; // Income
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';     // Expense
import IncomeComponent from './Income'
import ExpenseComponent from './Expense';

const SummaryBox = ({ transactions }) => {
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={2}
      justifyContent="center"
    >
      {/* Income Card */}
      <Paper
        elevation={4}
        sx={{
          flex: 1,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderLeft: '5px solid #4caf50',
        }}
      >
        <ArrowCircleDownIcon sx={{ fontSize: 40, color: '#4caf50' }} />
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            Income this month
          </Typography>
          <IncomeComponent data={transactions} />
        </Box>
      </Paper>

      {/* Expense Card */}
      <Paper
        elevation={4}
        sx={{
          flex: 1,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderLeft: '5px solid #f44336',
        }}
      >
        <ArrowCircleUpIcon sx={{ fontSize: 40, color: '#f44336' }} />
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            Expense this month
          </Typography>
          <ExpenseComponent data={transactions} />
        </Box>
      </Paper>
    </Box>
  );
};

export default SummaryBox;
