import { useState, useEffect } from 'react';
import { Settings, Student, INITIAL_SETTINGS } from '../types';

const INITIAL_STUDENTS: Student[] = [
    {
      id: crypto.randomUUID(),
      urut: 1,
      nis: '3197300342', // Data NISN from image mapped to NIS per Raport format
      nisn: '25260001', // Data NO. Induk mapped to NISN
      nama: 'ALIFA SUKMAWANTI',
      baca_makhraj: '', baca_tajwid: '', baca_lancar: '', baca_mandiri: '',
      tulis_hijaiyah: '', tulis_rapi: '', tulis_salin: '',
      hafal_target: '', hafal_capai: '', hafal_lancar: '', hafal_konsisten: '', hafal_catatan: '',
      karakter_disiplin: '', karakter_adab: '', karakter_sungguh: '', karakter_tanggung: '', karakter_akhlak: '',
      deskripsi: '', catatan: ''
    },
    {
      id: crypto.randomUUID(),
      urut: 2,
      nis: '3198226989',
      nisn: '25260002',
      nama: 'Asrul Ramadhan',
      baca_makhraj: '', baca_tajwid: '', baca_lancar: '', baca_mandiri: '',
      tulis_hijaiyah: '', tulis_rapi: '', tulis_salin: '',
      hafal_target: '', hafal_capai: '', hafal_lancar: '', hafal_konsisten: '', hafal_catatan: '',
      karakter_disiplin: '', karakter_adab: '', karakter_sungguh: '', karakter_tanggung: '', karakter_akhlak: '',
      deskripsi: '', catatan: ''
    }
];

export function useAppData() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('raport_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('raport_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  useEffect(() => {
    localStorage.setItem('raport_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('raport_students', JSON.stringify(students));
  }, [students]);

  const updateSettings = (newSettings: Settings) => setSettings(newSettings);
  
  const addStudent = () => {
    setStudents(prev => {
        const nextUrut = prev.length > 0 ? Math.max(...prev.map(s => s.urut)) + 1 : 1;
        return [...prev, {
            id: crypto.randomUUID(),
            urut: nextUrut,
            nis: '', nisn: '', nama: '',
            baca_makhraj: '', baca_tajwid: '', baca_lancar: '', baca_mandiri: '',
            tulis_hijaiyah: '', tulis_rapi: '', tulis_salin: '',
            hafal_target: '', hafal_capai: '', hafal_lancar: '', hafal_konsisten: '', hafal_catatan: '',
            karakter_disiplin: '', karakter_adab: '', karakter_sungguh: '', karakter_tanggung: '', karakter_akhlak: '',
            deskripsi: '', catatan: ''
        }];
    });
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStudent = (id: string) => {
      setStudents(prev => prev.filter(s => s.id !== id));
  }

  return { settings, updateSettings, students, addStudent, updateStudent, deleteStudent };
}
