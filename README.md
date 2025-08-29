<!DOCTYPE html>
<html lang="id">
Mendefinisikan dokumen sebagai HTML5.
lang="id" menandakan bahasa utama halaman adalah Bahasa Indonesia.

<head>
<meta charset="UTF-8" />
Mengatur encoding karakter ke UTF-8 agar mendukung karakter Indonesia dan internasional.

 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
Membuat halaman responsif, menyesuaikan lebar viewport dengan lebar perangkat.

 <title>Portal Berita CRUD</title>
Judul halaman yang muncul di tab browser.

:root → mendefinisikan variabel global (untuk tema light mode).
body.dark → mendefinisikan variabel yang sama tapi untuk dark mode.
Jadi, kalau body punya class dark, semua warna otomatis berubah.

Mengatur font default → Arial.
Background & warna teks mengikuti variabel (--bg, --text).
Hilangkan margin & padding default browser.
Tambahkan transisi halus saat tema berubah.

Header punya background card, padding 20px.
Ada bayangan tipis.
Menggunakan flexbox untuk posisi logo & tombol toggle.

Navbar sticky di atas.
Background transparan dengan blur (efek glass).
z-index:1000 supaya selalu di atas konten.
Punya transisi halus.

Saat discroll → padding mengecil & background makin gelap.

Navbar berisi logo + link, rata tengah dengan batas max-width:1200px.

Logo berupa teks biru neon.

Link navigasi horizontal.
Ada efek hover underline animasi.

Hero = layar penuh (tinggi 100vh).
Background gradient ungu-biru.
Menggunakan flex agar konten bisa ditengah.

Singkatnya:

Kode ini sudah lengkap untuk portal berita modern.
Ada dark mode, navbar sticky dengan efek scroll, hero section gradient, grid berita responsif, form overlay untuk CRUD, dan detail view.

<style> ... </style>
</head>
CSS internal untuk styling halaman (dibahas terpisah).

<body>
<header>
...
Header halaman berisi judul utama dan deskripsi singkat.
Tombol toggle mode gelap/terang dengan id toggleMode.

<div class="container">
<div class="actions">
...
Input teks untuk pencarian berita berdasarkan kata kunci.
id="search" agar bisa diakses dan dipantau perubahan nilainya lewat JavaScript.

<select id="filter">
<option value="">Semua Kategori</option>
...
Dropdown untuk filter berita berdasarkan kategori.
value="" pada opsi pertama berarti tidak ada filter kategori (tampilkan semua).

<button id="addBtn">+ Tambah Berita</button>
</div>
Tombol untuk membuka form tambah berita baru.
id="addBtn" untuk event handling.

<div id="newsGrid" class="news-grid"></div>
</div>
Kontainer grid untuk menampilkan daftar berita.
Awalnya kosong, akan diisi secara dinamis oleh JavaScript.

<div id="formOverlay" class="form-overlay">
<div class="form-box">
...
Overlay form untuk tambah/edit berita, awalnya disembunyikan.
Judul form dinamis, bisa "Tambah Berita Baru" atau "Edit Berita".

<label>Judul Berita *</label>
<input type="text" id="title" />
Input teks untuk judul berita, wajib diisi.

<label>Penulis *</label>
<input type="text" id="author" />
Input teks untuk nama penulis, wajib diisi.

<label>Kategori *</label>
<select id="category">
...
Dropdown kategori berita, wajib dipilih.

<label>URL Gambar</label>
<input type="url" id="image" />
Input URL gambar berita, opsional.

<label>Konten Berita *</label>
<textarea id="content" rows="5"></textarea>
Textarea untuk isi konten berita, wajib diisi.

<div class="form-actions">
<button class="save" id="saveBtn">Simpan</button>
...
Tombol simpan dan batal untuk form.
saveBtn untuk menyimpan data, cancelBtn untuk menutup form tanpa menyimpan.

