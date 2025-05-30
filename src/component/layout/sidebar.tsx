'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  Home, 
  Users, 
  Ship, 
  DollarSign, 
  Activity,
  Menu,
  X,
  Calendar,
  FileText,
  Eye,
  BarChart3
} from 'lucide-react'

const menuItems = [
  { 
    title: 'Dashboard', 
    href: '/dashboard', 
    icon: Home 
  },
  { 
    title: 'ABK', 
    icon: Users,
    children: [
      { title: 'Daftar ABK', href: '/abk/daftar_abk' },
      { title: 'Jadwal', href: '/abk/jadwal' },
      { title: 'Pemantauan', href: '/abk/pemantauan' }
    ]
  },
  { 
    title: 'Armada', 
    href: '/armada', 
    icon: Ship 
  },
  { 
    title: 'Keuangan', 
    icon: DollarSign,
    children: [
      { title: 'Laporan', href: '/keuangan/laporan' },
      { title: 'Pencatatan Hasil', href: '/keuangan/pencatatan_hasil' }
    ]
  },
  { 
    title: 'Operasional', 
    href: '/operasional', 
    icon: Activity 
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (children: any[]) => 
    children?.some(child => pathname === child.href)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 ocean-gradient text-white z-40 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 bg-blue-800/30">
          <h1 className="text-xl font-bold text-center">
            Fishing Management
          </h1>
        </div>

        <nav className="mt-6 px-4 space-y-2 overflow-y-auto h-[calc(100vh-100px)]">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItems.includes(item.title)
            const parentActive = hasChildren ? isParentActive(item.children) : false

            return (
              <div key={item.title}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-left
                      ${parentActive ? 'bg-blue-700/50 text-blue-100' : 'hover:bg-blue-700/30 text-blue-200'}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </div>
                  </button>
                ) : (
                  <Link
                    href={item.href || '#'}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive(item.href || '') ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/30 text-blue-200'}
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}

                {/* Sub Menu */}
                {hasChildren && (
                  <div className={`
                    ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-200
                    ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    {item.children?.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm
                          ${isActive(child.href) ? 'bg-blue-600 text-white' : 'hover:bg-blue-700/20 text-blue-300'}
                        `}
                      >
                        <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}