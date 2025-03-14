/*
 * Achei: Stolen Object Tracking System.
 * Copyright (C) 2025  Team Achei
 * 
 * This file is part of Achei.
 * 
 * Achei is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Achei is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Achei.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * Contact information: teamachei.2024@gmail.com
*/


"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet.heat"
import MapSidebar from "@/app/components/ui/MapSidebar"
import VisitorLayout from "@/app/layouts/VisitorLayout"

// Update custom CSS for dark theme
const customMapStyle = `
  .leaflet-container {
    background: #121212;
  }
  .leaflet-tile-container img {
    border: none !important;
    filter: invert(1) hue-rotate(180deg) brightness(0.8) contrast(0.9) !important;
  }
  .leaflet-tile {
    border: none !important;
  }
  .leaflet-tile-pane {
    opacity: 1 !important;
  }
  .custom-theft-marker {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  }
  .custom-user-marker {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  }
  .leaflet-control-zoom {
    border: none !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  }
  .leaflet-control-zoom a {
    background-color: #2c2c2c !important;
    color: #ffffff !important;
    border: none !important;
  }
  .leaflet-control-zoom a:hover {
    background-color: #3c3c3c !important;
  }
  .leaflet-popup-content-wrapper {
    background-color: #2c2c2c !important;
    color: #ffffff !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  }
  .leaflet-popup-tip {
    background-color: #2c2c2c !important;
  }
  .leaflet-control-attribution {
    background-color: rgba(44, 44, 44, 0.8) !important;
    color: #999 !important;
    font-size: 10px !important;
  }
  .leaflet-control-attribution a {
    color: #999 !important;
  }
`

// Definindo a interface HeatLayer que está faltando
declare module "leaflet" {
  interface HeatMapOptions {
    minOpacity?: number
    maxZoom?: number
    max?: number
    radius?: number
    blur?: number
    gradient?: Record<string, string>
  }

  class HeatLayer extends L.Layer {
    constructor(latlngs: Array<[number, number, number?]>, options?: HeatMapOptions)
    setLatLngs(latlngs: Array<[number, number, number?]>): this
    addLatLng(latlng: [number, number, number?]): this
    setOptions(options: HeatMapOptions): this
    redraw(): this
  }

  function heatLayer(latlngs: Array<[number, number, number?]>, options?: HeatMapOptions): HeatLayer
}

interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  latitude: number
  longitude: number
}

interface MapProps {
  userType: "visitor" | "citizen" | "police"
  casos: Caso[]
  onBack: () => void
  selectedCaso: Caso | null
  showHeatmap: boolean
  // Mantendo showPatrulhas, mas marcando como opcional já que não é usado
  showPatrulhas?: boolean
}

