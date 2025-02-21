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
        {/* Three diagonal stripes */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
            background: `repeating-linear-gradient(
              -45deg,
              #FFC107,
              #FFC107 20px,
              #2196F3 20px,
              #2196F3 40px,
              #4CAF50 40px,
              #4CAF50 60px
            )`,
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
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
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
                }}
              >
                Protegemos o que é mais importante para você. Nossa tecnologia de ponta garante a segurança dos seus dados
                e a tranquilidade que você merece.
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
            </Grid>
            <Grid item xs={12} md={6}>
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
                  fill
                  style={{
                    objectFit: "cover",
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

