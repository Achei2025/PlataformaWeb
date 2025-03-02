"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet.heat"
import MapSidebar from "@/app/components/ui/MapSidebar"

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
  showPatrulhas: boolean
}

const Map: React.FC<MapProps> = ({ userType, selectedCaso, casos, showHeatmap, showPatrulhas, onBack }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const heatLayerRef = useRef<L.HeatLayer | null>(null)
  const userMarkerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const initMap = (center: [number, number], zoom: number) => {
      if (mapRef.current) return // Prevent re-initialization

      const mapInstance = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
      })

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(mapInstance)

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
                background-color: #007bff;
                border-radius: 50%;
                box-shadow: 0 0 10px #007bff;
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
        background-color: #ff4136;
        border-radius: 50%;
        border: 2px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
        font-weight: bold;
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
      L.marker([caso.latitude, caso.longitude], { icon: theftIcon })
        .addTo(markersLayerRef.current!)
        .bindPopup(`<b>${caso.objeto}</b><br>Roubado em: ${caso.dataRoubo}<br>Local: ${caso.localizacao}`)
    })
  }, [casos])

  useEffect(() => {
    if (!mapRef.current) return

    if (showHeatmap) {
      if (!heatLayerRef.current) {
        const heatData = casos.map((caso) => [caso.latitude, caso.longitude, 1])
        heatLayerRef.current = (L as any).heatLayer(heatData, { radius: 25 }).addTo(mapRef.current)
      }
    } else if (heatLayerRef.current) {
      mapRef.current.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }
  }, [showHeatmap, casos])

  useEffect(() => {
    if (!mapRef.current || !selectedCaso) return

    mapRef.current.setView([selectedCaso.latitude, selectedCaso.longitude], 15)
  }, [selectedCaso])

  return (
    <div className="relative h-screen w-full">
      <MapSidebar
        casos={casos}
        onCasoSelect={(caso) => {
          if (mapRef.current) {
            mapRef.current.setView([caso.latitude, caso.longitude], 15)
          }
        }}
        onToggleHeatmap={(enabled) => {
          if (mapRef.current) {
            if (enabled) {
              if (!heatLayerRef.current) {
                const heatData = casos.map((caso) => [caso.latitude, caso.longitude, 1])
                heatLayerRef.current = (L as any).heatLayer(heatData, { radius: 25 }).addTo(mapRef.current)
              }
            } else if (heatLayerRef.current) {
              mapRef.current.removeLayer(heatLayerRef.current)
              heatLayerRef.current = null
            }
          }
        }}
        onBack={onBack}
        showPatrulhas={showPatrulhas}
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
        <div className="absolute top-0 left-0 right-0 z-20 bg-black bg-opacity-50 text-white p-4 text-center">
          Carregando o mapa...
        </div>
      )}
      {error && <div className="absolute top-0 left-0 right-0 z-20 bg-red-500 text-white p-4 text-center">{error}</div>}
    </div>
  )
}

export default Map

