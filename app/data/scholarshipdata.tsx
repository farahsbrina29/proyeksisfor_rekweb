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
    deskripsi:
      "Beasiswa Unggulan adalah program yang dirancang untuk mendukung mahasiswa berprestasi yang memiliki IPK tinggi dan aktif dalam kegiatan organisasi. Tujuannya adalah untuk membantu mahasiswa berbakat mencapai potensi terbaik mereka dengan memberikan dukungan finansial dan akses ke berbagai sumber daya pendidikan.",
    persyaratan_beasiswa: [
      "1. Mahasiswa dengan IPK minimal 3.5.",
      "2. Aktif dalam organisasi kampus atau luar kampus.",
      "3. Mengisi formulir aplikasi beasiswa dengan lengkap.",
      "4. Menyertakan surat rekomendasi dari dosen atau pembimbing.",
      "5. Menulis esai tentang kontribusi dan rencana masa depan.",
    ],
    kategori: "Akademik",
    tanggal_mulai: "01-11-2024",
    tanggal_akhir: "30-11-2024",
    kontak: "beasiswa@example.com",
  },
  {
    id: "002",
    nama_beasiswa: "Beasiswa Prestasi Telkom University",
    deskripsi:
      "Beasiswa ini disediakan oleh Telkom University untuk mendukung mahasiswa yang memiliki pencapaian akademik tinggi. Dengan fokus pada nilai rata-rata semester terakhir, beasiswa ini bertujuan memotivasi mahasiswa agar terus meningkatkan kualitas belajar mereka.",
    persyaratan_beasiswa: [
      "1. Mahasiswa dengan nilai rata-rata A di semester terakhir.",
      "2. Tidak sedang menerima beasiswa lain.",
      "3. Aktif berpartisipasi dalam kegiatan akademik kampus.",
      "4. Menulis surat motivasi tentang manfaat beasiswa.",
      "5. Melampirkan transkrip nilai resmi.",
    ],
    kategori: "Akademik",
    tanggal_mulai: "05-11-2024",
    tanggal_akhir: "10-12-2024",
    kontak: "prestasi@telkomuniversity.ac.id",
  },
  {
    id: "003",
    nama_beasiswa: "Bantuan Pendidikan Pemerintah",
    deskripsi:
      "Bantuan pendidikan untuk siswa dari keluarga kurang mampu, bertujuan untuk memberikan akses pendidikan yang setara bagi semua individu.",
    persyaratan_beasiswa: [
      "1. Surat keterangan tidak mampu dari pemerintah setempat.",
      "2. Melampirkan Kartu Keluarga (KK) dan KTP.",
      "3. Mahasiswa aktif dengan IPK minimal 2.5.",
      "4. Surat rekomendasi dari pihak universitas.",
      "5. Melengkapi formulir aplikasi bantuan pendidikan.",
    ],
    kategori: "Bantuan",
    tanggal_mulai: "15-10-2024",
    tanggal_akhir: "20-11-2024",
    kontak: "bantuan@pemerintah.go.id",
  },
  {
    id: "004",
    nama_beasiswa: "Beasiswa Penelitian Sains",
    deskripsi:
      "Beasiswa ini ditujukan untuk mahasiswa yang terlibat dalam penelitian di bidang sains dan memiliki proyek penelitian yang inovatif.",
    persyaratan_beasiswa: [
      "1. Proposal penelitian yang disetujui oleh dosen pembimbing.",
      "2. Mahasiswa aktif di jurusan sains atau teknologi.",
      "3. Membuktikan rekam jejak akademik yang baik.",
      "4. Melampirkan dokumen pendukung seperti jurnal atau publikasi sebelumnya.",
      "5. Bersedia mempresentasikan hasil penelitian di forum kampus.",
    ],
    kategori: "Penelitian",
    tanggal_mulai: "01-09-2024",
    tanggal_akhir: "30-11-2024",
    kontak: "penelitian@sains.com",
  },
  {
    id: "005",
    nama_beasiswa: "Beasiswa Atlet Berprestasi",
    deskripsi:
      "Beasiswa ini diberikan kepada mahasiswa yang aktif dalam bidang olahraga dan telah menunjukkan prestasi di tingkat lokal, nasional, atau internasional.",
    persyaratan_beasiswa: [
      "1. Memiliki medali atau penghargaan dalam bidang olahraga.",
      "2. Mahasiswa aktif di universitas terdaftar.",
      "3. Surat rekomendasi dari pelatih atau organisasi olahraga.",
      "4. Membuat laporan singkat tentang kontribusi olahraga di universitas.",
      "5. Tidak sedang menerima beasiswa serupa.",
    ],
    kategori: "Non Akademik",
    tanggal_mulai: "15-08-2024",
    tanggal_akhir: "25-11-2024",
    kontak: "olahraga@example.com",
  },
  {
    id: "006",
    nama_beasiswa: "Beasiswa Seni dan Budaya",
    deskripsi:
      "Beasiswa Seni dan Budaya ditujukan untuk mahasiswa yang memiliki bakat luar biasa di bidang seni dan budaya. Tujuannya adalah untuk melestarikan dan mengembangkan seni serta budaya melalui karya-karya kreatif mahasiswa.",
    persyaratan_beasiswa: [
      "1. Portfolio seni atau budaya yang diakui oleh institusi.",
      "2. Surat rekomendasi dari ahli seni atau budaya.",
      "3. Membuat esai tentang kontribusi seni/budaya terhadap masyarakat.",
      "4. Mahasiswa aktif di universitas seni atau jurusan terkait.",
      "5. Mengisi formulir pendaftaran dengan lengkap.",
    ],
    kategori: "Non Akademik",
    tanggal_mulai: "01-10-2024",
    tanggal_akhir: "15-12-2024",
    kontak: "seni@budaya.com",
  },
  {
    id: "007",
    nama_beasiswa: "Beasiswa Kepemimpinan",
    deskripsi:
      "Beasiswa ini ditujukan untuk mahasiswa dengan kemampuan kepemimpinan luar biasa. Program ini bertujuan untuk mencetak pemimpin masa depan yang kompeten dan berintegritas.",
    persyaratan_beasiswa: [
      "1. Surat rekomendasi dari organisasi yang diikuti.",
      "2. Mahasiswa aktif dengan IPK minimal 3.0.",
      "3. Membuat laporan pengalaman kepemimpinan di komunitas atau organisasi.",
      "4. Melampirkan bukti kontribusi nyata dalam organisasi.",
      "5. Menulis esai tentang visi dan misi kepemimpinan di masa depan."
    ],
    kategori: "Non Akademik",
    tanggal_mulai: "10-11-2024",
    tanggal_akhir: "30-12-2024",
    kontak: "kepemimpinan@beasiswa.com",
  },
  {
    id: "008",
    nama_beasiswa: "Hibah Inovasi Teknik",
    deskripsi:
      "Hibah Inovasi Teknik merupakan program penghargaan bagi mahasiswa teknik yang menciptakan inovasi luar biasa dengan potensi implementasi nyata. Hibah ini bertujuan untuk mendorong mahasiswa dalam pengembangan teknologi dan solusi inovatif.",
    persyaratan_beasiswa: [
      "1. Makalah inovasi yang telah dipublikasikan.",
      "2. Mahasiswa aktif di jurusan teknik.",
      "3. Membuat prototipe inovasi yang siap diuji coba.",
      "4. Surat rekomendasi dari dosen pembimbing.",
      "5. Menulis laporan inovasi dan dampaknya terhadap masyarakat."
    ],
    kategori: "Penelitian",
    tanggal_mulai: "01-10-2024",
    tanggal_akhir: "30-11-2024",
    kontak: "inovasi@teknik.com",
  },
  {
    id: "009",
    nama_beasiswa: "Beasiswa Profesi Kesehatan",
    deskripsi:
      "Beasiswa ini ditujukan untuk mahasiswa yang sedang menempuh pendidikan di bidang kesehatan. Program ini bertujuan untuk mendukung tenaga kesehatan masa depan dalam menyelesaikan studi mereka.",
    persyaratan_beasiswa: [
      "1. Surat penerimaan dari institusi kesehatan terakreditasi.",
      "2. Mahasiswa aktif dengan IPK minimal 3.0.",
      "3. Surat rekomendasi dari dosen atau pembimbing akademik.",
      "4. Melampirkan dokumen pendukung seperti sertifikat pelatihan.",
      "5. Menulis esai tentang rencana kontribusi di bidang kesehatan."
    ],
    kategori: "Akademik",
    tanggal_mulai: "01-11-2024",
    tanggal_akhir: "10-11-2024",
    kontak: "kesehatan@beasiswa.com",
  },
  {
    id: "010",
    nama_beasiswa: "Penghargaan Kewirausahaan",
    deskripsi:
      "Penghargaan ini diberikan kepada mahasiswa yang memiliki ide bisnis inovatif. Program ini bertujuan untuk mendukung semangat kewirausahaan mahasiswa dan mendorong terciptanya ide-ide kreatif dalam dunia bisnis.",
    persyaratan_beasiswa: [
      "1. Proposal bisnis yang jelas dan realistis.",
      "2. Laporan keuangan startup yang sudah berjalan.",
      "3. Surat rekomendasi dari mentor atau pembimbing bisnis.",
      "4. Menyertakan video presentasi ide bisnis.",
      "5. Bersedia mempresentasikan ide bisnis di hadapan dewan juri."
    ],
    kategori: "Non Akademik",
    tanggal_mulai: "20-09-2024",
    tanggal_akhir: "19-11-2024",
    kontak: "wirausaha@beasiswa.com",
  },
];