import type React from "react"
import CadastrarTab from "./tabs/CadastrarTab"
import MapaTab from "./tabs/MapaTab"
import CasosTab from "./tabs/CasosTab"
import ConfiguracoesTab from "./tabs/ConfiguracoesTab"

interface ContentProps {
  activeTab: string
}

const Content: React.FC<ContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "cadastrar":
        return <CadastrarTab />
      case "mapa":
        return <MapaTab />
      case "casos":
        return <CasosTab />
      case "configuracoes":
        return <ConfiguracoesTab />
      default:
        return null
    }
  }

  return (
    <main className="flex-1 h-full p-6 bg-white dark:bg-gray-900 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h1>
      <div className="flex-grow">{renderContent()}</div>
    </main>
  )
}

export default Content

