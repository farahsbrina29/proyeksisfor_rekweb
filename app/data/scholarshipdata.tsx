// Scholarship data and utilities
const monthsIndo = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// Parsing dari format DD-MM-YYYY ke objek Date
export function parseCustomDate(dateString: string) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Bulan dikurangi 1 karena indeks bulan mulai dari 0
}

// Format objek Date menjadi "20 November 2024"
export function formatCustomDate(dateString: string) {
  const date = parseCustomDate(dateString);
  const day = date.getDate();
  const month = monthsIndo[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getScholarshipStatus(tanggal_mulai: string, tanggal_akhir: string): string {
  const today = new Date();
  const start = parseCustomDate(tanggal_mulai);
  const end = parseCustomDate(tanggal_akhir);

  return today >= start && today <= end ? "Active" : "Inactive";
}

// Scholarship data
export const scholarships = [
  {
    id: "001",
    nama_beasiswa: "Beasiswa Unggulan",
    deskripsi: "Beasiswa ini ditujukan untuk mahasiswa berprestasi.",
    persyaratan_beasiswa:
      "Mahasiswa dengan IPK minimal 3.5 dan aktif dalam organisasi.",
    kategori: "Akademik",
    tanggal_mulai: "01-11-2024",
    tanggal_akhir: "30-11-2024",
    kontak: "beasiswa@example.com",
  },
  {
    id: "002",
    nama_beasiswa: "Beasiswa Prestasi Telkom University",
    deskripsi: "Beasiswa untuk mahasiswa dengan prestasi akademik tinggi.",
    persyaratan_beasiswa:
      "Mahasiswa dengan nilai rata-rata A di semester terakhir.",
    kategori: "Akademik",
    tanggal_mulai: "05-11-2024",
    tanggal_akhir: "10-12-2024",
    kontak: "prestasi@telkomuniversity.ac.id",
  },
  {
    id: "003",
    nama_beasiswa: "Bantuan Pendidikan Pemerintah",
    deskripsi: "Bantuan pendidikan untuk siswa dari keluarga kurang mampu.",
    persyaratan_beasiswa:
      "Surat keterangan tidak mampu dari pemerintah setempat.",
    kategori: "Bantuan",
    tanggal_mulai: "15-10-2024",
    tanggal_akhir: "20-11-2024",
    kontak: "bantuan@pemerintah.go.id",
  },
  {
    id: "004",
    nama_beasiswa: "Beasiswa Penelitian Sains",
    deskripsi: "Beasiswa untuk mahasiswa yang terlibat dalam penelitian sains.",
    persyaratan_beasiswa:
      "Proposal penelitian yang disetujui oleh dosen pembimbing.",
    kategori: "Penelitian",
    tanggal_mulai: "01-09-2024",
    tanggal_akhir: "30-11-2024",
    kontak: "penelitian@sains.com",
  },
  {
    id: "005",
    nama_beasiswa: "Beasiswa Atlet Berprestasi",
    deskripsi: "Beasiswa untuk mahasiswa yang aktif dalam bidang olahraga.",
    persyaratan_beasiswa:
      "Memiliki medali atau penghargaan dalam bidang olahraga.",
    kategori: "Non Akademik",
    tanggal_mulai: "15-08-2024",
    tanggal_akhir: "25-11-2024",
    kontak: "olahraga@example.com",
  },
  {
    id: "006",
    nama_beasiswa: "Beasiswa Seni dan Budaya",
    deskripsi: "Beasiswa untuk mahasiswa dengan bakat seni dan budaya.",
    persyaratan_beasiswa:
      "Portfolio seni atau budaya yang diakui oleh institusi.",
    kategori: "Seni",
    tanggal_mulai: "01-10-2024",
    tanggal_akhir: "15-12-2024",
    kontak: "seni@budaya.com",
  },
  {
    id: "007",
    nama_beasiswa: "Beasiswa Kepemimpinan",
    deskripsi:
      "Beasiswa untuk mahasiswa dengan kemampuan kepemimpinan luar biasa.",
    persyaratan_beasiswa: "Surat rekomendasi dari organisasi yang diikuti.",
    kategori: "Kepemimpinan",
    tanggal_mulai: "10-11-2024",
    tanggal_akhir: "30-12-2024",
    kontak: "kepemimpinan@beasiswa.com",
  },
  {
    id: "008",
    nama_beasiswa: "Hibah Inovasi Teknik",
    deskripsi: "Hibah untuk mahasiswa teknik dengan inovasi terbaik.",
    persyaratan_beasiswa: "Makalah inovasi yang telah dipublikasikan.",
    kategori: "Inovasi",
    tanggal_mulai: "01-10-2024",
    tanggal_akhir: "30-11-2024",
    kontak: "inovasi@teknik.com",
  },
  {
    id: "009",
    nama_beasiswa: "Beasiswa Profesi Kesehatan",
    deskripsi:
      "Beasiswa untuk mahasiswa yang menempuh studi di bidang kesehatan.",
    persyaratan_beasiswa:
      "Surat penerimaan dari institusi kesehatan terakreditasi.",
    kategori: "Kesehatan",
    tanggal_mulai: "01-11-2024",
    tanggal_akhir: "10-11-2024",
    kontak: "kesehatan@beasiswa.com",
  },
  {
    id: "010",
    nama_beasiswa: "Penghargaan Kewirausahaan",
    deskripsi: "Penghargaan untuk mahasiswa dengan bisnis inovatif.",
    persyaratan_beasiswa: "Proposal bisnis dan laporan keuangan startup.",
    kategori: "Kewirausahaan",
    tanggal_mulai: "20-09-2024",
    tanggal_akhir: "19-11-2024",
    kontak: "wirausaha@beasiswa.com",
  },
];