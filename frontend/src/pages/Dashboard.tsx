import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Box, CircularProgress } from '@mui/material';
import StatsCard from '../components/StatsCard';
import IncidentMap from '../components/IncidentMap';
import IncidentList from '../components/IncidentList';
import AlertPanel from '../components/AlertPanel';
import { api } from '../services/api';

interface Stats {
  totalIncidents: number;
  openIncidents: number;
  criticalIncidents: number;
  availableResources: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Incidents"
            value={stats?.totalIncidents || 0}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Open Incidents"
            value={stats?.openIncidents || 0}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Critical"
            value={stats?.criticalIncidents || 0}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Resources Available"
            value={stats?.availableResources || 0}
            color="success"
          />
        </Grid>

        {/* Map */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '500px' }}>
            <IncidentMap />
          </Paper>
        </Grid>

        {/* Alerts */}
        <Grid item xs={12} md={4}>
          <AlertPanel />
        </Grid>

        {/* Recent Incidents */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <IncidentList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
