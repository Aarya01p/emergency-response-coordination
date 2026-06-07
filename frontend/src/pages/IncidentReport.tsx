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

// 1. Fixed Validation Schema: Removed hidden fields that were blocking the form!
const validationSchema = yup.object({
  title: yup
    .string()
    .required('Incident Title is required'),
  description: yup
    .string()
    .required('Description is required'),
  location: yup
    .string()
    .required('Location is required'),
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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitMessage(null);
        // 2. Pointing to your automated AI processing backend route!
        const response = await api.post('/incidents/report', values);
        
        setSubmitMessage({
          type: 'success',
          text: `Incident reported successfully! AI categorized this as a ${response.data.aiData?.category || 'reported'} event.`,
        });
        formik.resetForm();
      } catch (err) {
        console.error('API submission failed:', err);
        setSubmitMessage({
          type: 'error',
          text: 'Failed to connect to the AI engine backend. Please verify your Render server is up.',
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Incident Title (e.g., Fire in North Warehouse)"
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
                label="What is happening? Describe the situation (AI will automatically analyze type and severity)"
                multiline
                rows={5}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

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

            <Grid item xs={12}>
              <Button
                color="error"
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                Send Incident to AI Dispatcher
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default IncidentReport;
