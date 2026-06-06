import React from 'react';
import { Paper, Typography } from '@mui/material';

const IncidentMap: React.FC = () => {
  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography color="textSecondary">
        Map component - Integration with Leaflet/Google Maps
      </Typography>
    </Paper>
  );
};

export default IncidentMap;
