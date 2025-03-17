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

import Link from "next/link"
import { Mountain, Facebook, Instagram, Twitter, Download, HelpCircle, Info, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background py-6">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo e descrição */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-3">
              <Mountain className="h-6 w-6" />
              <span className="font-bold text-lg">Achei!</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Plataforma colaborativa para localizar e recuperar objetos roubados ou furtados.
            </p>

            {/* Redes sociais */}
            <div className="flex space-x-4 mt-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links principais com logos */}
          <div className="flex flex-col">
            <h3 className="text-sm font-medium mb-4">Links Úteis</h3>
            <div className="space-y-3 text-sm">
              <Link
                href="/como-funciona"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                <span>Como funciona</span>
              </Link>
              <Link
                href="/ajuda"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Central de ajuda</span>
              </Link>
              <Link
                href="/contato"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                <span>Contato</span>
              </Link>
            </div>
          </div>

          {/* Área de download destacada */}
          <div>
            <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Baixe o aplicativo</span>
            </h3>

            <div className="flex flex-col space-y-3">
              <Link
                href="#"
                className="flex items-center px-3 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors"
                aria-label="Baixar no Google Play"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div>
                  <div className="text-xs">DISPONÍVEL NO</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-center px-3 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors"
                aria-label="Baixar na App Store"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div>
                  <div className="text-xs">BAIXE NA</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {currentYear} Achei. Todos os direitos reservados.</p>
          <div className="flex space-x-4">
            <Link href="/termos" className="hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

