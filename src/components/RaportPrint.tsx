import React from 'react';
import { Student, Settings, Score } from '../types';
import { generateCatatanGuru, generateRekomendasiFlags } from '../utils';

interface RaportPrintProps {
    student: Student;
    settings: Settings;
    paperSize: 'A4' | 'F4';
}

export function RaportPrint({ student, settings, paperSize }: RaportPrintProps) {
    const recFlags = generateRekomendasiFlags(student);
    const pageClass = paperSize === 'F4' ? 'min-h-[330mm]' : 'min-h-[297mm]';

    return (
        <>
            <style>{`
                @media print {
                    @page { size: ${paperSize === 'A4' ? '210mm 297mm' : '210mm 330mm'}; margin: 0; }
                }
                ${paperSize === 'F4' ? `
                    .print-page { min-height: 330mm !important; }
                ` : ''}
            `}</style>
            <div className="bg-white w-[210mm] mx-auto text-[#1A1A1A] font-serif print-container border-2 border-[#1A1A1A] print:border-none shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] print:shadow-none">
                {/* PAGE 1 */}
            <div className={`print-page w-full ${pageClass} bg-white p-12 box-border relative flex flex-col`}>
                <div className="relative z-10 flex-1">
                    <div className="text-center mb-8 border-b-2 border-[#1A1A1A] pb-6">
                        <h1 className="text-xl font-bold uppercase tracking-widest font-sans">RAPOR</h1>
                        <h1 className="text-xl font-bold uppercase tracking-widest font-sans mb-4">PROGRAM SEKOLAH MENGAJI</h1>
                        <h2 className="text-lg font-bold">Pemerintah {settings.kota.startsWith('Kota') ? '' : 'Kabupaten'} {settings.kota.replace('Kabupaten ', '').replace('Kota ', '')}</h2>
                        <h2 className="text-lg font-bold">Dinas Pendidikan</h2>
                    </div>

                    <SectionTitle>A. Identitas Peserta Didik</SectionTitle>
                    <table className="w-full text-[13px] mb-8 table-fixed font-sans">
                        <tbody>
                            <Row label="Nama Peserta Didik" value={student.nama || '-'} bold />
                            <Row label="NISN/NIS" value={`${student.nisn || '-'} / ${student.nis || '-'}`} />
                            <Row label="Satuan Pendidikan" value={settings.sekolah} />
                            <Row label="Jenjang" value={settings.jenjang} />
                            <Row label="Kelas" value={settings.kelas} />
                            <Row label="Semester" value={settings.semester} />
                            <Row label="Tahun Pelajaran" value={settings.tahun} />
                        </tbody>
                    </table>

                    <SectionTitle>B. Identitas Program Sekolah Mengaji</SectionTitle>
                    <table className="w-full text-[13px] mb-8 table-fixed font-sans">
                        <tbody>
                            <Row label="Nama Guru Ngaji" value={settings.namaGuru} />
                            <Row label="Hari/Jam Pelaksanaan" value={settings.waktu} />
                            <Row label="Tempat Kegiatan" value={settings.sekolah} />
                            <Row label="Frekuensi Kegiatan" value={settings.frekuensi} />
                        </tbody>
                    </table>

                    <SectionTitle>C. Capaian Kompetensi Baca Al-Quran</SectionTitle>
                    <ScoreTable 
                        headers={['Aspek yang Dinilai', 'SB', 'B', 'C', 'PB', 'Catatan Guru']}
                        rows={[
                            { label: 'Ketepatan makhraj huruf', score: student.baca_makhraj },
                            { label: 'Penerapan hukum tajwid', score: student.baca_tajwid },
                            { label: 'Kelancaran membaca', score: student.baca_lancar },
                            { label: 'Kemandirian membaca', score: student.baca_mandiri }
                        ]}
                    />
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-8 font-sans font-bold mt-2">Keterangan: SB = Sangat Baik, B = Baik, C = Cukup, PB = Perlu Bimbingan</div>

                    <SectionTitle>D. Capaian Kompetensi Tulis Al-Qur'an</SectionTitle>
                    <ScoreTable 
                        headers={['Aspek yang Dinilai', 'SB', 'B', 'C', 'PB', 'Catatan Guru']}
                        rows={[
                            { label: 'Ketepatan penulisan huruf hijaiyah', score: student.tulis_hijaiyah },
                            { label: 'Kerapihan tulisan', score: student.tulis_rapi },
                            { label: 'Ketepatan menyalin lafadz', score: student.tulis_salin }
                        ]}
                    />
                    <div className="mb-8"></div>

                    <SectionTitle>E. Capaian Hafalan Al-Qur'an</SectionTitle>
                    <table className="w-full border-collapse border border-[#1A1A1A] text-[12px] mb-2 font-sans font-medium">
                        <thead>
                            <tr className="bg-[#1A1A1A] text-white">
                                <th className="border-r border-white p-2 w-1/3 text-left uppercase tracking-wider text-[10px]">Aspek</th>
                                <th className="p-2 text-center uppercase tracking-wider text-[10px]">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-8 border-b border-[#1A1A1A]"><td className="border-r border-[#1A1A1A] p-2 align-middle">Target Hafalan</td><td className="p-2 font-bold">{student.hafal_target}</td></tr>
                            <tr className="h-8 border-b border-[#1A1A1A]"><td className="border-r border-[#1A1A1A] p-2 align-middle">Hafalan yang Dicapai</td><td className="p-2 font-bold">{student.hafal_capai}</td></tr>
                            <tr className="h-8 border-b border-[#1A1A1A]"><td className="border-r border-[#1A1A1A] p-2 align-middle">Kelancaran Hafalan</td><td className="p-2">{student.hafal_lancar ? `${student.hafal_lancar} - ${generateCatatanGuru(student.hafal_lancar)}` : ''}</td></tr>
                            <tr className="h-8 border-b border-[#1A1A1A]"><td className="border-r border-[#1A1A1A] p-2 align-middle">Konsistensi Muroja'ah</td><td className="p-2">{student.hafal_konsisten ? `${student.hafal_konsisten} - ${generateCatatanGuru(student.hafal_konsisten)}` : ''}</td></tr>
                            <tr className="h-10 border-b border-[#1A1A1A]"><td className="border-r border-[#1A1A1A] p-2 align-middle">Catatan Guru</td><td className="p-2 italic text-[#1A1A1A]/80">{student.hafal_catatan}</td></tr>
                        </tbody>
                    </table>
                    <div className="mb-8"></div>

                    <SectionTitle>F. Perkembangan Karakter Religius</SectionTitle>
                    <ScoreTable 
                        headers={['Indikator Karakter', 'SB', 'B', 'C', 'PB', 'Catatan']}
                        rows={[
                            { label: 'Disiplin mengikuti kegiatan', score: student.karakter_disiplin },
                            { label: 'Adab terhadap guru', score: student.karakter_adab },
                            { label: 'Kesungguhan beribadah', score: student.karakter_sungguh },
                            { label: 'Tanggung jawab dan kejujuran', score: student.karakter_tanggung },
                            { label: 'Akhlak terhadap teman', score: student.karakter_akhlak }
                        ]}
                    />
                </div>
            </div>

            {/* PAGE BREAK (Rendered as physical page separation in print) */}
            <div className="page-break" style={{ pageBreakBefore: 'always', borderTop: '2px dashed #1A1A1A', margin: '40px 0' }} />

            {/* PAGE 2 */}
            <div className={`print-page w-full ${pageClass} bg-white p-12 box-border relative flex flex-col`}>                
                <div className="relative z-10 flex-1 flex flex-col">
                    <SectionTitle>G. Deskripsi Perkembangan Peserta Didik</SectionTitle>
                    <div className="text-[11px] font-sans uppercase tracking-widest text-gray-500 mb-2 font-bold">(Diisi secara naratif oleh Guru Ngaji)</div>
                    <div className="border border-[#1A1A1A] min-h-[120px] p-5 text-[13px] mb-10 whitespace-pre-wrap leading-relaxed italic bg-[#F4F1EA]/30">
                        {student.deskripsi || '-'}
                    </div>

                    <SectionTitle>H. Rekomendasi Tindak Lanjut</SectionTitle>
                    <div className="border border-[#1A1A1A] p-6 text-[13px] mb-10 space-y-3 font-sans">
                        <CheckboxRow checked={recFlags.perluBimbinganBaca} label="Perlu bimbingan tambahan baca Al-Qur'an" />
                        <CheckboxRow checked={recFlags.perluPenguatanHafalan} label="Perlu penguatan hafalan" />
                        <CheckboxRow checked={recFlags.perluPembiasaanKarakter} label="Perlu pembiasaan adab dan disiplin" />
                        <CheckboxRow checked={recFlags.berkembangSesuaiHarapan} label="Berkembang sesuai harapan" />
                        <div className="mt-6 pt-4 border-t border-dashed border-[#1A1A1A]">
                            <span className="font-bold uppercase tracking-wide text-[11px] block mb-1">Catatan Tambahan:</span>
                            <span className="italic min-h-[20px] block">{student.catatan || '-'}</span>
                        </div>
                    </div>

                    <SectionTitle>I. Pengesahan</SectionTitle>
                    <table className="w-full text-[13px] text-center table-fixed border-collapse mb-16 font-sans">
                        <thead>
                            <tr>
                                <th className="p-2 w-1/3 text-left">Guru Ngaji,</th>
                                <th className="p-2 w-1/3">Kepala Sekolah,</th>
                                <th className="p-2 w-1/3 text-right">Orang Tua/Wali,</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="h-32 align-bottom text-left">
                                    <div className="font-bold border-b border-[#1A1A1A] inline-block pb-0.5">{settings.namaGuru}</div>
                                    <div className="text-[11px] mt-1 uppercase tracking-widest text-gray-600">NIP. {settings.nipGuru}</div>
                                </td>
                                <td className="h-32 align-bottom">
                                    <div className="font-bold border-b border-[#1A1A1A] inline-block pb-0.5">{settings.kepsek}</div>
                                    <div className="text-[11px] mt-1 uppercase tracking-widest text-gray-600">NIP. {settings.nipKepsek}</div>
                                </td>
                                <td className="h-32 align-bottom text-right">
                                    <div className="border-b border-[#1A1A1A] w-48 inline-block"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-auto border-t-2 border-[#1A1A1A] pt-4 text-[10px] leading-relaxed font-sans uppercase tracking-widest opacity-80">
                        <span className="font-bold mb-1 block text-[#1A1A1A]">Catatan Administratif:</span>
                        Rapor Sekolah Mengaji ini merupakan laporan pendamping rapor pendidikan formal dan digunakan sebagai bahan monitoring serta evaluasi Program Sekolah Mengaji di satuan pendidikan.
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h3 className="text-sm font-bold mb-4 font-sans uppercase tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A] inline-block pr-6 pb-1">{children}</h3>;
}

function Row({ label, value, bold }: { label: string, value: string, bold?: boolean }) {
    return (
        <tr className="align-top leading-7 border-b border-gray-100 last:border-0">
            <td className="w-56 text-[#1A1A1A]/70 uppercase text-[10px] font-bold tracking-widest">{label}</td>
            <td className="w-4 text-center text-[#1A1A1A]/30">:</td>
            <td className={`pl-2 ${bold ? 'font-bold font-serif text-[14px]' : 'font-serif text-[14px]'}`}>{value}</td>
        </tr>
    );
}

function ScoreTable({ headers, rows }: { headers: string[], rows: { label: string, score: Score }[] }) {
    return (
        <table className="w-full border-collapse border border-[#1A1A1A] text-[12px] font-sans font-medium">
            <thead>
                <tr className="bg-[#1A1A1A] text-white text-center uppercase tracking-wider text-[10px]">
                    <th className="border-r border-white p-2 w-[35%] text-left">{headers[0]}</th>
                    <th className="border-r border-white p-2 w-8">{headers[1]}</th>
                    <th className="border-r border-white p-2 w-8">{headers[2]}</th>
                    <th className="border-r border-white p-2 w-8">{headers[3]}</th>
                    <th className="border-r border-white p-2 w-8">{headers[4]}</th>
                    <th className="p-2 w-auto">{headers[5]}</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {rows.map((r, i) => (
                    <tr key={i} className="h-8 border-b border-[#1A1A1A] last:border-0">
                        <td className="border-r border-[#1A1A1A] p-2 text-left font-serif text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">{r.label}</td>
                        <td className="border-r border-[#1A1A1A] p-0"><Check mark={r.score === 'SB'} /></td>
                        <td className="border-r border-[#1A1A1A] p-0"><Check mark={r.score === 'B'} /></td>
                        <td className="border-r border-[#1A1A1A] p-0"><Check mark={r.score === 'C'} /></td>
                        <td className="border-r border-[#1A1A1A] p-0"><Check mark={r.score === 'PB'} /></td>
                        <td className="p-2 text-[11px] text-left italic text-[#1A1A1A]/80 align-middle">
                            {r.score ? generateCatatanGuru(r.score) : ''}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Check({ mark }: { mark: boolean }) {
    return (
        <div className="w-full h-full flex items-center justify-center font-bold text-lg select-none">
            {mark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            ) : null}
        </div>
    );
}

function CheckboxRow({ checked, label }: { checked: boolean, label: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-4 h-4 border border-[#1A1A1A] flex flex-shrink-0 items-center justify-center bg-white`}>
                {checked && <div className="w-2.5 h-2.5 bg-[#1A1A1A]"></div>}
            </div>
            <span className="font-serif italic text-[14px]">{label}</span>
        </div>
    );
}
