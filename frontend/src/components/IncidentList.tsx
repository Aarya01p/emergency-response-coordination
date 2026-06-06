import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const IncidentList: React.FC = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Incidents
      </Typography>
      <List>
        {/* Incidents will be fetched and displayed here */}
        <ListItem>
          <ListItemText
            primary="No incidents yet"
            secondary="New incidents will appear here"
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default IncidentList;