const Map: React.FC<MapProps> = ({
  userType,
  selectedCaso,
  casos,
  showHeatmap,
  // Removendo showPatrulhas dos parâmetros já que não é usado
  onBack,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const heatLayerRef = useRef<L.HeatLayer | null>(null)
  const userMarkerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const initMap = (center: [number, number], zoom: number) => {
      if (mapRef.current) return // Prevent re-initialization

      // Garantindo que mapContainerRef.current não é null
      if (!mapContainerRef.current) return

      const mapInstance = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
        renderer: L.canvas(), // Use canvas renderer for better performance
      })

      // Use dark map style
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
        className: "dark-style-tiles",
      }).addTo(mapInstance)

      // Add zoom control to the bottom-right corner
      L.control.zoom({ position: "bottomright" }).addTo(mapInstance)

      markersLayerRef.current = L.layerGroup().addTo(mapInstance)
      mapRef.current = mapInstance

      setIsLoading(false)
    }

    const setupMap = () => {
      if (userType === "visitor") {
        initMap([-15.7801, -47.9292], 12) // Brasília
      } else if (userType === "citizen" || userType === "police") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            initMap([latitude, longitude], 13)

            const userIcon = L.divIcon({
              className: "custom-user-marker",
              html: `<div style="
                width: 20px;
                height: 20px;
                background-color: #3498db;
                border-radius: 50%;
                box-shadow: 0 0 10px #3498db;
              "></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })

            if (mapRef.current) {
              userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
                .addTo(mapRef.current)
                .bindPopup("Sua localização")
            }
          },
          (err) => {
            console.error("Erro ao obter localização:", err)
            setError("Não foi possível obter sua localização. Usando localização padrão.")
            initMap([-15.7801, -47.9292], 5) // Fallback para o centro do Brasil
          },
          { timeout: 10000, enableHighAccuracy: true },
        )
      }
    }

    setupMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [userType])

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return

    markersLayerRef.current.clearLayers()

    const theftIcon = L.divIcon({
      className: "custom-theft-marker",
      html: `<div style="
        width: 30px;
        height: 30px;
        background-color: #ff4444;
        border-radius: 50%;
        border: 2px solid #2c2c2c;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    })

    casos.forEach((caso) => {
      // Garantindo que latitude e longitude existem
      if (caso.latitude !== undefined && caso.longitude !== undefined) {
        L.marker([caso.latitude, caso.longitude], { icon: theftIcon })
          .addTo(markersLayerRef.current!)
          .bindPopup(`<b>${caso.objeto}</b><br>Roubado em: ${caso.dataRoubo}<br>Local: ${caso.localizacao}`)
      }
    })
  }, [casos])

  useEffect(() => {
    if (!mapRef.current) return

    if (showHeatmap) {
      if (!heatLayerRef.current) {
        // Filtrando casos com latitude e longitude definidos
        const validCasos = casos.filter((caso) => caso.latitude !== undefined && caso.longitude !== undefined)

        const heatData = validCasos.map((caso) => [caso.latitude, caso.longitude, 1] as [number, number, number])

        // Usando L.heatLayer em vez de (L as any).heatLayer
        heatLayerRef.current = L.heatLayer(heatData, {
          radius: 25,
          gradient: {
            0.4: "#4a90e2",
            0.6: "#2ecc71",
            0.7: "#f1c40f",
            0.8: "#e67e22",
            1.0: "#e74c3c",
          },
          blur: 15,
          maxZoom: 17,
        }).addTo(mapRef.current)
      }
    } else if (heatLayerRef.current) {
      mapRef.current.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }
  }, [showHeatmap, casos])

  useEffect(() => {
    if (!mapRef.current || !selectedCaso) return

    // Garantindo que latitude e longitude existem
    if (selectedCaso.latitude !== undefined && selectedCaso.longitude !== undefined) {
      mapRef.current.setView([selectedCaso.latitude, selectedCaso.longitude], 15)
    }
  }, [selectedCaso])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [])

  const mapContent = (
    <>
      <MapSidebar
        casos={casos}
        onCasoSelect={(caso) => {
          if (mapRef.current && caso.latitude !== undefined && caso.longitude !== undefined) {
            mapRef.current.setView([caso.latitude, caso.longitude], 15)
          }
        }}
        onToggleHeatmap={(enabled) => {
          if (mapRef.current) {
            if (enabled) {
              if (!heatLayerRef.current) {
                // Filtrando casos com latitude e longitude definidos
                const validCasos = casos.filter((caso) => caso.latitude !== undefined && caso.longitude !== undefined)

                const heatData = validCasos.map(
                  (caso) => [caso.latitude, caso.longitude, 1] as [number, number, number],
                )

                // Usando L.heatLayer em vez de (L as any).heatLayer
                heatLayerRef.current = L.heatLayer(heatData, {
                  radius: 25,
                  gradient: {
                    0.4: "#4a90e2",
                    0.6: "#2ecc71",
                    0.7: "#f1c40f",
                    0.8: "#e67e22",
                    1.0: "#e74c3c",
                  },
                  blur: 15,
                  maxZoom: 17,
                }).addTo(mapRef.current)
              }
            } else if (heatLayerRef.current) {
              mapRef.current.removeLayer(heatLayerRef.current)
              heatLayerRef.current = null
            }
          }
        }}
        onBack={onBack}
        userType={userType}
      />
      <div
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-gray-900 bg-opacity-70 text-white p-4 text-center">
          Carregando o mapa...
        </div>
      )}
      {error && <div className="absolute top-0 left-0 right-0 z-20 bg-red-500 text-white p-4 text-center">{error}</div>}
    </>
  )

  return (
    <>
      <style jsx global>
        {customMapStyle}
      </style>
      {userType === "visitor" ? (
        <VisitorLayout>{mapContent}</VisitorLayout>
      ) : (
        <div className="relative h-screen w-full">{mapContent}</div>
      )}
    </>
  )
}

export default Map

