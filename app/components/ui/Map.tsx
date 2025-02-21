"use client"

import { useEffect, useState, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet's icon paths
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

const Map = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: L.Map | null = null

    if (typeof window !== "undefined") {
      map = L.map("map", {
        center: [-14.235, -51.925], // Center of Brazil
        zoom: 4,
        zoomControl: false, // Desativando os controles de zoom padrão
      })

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      // Adicionando manualmente os controles de zoom na posição inferior direita
      L.control.zoom({ position: "bottomright" }).addTo(map)

      if ("geolocation" in navigator) {
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            if (map) {
              map.setView([latitude, longitude], 13)
              L.marker([latitude, longitude], { icon: DefaultIcon }).addTo(map).bindPopup("Sua localização").openPopup()
            }
            setIsLoading(false)
          },
          (error) => {
            console.error("Erro ao obter localização:", error)
            setError("Não foi possível obter sua localização. Por favor, verifique suas configurações de privacidade.")
            setIsLoading(false)
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
        )
      } else {
        setError("Seu navegador não suporta geolocalização.")
        setIsLoading(false)
      }
    }

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  return (
    <>
      <div
        ref={mapRef}
        id="map"
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-black bg-opacity-50 text-white p-4 text-center">
          Carregando sua localização...
        </div>
      )}
      {error && <div className="absolute top-0 left-0 right-0 z-20 bg-red-500 text-white p-4 text-center">{error}</div>}
    </>
  )
}

export default Map
