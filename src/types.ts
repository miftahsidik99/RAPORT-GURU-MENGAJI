// Types for the Application

export type Score = 'SB' | 'B' | 'C' | 'PB' | '';

export interface Settings {
  provinsi: string;
  kota: string;
  sekolah: string;
  alamat: string;
  kecamatan: string;
  jenjang: string;
  kelas: string;
  semester: string;
  tahun: string;
  namaGuru: string;
  nipGuru: string;
  waktu: string;
  frekuensi: string;
  kepsek: string;
  nipKepsek: string;
}

export interface Student {
  id: string; // Unique identifier for React keys
  urut: number;
  nis: string;
  nisn: string;
  nama: string;
  
  // Baca
  baca_makhraj: Score;
  baca_tajwid: Score;
  baca_lancar: Score;
  baca_mandiri: Score;
  
  // Tulis
  tulis_hijaiyah: Score;
  tulis_rapi: Score;
  tulis_salin: Score;
  
  // Hafalan
  hafal_target: string;
  hafal_capai: string;
  hafal_lancar: Score;
  hafal_konsisten: Score;
  hafal_catatan: string;
  
  // Karakter
  karakter_disiplin: Score;
  karakter_adab: Score;
  karakter_sungguh: Score;
  karakter_tanggung: Score;
  karakter_akhlak: Score;
  
  // Auto Generated / Manual Override
  deskripsi: string;
  catatan: string;
}

export const SCORE_OPTIONS: Score[] = ['', 'SB', 'B', 'C', 'PB'];

export const INITIAL_SETTINGS: Settings = {
  provinsi: 'Jawa Barat',
  kota: 'Bandung',
  sekolah: 'SD Negeri Sukatinggal',
  alamat: 'Kp. Sukatinggal, Desa Santosa',
  kecamatan: 'Kertasari',
  jenjang: 'SD',
  kelas: 'IV',
  semester: 'Genap',
  tahun: '2025/2026',
  namaGuru: 'Imas',
  nipGuru: '-',
  waktu: 'Jumat/Jam ke 1 dan 2',
  frekuensi: '1 jam',
  kepsek: 'Carlam, S.Pd.',
  nipKepsek: '196606102007011011'
};
