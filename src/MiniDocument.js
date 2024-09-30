import React from 'react';
import { MathJax } from 'better-react-mathjax';
import { Typography, Paper, Box } from '@mui/material';

const MiniDocument = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        Les Puissances et Les Exposants - Guide d'Étude
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Introduction</strong> Les puissances sont essentielles en mathématiques, permettant de simplifier des calculs complexes. Comprendre les lois des puissances vous aidera à résoudre des problèmes plus facilement et à éviter les erreurs courantes.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. Règles Fondamentales des Puissances
      </Typography>

      <Box component="ul" sx={{ paddingLeft: 3 }}>
        <li>
          Produit de puissances de même base: 
          <MathJax>{"\\(a^n \\times a^m = a^{n+m}\\)"}</MathJax>
          <br />
          Exemple: <MathJax>{"\\(3^2 \\times 3^4 = 3^{2+4} = 3^6\\)"}</MathJax>
        </li>
        <li>
          Quotient de puissances de même base: 
          <MathJax>{"\\(\\frac{a^n}{a^m} = a^{n-m}\\)"}</MathJax>
          <br />
          Exemple: <MathJax>{"\\(\\frac{5^7}{5^3} = 5^{7-3} = 5^4\\)"}</MathJax>
        </li>
        <li>
          Puissance d'une puissance: 
          <MathJax>{"\\((a^n)^m = a^{n \\times m}\\)"}</MathJax>
          <br />
          Exemple: <MathJax>{"\\((2^3)^2 = 2^{3 \\times 2} = 2^6\\)"}</MathJax>
        </li>
        <li>
          Puissance d'un produit: 
          <MathJax>{"\\((ab)^n = a^n b^n\\)"}</MathJax>
          <br />
          Exemple: <MathJax>{"\\((4 \\times 5)^2 = 4^2 \\times 5^2 = 16 \\times 25 = 400\\)"}</MathJax>
        </li>
        <li>
          Puissance d'un quotient: 
          <MathJax>{"\\(\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}\\)"}</MathJax>
          <br />
          Exemple: <MathJax>{"\\(\\left(\\frac{6}{2}\\right)^2 = \\frac{6^2}{2^2} = \\frac{36}{4} = 9\\)"}</MathJax>
        </li>
        <li>
          Exposant zéro: 
          <MathJax>{"\\(a^0 = 1\\) (si \\(a \\neq 0\\))"}</MathJax>
          <br />
          Exemple: <MathJax>{"\\(7^0 = 1\\)"}</MathJax>
        </li>
        <li>
          Exposant négatif: 
          <MathJax>{"\\(a^{-n} = \\frac{1}{a^n}\\)"}</MathJax>
          <br />
          Exemple: <MathJax>{"\\(2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}\\)"}</MathJax>
        </li>
      </Box>

      <Typography variant="h6" gutterBottom>
        2. Comment Éviter les Erreurs Courantes
      </Typography>

      <Box component="ul" sx={{ paddingLeft: 3 }}>
        <li>
          Ajouter les exposants au lieu de multiplier les bases:
          <br />
          <span style={{ color: 'red' }}>
            Erreur fréquente: <MathJax>{"\\(3^2 \\times 3^3 = 9^5\\) (Faux)"}</MathJax>
          </span>
          <br />
          <span style={{ color: 'green' }}>Correction: <MathJax>{"\\(3^2 \\times 3^3 = 3^{2+3} = 3^5\\)"}</MathJax></span>
        </li>
        <li>
          Ne pas multiplier les exposants lors de la multiplication:
          <br />
          <span style={{ color: 'red' }}>
          Erreur fréquente: <MathJax>{"\\(4^2 \\times 4^3 = 4^6\\) (Faux)"}</MathJax></span>
          <br />
          <span style={{ color: 'green' }}>Correction: <MathJax>{"\\(4^2 \\times 4^3 = 4^{2+3} = 4^5\\)"}</MathJax></span>
        </li>
        <li>
          Bien gérer les exposants négatifs:
          <br />
          <span style={{ color: 'red' }}>Erreur fréquente: <MathJax>{"\\(a^{-2} \\times a^3 = a^{-6}\\) (Faux)"}</MathJax></span>
          <br />
          <span style={{ color: 'green' }}>Correction: <MathJax>{"\\(a^{-2} \\times a^3 = a^{-2+3} = a^1 = a\\)"}</MathJax></span>
        </li>
      </Box>

      <Typography variant="h6" gutterBottom>
        3. Stratégies pour Aborder les Exercices Complexes
      </Typography>

      <Box component="ul" sx={{ paddingLeft: 3 }}>
        <li>Étape par Étape: Ne sautez pas d'étapes. Écrivez chaque opération pour garder une trace de vos calculs.</li>
        <li>Identifier les Bases Communes: Repérez les termes avec la même base pour appliquer les règles appropriées.</li>
        <li>Simplifier les Parenthèses en Premier: Traitez d'abord les expressions entre parenthèses ou exposants composites.</li>
        <li>Gérer les Exposants Négatifs: Rappelez-vous que les exposants négatifs inversent la base.</li>
      </Box>

      <Typography variant="h6" gutterBottom>
        4. Exemples Résolus
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Exemple 1: Simplifiez l'expression suivante:
      </Typography>
      <MathJax>{"\\[\\frac{(-21)^3 \\times 5}{3^5 \\times 3}\\]"}</MathJax>

      <Typography variant="body1" component="div">
        Solution:
        <Box component="ol" sx={{ paddingLeft: 3 }}>
          <li>
            Factoriser les nombres:
            <br />
            <MathJax>{"\\(-21 = -1 \\times 3 \\times 7\\)"}</MathJax>
            <br />
            <MathJax>{"\\(35 = 5 \\times 7\\)"}</MathJax>
          </li>
          <li>
            Écrire en termes de facteurs premiers:
            <br />
            <MathJax>{"\\[\\frac{(-1 \\times 3 \\times 7)^3 \\times 5}{(5 \\times 7)^3 \\times 3}\\]"}</MathJax>
          </li>
          <li>
            Développer les puissances:
            <br />
            <MathJax>{"\\((-1)^3 = -1\\)"}</MathJax>
            <br />
            <MathJax>{"\\(3^3 = 27\\)"}</MathJax>
            <br />
            <MathJax>{"\\(7^3 = 343\\)"}</MathJax>
            <br />
            <MathJax>{"\\(5^3 = 125\\)"}</MathJax>
          </li>
          <li>
            Donc:
            <MathJax>{"\\[\\frac{-1 \\times 27 \\times 343 \\times 5}{125 \\times 343 \\times 3}\\]"}</MathJax>
          </li>
          <li>
            Simplifier:
            <ul>
              <li>Les 343 s'annulent.</li>
              <li>Multiplier les numérateurs et les dénominateurs restants.</li>
            </ul>
            <MathJax>{"\\[\\frac{-1 \\times 27 \\times 5}{125 \\times 3}\\]"}</MathJax>
          </li>
          <li>
            Calculer:
            <ul>
              <li>Numérateur: <MathJax>{"\\(-1 \\times 27 \\times 5 = -135\\)"}</MathJax></li>
              <li>Dénominateur: <MathJax>{"\\(125 \\times 3 = 375\\)"}</MathJax></li>
            </ul>
          </li>
          <li>
            Simplifier la fraction:
            <br />
            Diviser numérateur et dénominateur par 15:
            <br />
            <MathJax>{"\\[\\frac{-135 \\div 15}{375 \\div 15} = \\frac{-9}{25}\\]"}</MathJax>
          </li>
        </Box>
      </Typography>

      <Typography variant="body1" gutterBottom>
        Réponse: <MathJax>{"\\(\\frac{-9}{25}\\)"}</MathJax>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Exemple 2: Simplifiez l'expression suivante:
      </Typography>
      <MathJax>{"\\[\\frac{a^2b(ab^2)^{-3}}{a(a^2b)^5(b^2)^{-1}}\\]"}</MathJax>

      <Typography variant="body1" component="div">
        Solution:
        <Box component="ol" sx={{ paddingLeft: 3 }}>
          <li>
            Développer les puissances négatives:
            <br />
            <MathJax>{"\\((ab^2)^{-3} = a^{-3}b^{-6}\\)"}</MathJax>
            <br />
            <MathJax>{"\\((b^2)^{-1} = b^{-2}\\)"}</MathJax>
          </li>
          <li>
            Développer les puissances positives:
            <br />
            <MathJax>{"\\((a^2b)^5 = a^{10}b^5\\)"}</MathJax>
          </li>
          <li>
            Remplacer dans l'expression:
            <br />
            Numérateur: <MathJax>{"\\(a^2b \\times a^{-3}b^{-6} = a^{2-3}b^{1-6} = a^{-1}b^{-5}\\)"}</MathJax>
            <br />
            Dénominateur: <MathJax>{"\\(a \\times a^{10}b^5 \\times b^{-2} = a^{1+10}b^{5-2} = a^{11}b^3\\)"}</MathJax>
          </li>
          <li>
            Simplifier le quotient:
            <br />
            <MathJax>{"\\[\\frac{a^{-1}b^{-5}}{a^{11}b^3} = a^{-1-11}b^{-5-3} = a^{-12}b^{-8}\\]"}</MathJax>
          </li>
          <li>
            Écrire avec des exposants positifs:
            <br />
            <MathJax>{"\\(a^{-12}b^{-8} = \\frac{1}{a^{12}b^8}\\)"}</MathJax>
          </li>
        </Box>
      </Typography>

      <Typography variant="body1" gutterBottom>
        Réponse: <MathJax>{"\\(\\frac{1}{a^{12}b^8}\\)"}</MathJax>
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Conseils de Professeur
      </Typography>

      <Box component="ul" sx={{ paddingLeft: 3 }}>
        <li>Pratiquez Régulièrement: Plus vous vous exercez, plus vous gagnez en confiance.</li>
        <li>Ne Craignez Pas les Problèmes Complexes: Ce sont des opportunités pour appliquer plusieurs règles et renforcer votre compréhension.</li>
        <li>Demandez de l'Aide: Si vous êtes bloqué, n'hésitez pas à solliciter votre enseignant ou vos camarades.</li>
      </Box>
    </Paper>
  );
};

export default MiniDocument;
