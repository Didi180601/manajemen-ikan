'use client'

import Sidebar from '@/component/layout/sidebar'
import Header from '@/component/layout/header'
import { Ship, Users, DollarSign, Activity, TrendingUp, Calendar, Fish, Anchor, BarChart3 } from 'lucide-react'

const stats = [
  {
    title: 'Total Kapal',
    value: '24',
    change: '+2 bulan ini',
    icon: Ship,
    color: 'bg-blue-500'
  },
  {
    title: 'ABK Aktif',
    value: '156',
    change: '+8 bulan ini',
    icon: Users,
    color: 'bg-cyan-500'
  },
  {
    title: 'Pendapatan Bulan Ini',
    value: 'Rp 450M',
    change: '+12% dari bulan lalu',
    icon: DollarSign,
    color: 'bg-emerald-500'
  },
  {
    title: 'Trip Aktif',
    value: '18',
    change: '5 selesai hari ini',
    icon: Activity,
    color: 'bg-orange-500'
  }
]

const recentTrips = [
  { id: 1, vessel: 'KM Sinar Laut', captain: 'Budi Santoso', departure: '2025-05-28', status: 'Berlayar', duration: '3 hari' },
  { id: 2, vessel: 'KM Bahari Jaya', captain: 'Agus Wijaya', departure: '2025-05-27', status: 'Kembali', duration: '5 hari' },
  { id: 3, vessel: 'KM Nelayan Mandiri', captain: 'Suryadi', departure: '2025-05-26', status: 'Berlayar', duration: '4 hari' },
  { id: 4, vessel: 'KM Samudra Indah', captain: 'Wahyu', departure: '2025-05-25', status: 'Persiapan', duration: '6 hari' }
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Welcome Section */}
          <div className="ocean-gradient rounded-xl p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Selamat Datang di Fishing Management System
                </h1>
                <p className="text-blue-100 text-lg">
                  Kelola armada perikanan Anda dengan mudah dan efisien
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-3">
                  <Calendar className="text-blue-200" size={20} />
                  <span className="text-blue-100">
                    {new Date().toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="ocean-card rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl lg:text-3xl font-bold text-blue-900 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-blue-500 text-sm">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="xl:col-span-2 ocean-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-900">Pendapatan Bulanan</h2>
                <div className="flex items-center space-x-2 text-emerald-600">
                  <TrendingUp size={20} />
                  <span className="text-sm font-medium">+15.3%</span>
                </div>
              </div>
              <div className="h-64 bg-gradient-to-t from-blue-50 to-white rounded-lg flex items-center justify-center">
                <div className="text-center text-blue-600">
                  <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Grafik Pendapatan</p>
                  <p className="text-xs opacity-75">Data visualisasi akan ditampilkan di sini</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="ocean-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Aksi Cepat</h2>
              <div className="space-y-3">
                <button className="w-full ocean-button text-left flex items-center space-x-3 p-3 rounded-lg">
                  <Ship size={20} />
                  <span>Tambah Kapal Baru</span>
                </button>
                <button className="w-full ocean-button-outline text-left flex items-center space-x-3 p-3 rounded-lg">
                  <Users size={20} />
                  <span>Daftar ABK</span>
                </button>
                <button className="w-full ocean-button-outline text-left flex items-center space-x-3 p-3 rounded-lg">
                  <Fish size={20} />
                  <span>Catat Hasil Tangkapan</span>
                </button>
                <button className="w-full ocean-button-outline text-left flex items-center space-x-3 p-3 rounded-lg">
                  <Anchor size={20} />
                  <span>Buat Jadwal Trip</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Trips */}
          <div className="ocean-card rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900 mb-2 sm:mb-0">Trip Terbaru</h2>
              <button className="ocean-button text-sm">Lihat Semua</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-blue-900">Kapal</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-blue-900 hidden sm:table-cell">Kapten</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-blue-900 hidden md:table-cell">Keberangkatan</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-blue-900">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-blue-900 hidden lg:table-cell">Durasi</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrips.map((trip) => (
                    <tr key={trip.id} className="border-b border-blue-50 hover:bg-blue-25 transition-colors duration-200">
                      <td className="py-3 px-2">
                        <div className="font-medium text-blue-900">{trip.vessel}</div>
                        <div className="text-sm text-blue-600 sm:hidden">{trip.captain}</div>
                      </td>
                      <td className="py-3 px-2 text-blue-700 hidden sm:table-cell">{trip.captain}</td>
                      <td className="py-3 px-2 text-blue-600 text-sm hidden md:table-cell">{trip.departure}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'Berlayar' ? 'bg-blue-100 text-blue-800' :
                          trip.status === 'Kembali' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-blue-600 text-sm hidden lg:table-cell">{trip.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}