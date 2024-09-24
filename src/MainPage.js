// MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const MainPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom>
          Choisissez votre sujet d'exercices
        </Typography>
      </motion.div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Développement et Factorisation
                </Typography>
                <Typography variant="body1" paragraph>
                  Pratiquez le développement et la factorisation d'expressions algébriques. 
                  Améliorez vos compétences en manipulation d'équations et simplification d'expressions.
                </Typography>
                <Button component={Link} to="/developpement-factorisation" variant="contained" color="primary">
                  Commencer
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Puissances et Racines Carrées
                </Typography>
                <Typography variant="body1" paragraph>
                  Explorez les concepts de puissances et de racines carrées. 
                  Apprenez à simplifier des expressions contenant des puissances et des racines.
                </Typography>
                <Button component={Link} to="/puissances-racines" variant="contained" color="secondary">
                  Commencer
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
