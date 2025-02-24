import type React from "react"
import { Button } from "@/app/components/ui/button"
import { Switch } from "@/app/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Moon, Sun, User, Map, FileText, Settings } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
  return (
    <aside className="w-64 h-full bg-gray-100 dark:bg-gray-800 p-6 flex flex-col">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold dark:text-white">John Doe</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Usuário</p>
        </div>
      </div>
      <nav className="space-y-2 flex-grow">
        <Button
          variant={activeTab === "cadastrar" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("cadastrar")}
        >
          <User className="mr-2 h-4 w-4" /> Cadastrar Objeto
        </Button>
        <Button
          variant={activeTab === "mapa" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("mapa")}
        >
          <Map className="mr-2 h-4 w-4" /> Mapa
        </Button>
        <Button
          variant={activeTab === "casos" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("casos")}
        >
          <FileText className="mr-2 h-4 w-4" /> Casos
        </Button>
        <Button
          variant={activeTab === "configuracoes" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("configuracoes")}
        >
          <Settings className="mr-2 h-4 w-4" /> Configurações
        </Button>
      </nav>
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4" />
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        <Moon className="h-4 w-4" />
      </div>
    </aside>
  )
}

export default Sidebar

