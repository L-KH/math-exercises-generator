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
              <CardContent style={{ backgroundColor: 'rgb(32, 69, 137, 0.15)'}}>
                <Typography variant="h5" gutterBottom>
                  Développement et Factorisation
                </Typography>
                <Typography variant="body1" paragraph>
                  Pratiquez le développement et la factorisation d'expressions algébriques. 
                  Améliorez vos compétences en manipulation d'équations et simplification d'expressions.
                </Typography>
                <Button component={Link} to="/developpement-factorisation" variant="contained" style={{ backgroundColor: '#207989' }}>
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
              <CardContent style={{ backgroundColor: 'rgb(66, 43, 152, 0.15)'}}>
                <Typography variant="h5" gutterBottom>
                  Les Puissances 
                </Typography>
                <Typography variant="body1" paragraph>
                  Explorez les concepts de puissances. 
                  Apprenez à simplifier des expressions contenant des puissances et des racines.
                </Typography>
                <Button component={Link} to="/puissances-racines" variant="contained" style={{ backgroundColor: '#422b98' }}>
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
              <CardContent style={{ backgroundColor: 'rgb(173, 136, 39, 0.15)'}}>
                <Typography variant="h5" gutterBottom>
                   Racines Carrées
                </Typography>
                <Typography variant="body1" paragraph>
                  Explorez les concepts des racines carrées. 
                  Apprenez à simplifier des expressions contenant des puissances et des racines.
                </Typography>
                <Button component={Link} to="/racines" variant="contained" style={{ backgroundColor: '#ad8827' }}>
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
