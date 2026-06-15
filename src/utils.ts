import { Student, Score } from './types';

export const SCORE_LABELS: Record<string, string> = {
  'SB': 'Sangat Baik',
  'B': 'Baik',
  'C': 'Cukup',
  'PB': 'Perlu Bimbingan'
};

export const CATATAN_GURU_MAP: Record<string, string> = {
  'SB': 'Sangat Baik. Terus pertahankan dan tingkatkan.',
  'B': 'Baik. Pertahankan dan tingkatkan pembiasaan.',
  'C': "Cukup. Perbanyak latihan dan muraja'ah.",
  'PB': 'Perlu mendapat bimbingan khusus dan pendampingan orang tua.'
};

const ASPECTS = [
  { key: 'baca_makhraj', label: 'Ketepatan Makhraj' },
  { key: 'baca_tajwid', label: 'Penerapan Tajwid' },
  { key: 'baca_lancar', label: 'Kelancaran Membaca' },
  { key: 'baca_mandiri', label: 'Kemandirian Membaca' },
  { key: 'tulis_hijaiyah', label: 'Penulisan Hijaiyah' },
  { key: 'tulis_rapi', label: 'Kerapihan Tulisan' },
  { key: 'tulis_salin', label: 'Menyalin Lafadz' },
  { key: 'hafal_lancar', label: 'Kelancaran Hafalan' },
  { key: 'hafal_konsisten', label: 'Konsistensi Hafalan' },
  { key: 'karakter_disiplin', label: 'Kedisiplinan' },
  { key: 'karakter_adab', label: 'Adab Bergaul' },
  { key: 'karakter_sungguh', label: 'Kesungguhan Beribadah' },
  { key: 'karakter_tanggung', label: 'Tanggung Jawab' },
  { key: 'karakter_akhlak', label: 'Akhlak terhadap Teman' },
] as const;

export function generateCatatanGuru(score: Score): string {
    if (!score) return '';
    return CATATAN_GURU_MAP[score] || '';
}

export function generateDeskripsi(student: Student): string {
  if (!student.nama) return '';

  const grouped: Record<string, string[]> = { SB: [], B: [], C: [], PB: [] };
  
  ASPECTS.forEach(a => {
     const val = student[a.key as keyof Student] as Score;
     if (val && grouped[val]) {
         grouped[val].push(a.label);
     }
  });
  
  const parts: string[] = [];
  if (grouped.SB.length > 0) parts.push(`Sangat baik dalam ${grouped.SB.join(', ')}`);
  if (grouped.B.length > 0) parts.push(`Baik dalam ${grouped.B.join(', ')}`);
  if (grouped.C.length > 0) parts.push(`Cukup dalam ${grouped.C.join(', ')}`);
  if (grouped.PB.length > 0) parts.push(`Perlu bimbingan intensif dalam ${grouped.PB.join(', ')}`);
  
  if (parts.length === 0) return '';
  return `Ananda ${student.nama} menunjukkan capaian yang ${parts.join('. ')}.`;
}

export function generateRekomendasiFlags(student: Student) {
    const isPB = (val: Score) => val === 'PB';
    const isPBC = (val: Score) => val === 'PB' || val === 'C';

    const perluBimbinganBaca = 
        isPB(student.baca_makhraj) || isPB(student.baca_tajwid) || 
        isPB(student.baca_lancar) || isPB(student.baca_mandiri);

    const perluPenguatanHafalan = 
        isPBC(student.hafal_lancar) || isPBC(student.hafal_konsisten);

    const perluPembiasaanKarakter = 
        isPBC(student.karakter_disiplin) || isPBC(student.karakter_adab) ||
        isPBC(student.karakter_sungguh) || isPBC(student.karakter_tanggung) ||
        isPBC(student.karakter_akhlak);

    const berkembangSesuaiHarapan = !perluBimbinganBaca && !perluPenguatanHafalan && !perluPembiasaanKarakter;

    return {
        perluBimbinganBaca,
        perluPenguatanHafalan,
        perluPembiasaanKarakter,
        berkembangSesuaiHarapan
    };
}
