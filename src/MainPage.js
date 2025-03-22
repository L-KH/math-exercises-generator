// MainPage.js (Updated with Repère dans le Plan)
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const AnimatedCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      #ff9a9e,
      #fad0c4,
      #ffecd2,
      #fcb69f,
      #fdcbf1,
      #e6e6e6
    );
    background-size: 400% 400%;
    animation: gradientFlow 15s ease infinite;
    opacity: 0.7;
  }

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const CardInner = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1;
`;

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
            <CardContent style={{ backgroundColor: 'rgb(204, 0, 0, 0.15)'}}>
                <Typography variant="h5" gutterBottom>
                  Développement et Factorisation
                </Typography>
                <Typography variant="body1" paragraph>
                  Pratiquez le développement et la factorisation d'expressions algébriques. 
                  Améliorez vos compétences en manipulation d'équations et simplification d'expressions.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button component={Link} to="/developpement-factorisation" variant="contained" style={{ backgroundColor: '#207989', flex: 1, marginRight: '5px' }}>
                    Exercices
                  </Button>
                  <Button component={Link} to="/courses/developpement-factorisation" variant="contained" style={{ backgroundColor: '#2196F3', flex: 1, marginLeft: '5px' }}>
                    Cours
                  </Button>
                </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button component={Link} to="/puissances-racines" variant="contained" style={{ backgroundColor: '#422b98', flex: 1, marginRight: '5px' }}>
                    Exercices
                  </Button>
                  <Button component={Link} to="/courses/puissances-racines" variant="contained" style={{ backgroundColor: '#2196F3', flex: 1, marginLeft: '5px' }}>
                    Cours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardContent style={{ backgroundColor: 'rgb(255, 223, 0, 0.15)'}}>
                <Typography variant="h5" gutterBottom>
                   Racines Carrées
                </Typography>
                <Typography variant="body1" paragraph>
                  Explorez les concepts des racines carrées. 
                  Apprenez à simplifier des expressions contenant des puissances et des racines.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    component={Link} 
                    to="/racines" 
                    variant="contained" 
                    style={{ 
                      backgroundColor: '#FFD700', // Gold
                      flex: 1, 
                      marginRight: '5px',
                      color: '#000', // Black text for better contrast
                      '&:hover': {
                        backgroundColor: '#DAA520' // Darker gold for hover
                      }
                    }}
                  >
                    Exercices
                  </Button>
                  <Button 
                    component={Link} 
                    to="/courses/racines" 
                    variant="contained" 
                    style={{ 
                      backgroundColor: '#F4C430', // Saffron yellow
                      flex: 1, 
                      marginLeft: '5px',
                      color: '#000', // Black text for better contrast
                      '&:hover': {
                        backgroundColor: '#DAA520' // Darker gold for hover
                      }
                    }}
                  >
                    Cours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
<Card>
              <CardContent style={{ backgroundColor: 'rgb(255, 152, 0, 0.15)'}}>
                <Typography variant="h5" gutterBottom>
                   Équations et Inéquations
                </Typography>
                <Typography variant="body1" paragraph>
                  Pratiquez la résolution d'équations et d'inéquations du premier degré.
                  Apprenez à résoudre des problèmes concrets à l'aide d'équations.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    component={Link} 
                    to="/equations-inequations" 
                    variant="contained" 
                    style={{ 
                      backgroundColor: '#FF8C00', // Dark orange
                      flex: 1, 
                      marginRight: '5px',
                      '&:hover': {
                        backgroundColor: '#E67E00' // Slightly darker orange for hover
                      }
                    }}
                  >
                    Exercices
                  </Button>
                  <Button 
                    component={Link} 
                    to="/courses/equations" 
                    variant="contained" 
                    style={{ 
                      backgroundColor: '#FFA533', // Lighter orange
                      flex: 1, 
                      marginLeft: '5px',
                      '&:hover': {
                        backgroundColor: '#FF9614' // Slightly darker for hover
                      }
                    }}
                  >
                    Cours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardContent style={{ backgroundColor: 'rgb(0, 128, 192, 0.15)'}}>
                <Typography variant="h5" gutterBottom>
                   Repère dans le Plan
                </Typography>
                <Typography variant="body1" paragraph>
                  Pratiquez le calcul de vecteurs, distances, et points dans le plan. 
                  Maîtrisez la géométrie analytique et les propriétés des figures géométriques.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    component={Link} 
                    to="/repere-plan" 
                    variant="contained" 
                    style={{ 
                      backgroundColor: '#0080C0', // Blue
                      flex: 1, 
                      marginRight: '5px',
                      '&:hover': {
                        backgroundColor: '#006699' // Darker blue for hover
                      }
                    }}
                  >
                    Exercices
                  </Button>
                  <Button 
                    component={Link} 
                    to="/courses/repere-plan" 
                    variant="contained" 
                    style={{ 
                      backgroundColor: '#40A0D0', // Lighter blue
                      flex: 1, 
                      marginLeft: '5px',
                      '&:hover': {
                        backgroundColor: '#3090C0' // Slightly darker for hover
                      }
                    }}
                  >
                    Cours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <AnimatedCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardInner>
                <CardContent>
                  <Typography variant="h5" gutterBottom style={{ color: '#2E7D32' }}>
                    Générateur d'Examen
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Créez un examen complet couvrant divers sujets mathématiques. 
                    Idéal pour la révision et l'évaluation des compétences.
                  </Typography>
                  <Button 
                    component={Link} 
                    to="/exam" 
                    variant="contained" 
                    style={{ 
                      backgroundColor: '#4CAF50', 
                      color: 'white',
                      width: '100%',
                    }}
                  >
                    Générer un Examen
                  </Button>
                </CardContent>
              </CardInner>
            </Card>
          </AnimatedCard>
          
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;