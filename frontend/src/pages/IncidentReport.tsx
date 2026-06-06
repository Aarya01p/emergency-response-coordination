import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Grid, Box, MenuItem, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '../services/api';

const validationSchema = yup.object({
  title: yup
    .string('Enter incident title')
    .required('Title is required'),
  description: yup
    .string('Enter incident description')
    .required('Description is required'),
  type: yup
    .string('Select incident type')
    .required('Type is required'),
  severity: yup
    .string('Select severity')
    .required('Severity is required'),
  location: yup
    .string('Enter location')
    .required('Location is required'),
});

const IncidentReport: React.FC = () => {
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      type: '',
      severity: 'MEDIUM',
      location: '',
      latitude: '',
      longitude: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post('/incidents', values);
        setSubmitMessage({ type: 'success', text: 'Incident reported successfully!' });
        formik.resetForm();
      } catch (err) {
        setSubmitMessage({ type: 'error', text: 'Failed to report incident. Please try again.' });
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <h1>Report New Incident</h1>

        {submitMessage && (
          <Alert severity={submitMessage.type} sx={{ mb: 2 }}>
            {submitMessage.text}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Incident Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="type"
                name="type"
                label="Incident Type"
                select
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                <MenuItem value="FIRE">Fire</MenuItem>
                <MenuItem value="MEDICAL">Medical Emergency</MenuItem>
                <MenuItem value="ACCIDENT">Accident</MenuItem>
                <MenuItem value="NATURAL_DISASTER">Natural Disaster</MenuItem>
                <MenuItem value="SECURITY">Security Threat</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="severity"
                name="severity"
                label="Severity"
                select
                value={formik.values.severity}
                onChange={formik.handleChange}
              >
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="CRITICAL">Critical</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="latitude"
                name="latitude"
                label="Latitude"
                type="number"
                value={formik.values.latitude}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="longitude"
                name="longitude"
                label="Longitude"
                type="number"
                value={formik.values.longitude}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Report Incident
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default IncidentReport;
