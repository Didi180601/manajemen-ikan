'use client'

import { useState } from 'react'
import Sidebar from '@/component/layout/sidebar'
import Header from '@/component/layout/header'
import { Button} from '@/component/ui/button'
import { Card } from '@/component/ui/card'
import { Input } from '@/component/ui/input'
import { Modal } from '@/component/ui/modal'
import { Table } from '@/component/ui/table'
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react'

interface ABK {
  id: number
  nama: string
  nik: string
  posisi: string
  pengalaman: string
  telepon: string
  email: string
  alamat: string
  status: 'Aktif' | 'Tidak Aktif' | 'Berlayar'
  tanggalGabung: string
}

const mockData: ABK[] = [
  {
    id: 1,
    nama: 'Budi Santoso',
    nik: '3201234567890123',
    posisi: 'Kapten',
    pengalaman: '15 tahun',
    telepon: '081234567890',
    email: 'budi@example.com',
    alamat: 'Jakarta Utara',
    status: 'Berlayar',
    tanggalGabung: '2020-01-15'
  },
  {
    id: 2,
    nama: 'Agus Wijaya',
    nik: '3201234567890124',
    posisi: 'Masinis',
    pengalaman: '8 tahun',
    telepon: '081234567891',
    email: 'agus@example.com',
    alamat: 'Surabaya',
    status: 'Aktif',
    tanggalGabung: '2021-03-20'
  },
  {
    id: 3,
    nama: 'Suryadi',
    nik: '3201234567890125',
    posisi: 'Nelayan',
    pengalaman: '12 tahun',
    telepon: '081234567892',
    email: 'surya@example.com',
    alamat: 'Makassar',
    status: 'Aktif',
    tanggalGabung: '2019-07-10'
  }
]

export default function DaftarABK() {
  const [abkList, setAbkList] = useState<ABK[]>(mockData)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedABK, setSelectedABK] = useState<ABK | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const filteredData = abkList.filter(abk =>
    abk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    abk.posisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    abk.nik.includes(searchTerm)
  )

  const columns = [
    {
      key: 'nama',
      header: 'Nama',
      render: (value: string, row: ABK) => (
        <div>
          <div className="font-medium text-blue-900">{value}</div>
          <div className="text-sm text-blue-600 md:hidden">{row.posisi}</div>
        </div>
      )
    },
    {
      key: 'posisi',
      header: 'Posisi',
      className: 'hidden md:table-cell'
    },
    {
      key: 'pengalaman',
      header: 'Pengalaman',
      className: 'hidden lg:table-cell'
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Aktif' ? 'bg-green-100 text-green-800' :
          value === 'Berlayar' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (value: any, row: ABK) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedABK(row)
              setIsDetailModalOpen(true)
            }}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => {
              setSelectedABK(row)
              setIsModalOpen(true)
            }}
            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              setAbkList(prev => prev.filter(item => item.id !== row.id))
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">
              Daftar ABK
            </h1>
            <p className="text-blue-600">
              Kelola data Anak Buah Kapal (ABK) dalam armada perikanan
            </p>
          </div>

          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
                <Input
                  type="text"
                  placeholder="Cari ABK berdasarkan nama, posisi, atau NIK..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => {
                  setSelectedABK(null)
                  setIsModalOpen(true)
                }}
                className="flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Tambah ABK</span>
              </Button>
            </div>
          </Card>

          <Card>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-blue-900">
                Data ABK ({filteredData.length})
              </h2>
            </div>
            <Table columns={columns} data={filteredData} />
          </Card>

          {/* Detail Modal */}
          <Modal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            title="Detail ABK"
            size="lg"
          >
            {selectedABK && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Informasi Pribadi</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-blue-700">Nama:</span>
                          <span className="text-blue-600">{selectedABK.nama}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-blue-700">NIK:</span>
                          <span className="text-blue-600">{selectedABK.nik}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-blue-700">Posisi:</span>
                          <span className="text-blue-600">{selectedABK.posisi}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-blue-700">Pengalaman:</span>
                          <span className="text-blue-600">{selectedABK.pengalaman}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Kontak</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-blue-500" />
                          <span className="text-blue-600">{selectedABK.telepon}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail size={16} className="text-blue-500" />
                          <span className="text-blue-600">{selectedABK.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-blue-500" />
                          <span className="text-blue-600">{selectedABK.alamat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-blue-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-blue-700">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        selectedABK.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                        selectedABK.status === 'Berlayar' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedABK.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700">Bergabung:</span>
                      <span className="ml-2 text-blue-600">{selectedABK.tanggalGabung}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {/* Add/Edit Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedABK ? 'Edit ABK' : 'Tambah ABK Baru'}
            size="lg"
          >
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  defaultValue={selectedABK?.nama || ''}
                />
                <Input
                  label="NIK"
                  type="text"
                  placeholder="Masukkan NIK"
                  defaultValue={selectedABK?.nik || ''}
                />
                <Input
                  label="Posisi"
                  type="text"
                  placeholder="Kapten, Masinis, Nelayan, dll"
                  defaultValue={selectedABK?.posisi || ''}
                />
                <Input
                  label="Pengalaman"
                  type="text"
                  placeholder="5 tahun"
                  defaultValue={selectedABK?.pengalaman || ''}
                />
                <Input
                  label="Telepon"
                  type="tel"
                  placeholder="081234567890"
                  defaultValue={selectedABK?.telepon || ''}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="example@email.com"
                  defaultValue={selectedABK?.email || ''}
                />
              </div>
              <Input
                label="Alamat"
                type="text"
                placeholder="Masukkan alamat lengkap"
                defaultValue={selectedABK?.alamat || ''}
              />
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {selectedABK ? 'Update' : 'Simpan'}
                </Button>
              </div>
            </form>
          </Modal>
        </main>
      </div>
    </div>
  )
}