"use client";

import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
});

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Criar a instância do mapa apenas uma vez
    const mapInstance = L.map(mapContainerRef.current, {
      center: [-14.235, -51.925], // Centro do Brasil
      zoom: 4,
      zoomControl: false, // Desativando os controles de zoom padrão
    });

    // Aplicando o tema escuro ao mapa
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(mapInstance);

    // Adicionar controle de zoom manualmente
    L.control.zoom({ position: "bottomright" }).addTo(mapInstance);

    // Salvar referência ao mapa
    mapRef.current = mapInstance;

    return () => {
      mapInstance.remove();
      mapRef.current = null;
    };
  }, []);

  // Obtém a localização do usuário após o mapa ser inicializado
  useEffect(() => {
    if (!mapRef.current) return;

    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
            L.marker([latitude, longitude], { icon: BlueCircleIcon })
              .addTo(mapRef.current)
              .bindPopup("Sua localização")
              .openPopup();
          }

          setIsLoading(false);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setError("Não foi possível obter sua localização. Verifique suas configurações.");
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Seu navegador não suporta geolocalização.");
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div
        ref={mapContainerRef}
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
      {error && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-red-500 text-white p-4 text-center">
          {error}
        </div>
      )}
    </>
  );
};

export default Map;
