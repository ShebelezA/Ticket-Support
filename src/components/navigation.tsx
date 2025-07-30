"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plane, Headphones, Shield } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Plane },
    { href: "/submit", label: "Submit Ticket", icon: Headphones },
    { href: "/admin", label: "Admin", icon: Shield },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Travel Support
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                        : "hover:bg-white/10 text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Plane className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 