import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  Alert
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '../services/api';

// Validation Schema
const validationSchema = yup.object({
  title: yup.string().required('Incident Title is required'),
  description: yup.string().required('Description is required'),
  location: yup.string().required('Location is required'),
});

const IncidentReport: React.FC = () => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      location: '',
      latitude: '',
      longitude: '',
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        setSubmitMessage(null);
        
onSubmit: async (values) => {
  try {
    setSubmitMessage(null);

    await api.post('/incidents', values);

    setSubmitMessage({
      type: 'success',
      text: 'Incident reported successfully!'
    });

    formik.resetForm();
  } catch (err) {
    setSubmitMessage({
      type: 'error',
      text: 'Failed to submit incident'
    });
  }
}
      } catch (err) {
        console.error('API submission failed:', err);

        setSubmitMessage({
          type: 'error',
          text: 'Failed to report incident. Please try again.'
        });
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>

        <h2>🚨 Report New Emergency Incident</h2>

        {submitMessage && (
          <Alert severity={submitMessage.type} sx={{ mb: 2 }}>
            {submitMessage.text}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>

            {/* Title */}
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

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Describe the situation"
                multiline
                rows={5}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location Address"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </Grid>

            {/* Latitude */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="latitude"
                name="latitude"
                label="Latitude (Optional)"
                type="number"
                value={formik.values.latitude}
                onChange={formik.handleChange}
              />
            </Grid>

            {/* Longitude */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="longitude"
                name="longitude"
                label="Longitude (Optional)"
                type="number"
                value={formik.values.longitude}
                onChange={formik.handleChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                color="error"
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                Submit Incident
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default IncidentReport;
