"use client"

import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson"

interface BrazilMapProps {
  onStateClick: (state: string) => void
}

const BrazilMap: React.FC<BrazilMapProps> = ({ onStateClick }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <ComposableMap
        projectionConfig={{
          scale: 500, // Reduzido para diminuir o tamanho do mapa
          center: [-52, -15], 
        }}
        width={600} // Reduzido para um tamanho mais compacto
        height={500}
        style={{ background: "none" }} // Remove o fundo branco
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onStateClick(geo.properties.name)}
                style={{
                  default: { fill: "#aaa", outline: "#333" },
                  hover:   { fill: "#1E40AF", outline: "#333" },
                  pressed: { fill: "#1E3A8A", outline: "#333" },
                }}
              />
            ))
          )}
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default BrazilMap
