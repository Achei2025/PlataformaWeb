"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet.heat"

// Definição da interface Caso
interface Caso {
  id: string
  objeto: string
  dataRoubo: string
  localizacao: string
  latitude: number
  longitude: number
}

interface MapProps {
  selectedCaso: Caso | null
  casos: Caso[]
  showHeatmap: boolean
}

// Criando um novo ícone de localização: bola azul com sombra azul
const BlueCircleIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    width: 20px;
    height: 20px;
    background-color: rgba(0, 123, 255, 1);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.7);
    "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

const Map: React.FC<MapProps> = ({ selectedCaso, casos, showHeatmap }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const heatLayerRef = useRef<L.HeatLayer | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Criar a instância do mapa apenas uma vez
    const mapInstance = L.map(mapContainerRef.current, {
      center: [-14.235, -51.925], // Centro do Brasil
      zoom: 4,
      zoomControl: false, // Desativando os controles de zoom padrão
    })

    // Aplicando o tema escuro ao mapa
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(mapInstance)

    // Adicionar controle de zoom manualmente
    L.control.zoom({ position: "bottomright" }).addTo(mapInstance)

    // Criar camada de marcadores
    markersLayerRef.current = L.layerGroup().addTo(mapInstance)

    // Salvar referência ao mapa
    mapRef.current = mapInstance

    setIsLoading(false)

    return () => {
      mapInstance.remove()
      mapRef.current = null
    }
  }, [])

  // Atualizar marcadores quando os casos mudarem
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return

    markersLayerRef.current.clearLayers()

    casos.forEach((caso) => {
      L.marker([caso.latitude, caso.longitude], { icon: BlueCircleIcon })
        .addTo(markersLayerRef.current!)
        .bindPopup(`<b>${caso.objeto}</b><br>Roubado em: ${caso.dataRoubo}<br>Local: ${caso.localizacao}`)
    })
  }, [casos])

  // Atualizar mapa de calor
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

  // Centralizar no caso selecionado
  useEffect(() => {
    if (!mapRef.current || !selectedCaso) return

    mapRef.current.setView([selectedCaso.latitude, selectedCaso.longitude], 13)
  }, [selectedCaso])

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-black bg-opacity-50 text-white p-4 text-center">
          Carregando o mapa...
        </div>
      )}
      {error && <div className="absolute top-0 left-0 right-0 z-20 bg-red-500 text-white p-4 text-center">{error}</div>}
    </>
  )
}

export default Map

