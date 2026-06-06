import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const AlertPanel: React.FC = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Active Alerts
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="No active alerts"
            secondary="You will be notified of new alerts"
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default AlertPanel;
