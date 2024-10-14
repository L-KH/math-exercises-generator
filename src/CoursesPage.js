import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const CoursesPage = () => {
  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { subject } = useParams();

  useEffect(() => {
    const fetchSubjectData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/pdf/${subject}_data.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSubjectData(data);
      } catch (error) {
        console.error('Error fetching subject data:', error);
        setError(`Failed to load data for ${subject}. Please try again later.`);
        setSubjectData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, [subject]);

  const handleOpenItem = (item, section) => {
    setOpenItem({ ...item, section });
    setCurrentImageIndex(0);
  };

  const handleCloseItem = () => {
    setOpenItem(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (currentImageIndex < openItem.imageCount - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const sections = [
    { key: 'courses', title: 'Cours' },
    { key: 'exercises', title: "Séries d'Exercices" },
    { key: 'challenges', title: 'Défis' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {subjectData.subject}
      </Typography>
      {sections.map((section, index) => (
        <React.Fragment key={section.key}>
          {index > 0 && <hr style={{ margin: '40px 0' }} />}
          <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
            {section.title}
          </Typography>
          <Grid container spacing={3}>
            {subjectData.sections[section.key].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenItem(item, section.key)}
                    >
                      Voir
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}

      <Dialog
        open={openItem !== null}
        onClose={handleCloseItem}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          {openItem && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <React.Fragment>
                    <div style={{ marginBottom: '10px' }}>
                      <Button onClick={zoomIn}>+</Button>
                      <Button onClick={zoomOut}>-</Button>
                      <Button onClick={resetTransform}>Reset</Button>
                    </div>
                    <TransformComponent>
                      <img
                        src={`/pdf/${subject}/images/${openItem.filename}_${currentImageIndex + 1}.jpg`}
                        alt={`Page ${currentImageIndex + 1}`}
                        style={{ maxWidth: '100%', maxHeight: '70vh' }}
                      />
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
              <div style={{ marginTop: '20px' }}>
                <Button onClick={handlePreviousImage} disabled={currentImageIndex === 0}>
                  Previous
                </Button>
                <Button onClick={handleNextImage} disabled={currentImageIndex === openItem.imageCount - 1}>
                  Next
                </Button>
              </div>
              <Typography>
                Page {currentImageIndex + 1} of {openItem.imageCount}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseItem} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CoursesPage;
