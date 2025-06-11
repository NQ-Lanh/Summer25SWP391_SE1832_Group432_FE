import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper
} from "@mui/material";

const DetailLayout = ({
  title,
  meta,
  image,
  imageTitle,
  imageDesc,
  children
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textAlign: "center",
            mb: 3,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {title}
        </Typography>
        {/* Article Meta Info */}
        {meta && <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 6 }}>{meta}</Box>}
        {/* Hero Image */}
        {image && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "500px",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              mb: 6,
            }}
          >
            <Box
              component="img"
              src={image}
              alt={imageTitle}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
            {(imageTitle || imageDesc) && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  color: "white",
                  p: 3,
                }}
              >
                {imageTitle && (
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    {imageTitle}
                  </Typography>
                )}
                {imageDesc && <Typography variant="body1">{imageDesc}</Typography>}
              </Box>
            )}
          </Box>
        )}
        {/* Main Content */}
        {children}
      </Paper>
    </Container>
  );
};

export default DetailLayout; 