<div id="detailView" class="detail-view"></div>
Overlay untuk menampilkan detail berita lengkap.
Awalnya kosong dan disembunyikan, diisi dan ditampilkan saat user klik "Baca".

<footer>
<h3>Portal Berita CRUD</h3>
...
Footer halaman dengan informasi singkat dan copyright.

CSS (ringkasan fungsi utama)
Variabel warna untuk mode terang dan gelap (:root dan body.dark).
Styling body, header, tombol, container, grid berita, kartu berita, form overlay, detail view, dan footer.
Transisi warna untuk efek halus saat toggle mode.
Flexbox dan grid untuk tata letak responsif.
Styling tombol dengan warna berbeda sesuai fungsi (view, edit, delete, save, cancel).
Overlay form dan detail view menggunakan position: fixed agar menutupi seluruh layar saat aktif.

const newsGrid = document.getElementById("newsGrid");
const search = document.getElementById("search");
...
Menyimpan referensi elemen-elemen penting untuk manipulasi dan event handling.

let currentIndex = -1;
Menyimpan indeks berita yang sedang ditampilkan di detail view.
-1 berarti belum ada berita yang dipilih.

let newsData = [ ... ];
Array objek berita awal.
Setiap objek berisi properti: id, title, content, author, category, publishDate, image.

let editingId = null;
Menyimpan id berita yang sedang diedit.
null berarti sedang tambah berita baru.

