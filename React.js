import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Calendar, User, Tag } from 'lucide-react';

const NewsPortal = () => {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewingNews, setViewingNews] = useState(null);

  const categories = ['Politik', 'Ekonomi', 'Teknologi', 'Olahraga', 'Hiburan', 'Kesehatan', 'Pendidikan'];

  // Sample initial data
  useEffect(() => {
    const sampleNews = [
      {
        id: 1,
        title: 'PENS Raih Prestasi Gemilang di Kompetisi Robotika Internasional',
        content: 'Tim robotika Politeknik Elektronika Negeri Surabaya (PENS) berhasil meraih juara 1 pada kompetisi robotika internasional ROBOCON 2025. Tim yang terdiri dari mahasiswa teknik elektro dan informatika ini mengalahkan 50 tim dari berbagai negara. Prestasi ini membuktikan kualitas pendidikan teknik di PENS yang semakin diakui dunia internasional. Robot yang dikembangkan menggunakan teknologi AI dan machine learning untuk navigasi otomatis.',
        author: 'Dr. Ir. Suprianto',
        category: 'Teknologi',
        publishDate: '2025-08-28',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&crop=center'
      },
      {
        id: 2,
        title: 'PENS Luncurkan Program Magang Industri 4.0 dengan 100 Perusahaan Partner',
        content: 'Politeknik Elektronika Negeri Surabaya (PENS) resmi meluncurkan program magang Industri 4.0 yang bermitra dengan 100 perusahaan teknologi terkemuka. Program ini dirancang khusus untuk mempersiapkan mahasiswa menghadapi era digitalisasi industri. Mahasiswa akan mendapatkan pengalaman langsung dalam implementasi IoT, big data analytics, dan automation systems. Program magang ini juga menjamin 90% tingkat penyerapan kerja bagi lulusannya.',
        author: 'Prof. Ir. Mochamad Ashari',
        category: 'Pendidikan',
        publishDate: '2025-08-28',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop&crop=center'
      },
      {
        id: 3,
        title: 'PENS Kembangkan Smart Campus dengan Teknologi IoT Terdepan',
        content: 'PENS memperkenalkan konsep Smart Campus yang mengintegrasikan teknologi Internet of Things (IoT) di seluruh area kampus. Sistem ini mencakup smart lighting, smart parking, monitoring kualitas udara, dan sistem keamanan berbasis AI. Seluruh infrastruktur kampus kini dapat dimonitor dan dikontrol secara real-time melalui aplikasi mobile. Proyek ini merupakan hasil kolaborasi antara dosen dan mahasiswa PENS yang akan menjadi model untuk kampus-kampus lain di Indonesia.',
        author: 'Ir. Endro Yulianto',
        category: 'Teknologi',
        publishDate: '2025-08-27',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop&crop=center'
      },
      {
        id: 4,
        title: 'Startup dari Alumni PENS Raih Funding 50 Miliar untuk Solusi Fintech',
        content: 'TechPay, startup fintech yang didirikan oleh alumni PENS, berhasil mendapatkan pendanaan Series B senilai 50 miliar rupiah. Startup ini mengembangkan solusi pembayaran digital khusus untuk UMKM dengan teknologi blockchain dan AI. Founder TechPay, lulusan teknik informatika PENS angkatan 2018, mengaku bahwa pendidikan praktis dan entrepreneurship di PENS sangat membantu dalam membangun bisnis teknologi. Saat ini TechPay telah melayani lebih dari 100,000 merchant UMKM di seluruh Indonesia.',
        author: 'Budi Santoso',
        category: 'Ekonomi',
        publishDate: '2025-08-26',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop&crop=center'
      },
      {
        id: 5,
        title: 'PENS Gandeng Tesla untuk Program Transfer Teknologi Kendaraan Listrik',
        content: 'Politeknik Elektronika Negeri Surabaya (PENS) menandatangani MoU dengan Tesla untuk program transfer teknologi kendaraan listrik. Kerjasama ini meliputi pengembangan laboratorium teknologi baterai, sistem manajemen energi, dan autonomous driving. Mahasiswa PENS akan mendapat kesempatan magang langsung di fasilitas Tesla dan mengakses teknologi terdepan dalam industri kendaraan listrik. Program ini diharapkan dapat mempercepat adopsi kendaraan listrik di Indonesia dan menciptakan ekosistem industri yang berkelanjutan.',
        author: 'Prof. Dr. Dadet Pramadihanto',
        category: 'Teknologi',
        publishDate: '2025-08-25',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=200&fit=crop&crop=center'
      },
      {
        id: 6,
        title: 'Perkembangan Teknologi AI di Indonesia',
        content: 'Teknologi kecerdasan buatan semakin berkembang pesat di Indonesia. Berbagai startup dan perusahaan besar mulai mengadopsi AI untuk meningkatkan efisiensi bisnis mereka.',
        author: 'Ahmad Rizki',
        category: 'Teknologi',
        publishDate: '2025-08-24',
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop&crop=center'
      }
    ];
    setNews(sampleNews);
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.title || !formData.content || !formData.author || !formData.category) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }
    
    if (editingNews) {
      // Update existing news
      setNews(prev => prev.map(item => 
        item.id === editingNews.id 
          ? { ...item, ...formData, publishDate: editingNews.publishDate }
          : item
      ));
      setEditingNews(null);
    } else {
      // Add new news
      const newNews = {
        id: Date.now(),
        ...formData,
        publishDate: new Date().toISOString().split('T')[0]
      };
      setNews(prev => [newNews, ...prev]);
    }

    setFormData({
      title: '',
      content: '',
      author: '',
      category: '',
      image: ''
    });
    setShowForm(false);
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      author: newsItem.author,
      category: newsItem.category,
      image: newsItem.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      setNews(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleView = (newsItem) => {
    setViewingNews(newsItem);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (viewingNews) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => setViewingNews(null)}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Kembali ke Portal
          </button>
          
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {viewingNews.image && (
              <img 
                src={viewingNews.image} 
                alt={viewingNews.title}
                className="w-full h-64 object-cover"
              />
            )}
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(viewingNews.publishDate).toLocaleDateString('id-ID')}
                </span>
                <span className="flex items-center gap-1">
                  <User size={16} />
                  {viewingNews.author}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={16} />
                  {viewingNews.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {viewingNews.title}
              </h1>
              
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {viewingNews.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Portal Berita</h1>
              <p className="text-gray-600 mt-1">Sistem Manajemen Berita CRUD</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingNews(null);
                setFormData({
                  title: '',
                  content: '',
                  author: '',
                  category: '',
                  image: ''
                });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus size={20} />
              Tambah Berita
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Semua Kategori</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Berita *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan judul berita"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Penulis *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nama penulis"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Pilih kategori</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Gambar
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konten Berita *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tulis konten berita di sini..."
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {editingNews ? 'Update Berita' : 'Simpan Berita'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingNews(null);
                    setFormData({
                      title: '',
                      content: '',
                      author: '',
                      category: '',
                      image: ''
                    });
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News List */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNews.length > 0 ? (
            filteredNews.map((newsItem) => (
              <div key={newsItem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {newsItem.image && (
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {newsItem.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(newsItem.publishDate).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {newsItem.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {newsItem.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {newsItem.author}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(newsItem)}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      <Eye size={16} />
                      Baca
                    </button>
                    <button
                      onClick={() => handleEdit(newsItem)}
                      className="flex items-center gap-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors text-sm font-medium"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(newsItem.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                Tidak ada berita ditemukan
              </h3>
              <p className="text-gray-400">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Portal Berita CRUD</h3>
            <p className="text-gray-600">
              Sistem manajemen berita dengan fitur Create, Read, Update, Delete
            </p>
            <div className="mt-4 text-sm text-gray-500">
              © 2025 Portal Berita. Built with React & Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsPortal;
