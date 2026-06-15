import React from 'react';
import { Settings as SettingsType } from '../types';

interface SettingsProps {
    settings: SettingsType;
    onUpdate: (settings: SettingsType) => void;
}

export function SettingsForm({ settings, onUpdate }: SettingsProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate({ ...settings, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-8 max-w-4xl mx-auto border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
            <div className="border-b-2 border-[#1A1A1A] pb-4 mb-6">
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Pengaturan Sekolah & Program</h2>
                 <p className="font-sans text-xs tracking-widest text-gray-500 uppercase mt-1">Konfigurasi Identitas Utama</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest bg-[#1A1A1A] text-white px-3 py-1 inline-block">Identitas Sekolah</h3>
                    <div className="grid grid-cols-1 gap-4 font-sans text-sm">
                        <Field label="Provinsi" name="provinsi" value={settings.provinsi} onChange={handleChange} />
                        <Field label="Kota/Kabupaten" name="kota" value={settings.kota} onChange={handleChange} />
                        <Field label="Kecamatan" name="kecamatan" value={settings.kecamatan} onChange={handleChange} />
                        <Field label="Alamat / Desa" name="alamat" value={settings.alamat} onChange={handleChange} />
                        <Field label="Sekolah" name="sekolah" value={settings.sekolah} onChange={handleChange} />
                        <Field label="Kepala Sekolah" name="kepsek" value={settings.kepsek} onChange={handleChange} />
                        <Field label="NIP Kepala Sekolah" name="nipKepsek" value={settings.nipKepsek} onChange={handleChange} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest bg-[#1A1A1A] text-white px-3 py-1 inline-block">Identitas Program</h3>
                    <div className="grid grid-cols-1 gap-4 font-sans text-sm">
                        <Field label="Jenjang" name="jenjang" value={settings.jenjang} onChange={handleChange} />
                        <Field label="Kelas" name="kelas" value={settings.kelas} onChange={handleChange} />
                        <Field label="Semester" name="semester" value={settings.semester} onChange={handleChange} />
                        <Field label="Tahun Pelajaran" name="tahun" value={settings.tahun} onChange={handleChange} />
                        <div className="border-t border-[#1A1A1A] border-dashed my-2 pt-2"></div>
                        <Field label="Nama Guru Ngaji" name="namaGuru" value={settings.namaGuru} onChange={handleChange} />
                        <Field label="NIP Guru Ngaji" name="nipGuru" value={settings.nipGuru} onChange={handleChange} />
                        <Field label="Waktu Kegiatan" name="waktu" value={settings.waktu} onChange={handleChange} />
                        <Field label="Frekuensi Kegiatan" name="frekuensi" value={settings.frekuensi} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Field({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-baseline">
            <label className="font-bold sm:w-1/3 mb-1 sm:mb-0 uppercase text-[11px] tracking-wider">{label}</label>
            <input 
                type="text" 
                name={name}
                value={value} 
                onChange={onChange}
                className="flex-1 w-full border-b border-[#1A1A1A] bg-transparent px-2 py-1 outline-none focus:border-b-2 transition-all font-serif"
            />
        </div>
    );
}