function renderNews() {
const keyword = search.value.toLowerCase();
...
Ambil nilai pencarian dan filter kategori.
Kosongkan kontainer berita sebelum render ulang.

const filtered = newsData.filter(
(n) =>
...
Filter berita berdasarkan:
Keyword ada di judul, konten, atau penulis (case insensitive).
Kategori sesuai filter, atau semua jika filter kosong.

if (filtered.length === 0) {
newsGrid.innerHTML =
...
Jika tidak ada berita yang cocok, tampilkan pesan "Tidak ada berita ditemukan" di tengah grid.

filtered.forEach((n) => {
const card = document.createElement("div");
...
Untuk setiap berita yang lolos filter:
Buat elemen div dengan kelas card.
Jika ada gambar, tampilkan <img>.
Tampilkan kategori dan tanggal publish.
Tampilkan judul dan cuplikan konten.
Tampilkan tombol aksi: Baca, Edit, Hapus.

card.querySelector(".edit").onclick = () => openForm(n);
card.querySelector(".delete").onclick = () => deleteNews(n.id);
...
Pasang event handler tombol:
Edit: buka form dengan data berita.
Hapus: hapus berita.
Baca: buka detail berita.
Tambahkan kartu ke grid berita.
Fungsi openDetail(id)

function openDetail(id) {
currentIndex = newsData.findIndex((n) => n.id === id);
...
Cari indeks berita berdasarkan id.

const n = newsData[currentIndex];
detailView.innerHTML = `
...
Isi overlay detail dengan konten lengkap berita.
Tampilkan tombol navigasi sebelumnya, tutup, dan berikutnya.
Tampilkan overlay detail.
Fungsi closeDetail()

function closeDetail() {
detailView.style.display = "none";
...
Sembunyikan overlay detail berita.
Fungsi showPrev() dan showNext()

function showPrev() {
if (currentIndex > 0) {
...
Navigasi ke berita sebelumnya jika ada.
Navigasi ke berita berikutnya jika ada.
Fungsi openForm(news = null)

function openForm(news = null) {
formOverlay.style.display = "flex";
...
Tampilkan overlay form.
Jika parameter news ada, isi form dengan data berita untuk edit.
Jika tidak, kosongkan form untuk tambah berita baru.
Simpan editingId untuk menandai berita yang diedit.
Fungsi saveNews()

function saveNews() {
if (
...
Validasi input wajib: judul, penulis, kategori, konten.
Jika ada yang kosong, tampilkan alert dan hentikan fungsi.

if (editingId) {
const idx = newsData.findIndex((n) => n.id === editingId);
...
Jika sedang edit (editingId ada), cari berita dan update datanya.
Jika tambah berita baru, buat objek baru dengan id unik (timestamp), tanggal publish hari ini, dan data dari form.
Tambahkan berita baru di awal array (unshift).

closeForm();
renderNews();
...
Tutup form.
Render ulang daftar berita agar perubahan terlihat.
Fungsi deleteNews(id)

function deleteNews(id) {
if (confirm("Yakin hapus berita ini?")) {
...
Tampilkan konfirmasi hapus berita.
Jika setuju, hapus berita dari array newsData.
Render ulang daftar berita.
Fungsi closeForm()


function closeForm() {
formOverlay.style.display = "none";
...
Sembunyikan overlay form.
Event Handler

addBtn.onclick = () => openForm();
Klik tombol tambah berita membuka form kosong.

saveBtn.onclick = saveNews;
Klik tombol simpan memanggil fungsi simpan berita.

cancelBtn.onclick = closeForm;
Klik tombol batal menutup form tanpa menyimpan.

search.oninput = renderNews;
Saat input pencarian berubah, render ulang daftar berita.


filter.onchange = renderNews;
Saat filter kategori berubah, render ulang daftar berita.

toggleMode.onclick = () => {
document.body.classList.toggle("dark");
...
Klik tombol toggle mode:
Tambah/hapus kelas dark pada body untuk mode gelap.
Ubah teks tombol sesuai mode saat ini.

renderNews();
Render daftar berita saat halaman pertama kali dimuat.

#Kesimpulan Aplikasi Portal Berita CRUD
Fungsi Utama
Aplikasi ini adalah sistem manajemen berita berbasis web yang mengimplementasikan operasi CRUD (Create, Read, Update, Delete) dengan antarmuka yang user-friendly.
Fitur-Fitur Utama
1. Manajemen Berita Lengkap

Create: Tambah berita baru dengan form overlay
Read: Tampilkan daftar berita dalam grid layout dan detail view
Update: Edit berita yang sudah ada
Delete: Hapus berita dengan konfirmasi

2. Sistem Pencarian & Filter

Pencarian berdasarkan judul, konten, atau penulis
Filter berdasarkan kategori (Politik, Ekonomi, Teknologi, dll.)
Hasil real-time saat mengetik

3. Antarmuka Modern

Design responsif dengan CSS Grid
Dark/Light mode toggle
Card-based layout untuk tampilan berita
Form overlay yang elegan

4. Detail View Navigation

Tampilan detail berita fullscreen
Navigasi antar berita (Previous/Next)
Informasi lengkap: gambar, judul, penulis, kategori, tanggal

Teknologi yang Digunakan

Frontend: HTML5, CSS3 (dengan CSS Variables), Vanilla JavaScript
Styling: Custom CSS dengan responsive design
Data Storage: JavaScript array (in-memory storage)
UI/UX: Modern card design, smooth transitions, intuitive navigation

Data Sample
Aplikasi sudah dilengkapi dengan 3 berita sample dari PENS tentang:

Laptop sebagai tools pembelajaran digital
Layanan ramah di era modern
Catatan tangan vs digital

Kelebihan

✅ Interface yang clean dan modern
✅ Responsive design untuk berbagai device
✅ Fitur pencarian dan filter yang efektif
✅ Dark mode support
✅ Validasi form yang baik
✅ Navigation yang intuitif

Keterbatasan

❌ Data tidak persisten (hilang saat refresh)
❌ Tidak ada sistem autentikasi
❌ Tidak ada upload gambar lokal
❌ Tidak ada sistem kategori dinamis

Kesimpulan: Ini adalah aplikasi demo yang sangat baik untuk pembelajaran CRUD operations dengan JavaScript vanilla, menampilkan best practices dalam web development modern dengan UI/UX yang menarik.
