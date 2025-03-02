"use client"

import Image from "next/image"
import { Button, Typography, Box } from "@mui/material"
import Grid from "@mui/material/Grid"

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* Diagonal stripes */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-30%",
          width: "150%",
          height: "250%",
          background: `linear-gradient(
            -45deg,
            transparent 0%,
            transparent 47%,
            #FFD600 47%,
            #FFD600 51%,
            #4CAF50 51%,
            #4CAF50 55%,
            #2196F3 55%,
            #2196F3 59%,
            transparent 59%,
            transparent 100%
          )`,
          transform: "rotate(-5deg)",
          zIndex: 0,
        }}
      />

      {/* Content section */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: 4,
          py: 8,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5}>
            {" "}
            {/* Reduced from md={6} to md={5} */}
            <Box sx={{ pl: { xs: 0, md: 4 } }}>
              {" "}
              {/* Added padding-left on medium and larger screens */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "2.75rem" }, // Reduced font size
                  fontWeight: "bold",
                  mb: 2,
                  color: "black",
                }}
              >
                Segurança em{" "}
                <Box component="span" sx={{ color: "#4CAF50" }}>
                  Primeiro Lugar
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: "rgba(0, 0, 0, 0.8)",
                  fontSize: { xs: "1rem", md: "1.25rem" }, // Reduced font size
                }}
              >
                Protegemos o que é mais importante para você. Nossa tecnologia de ponta garante a segurança dos seus
                dados e a tranquilidade que você merece.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#FFC107",
                  color: "black",
                  "&:hover": {
                    bgcolor: "#FFB300",
                  },
                }}
              >
                Saiba Mais
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            {" "}
            {/* Increased from md={6} to md={7} */}
            <Box
              sx={{
                position: "relative",
                height: "400px",
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                backgroundColor: "white",
                zIndex: 2,
              }}
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Segurança Digital"
                width={600}
                height={400}
                style={{
                  objectFit: "cover",
                  zIndex: 2,
                }}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

