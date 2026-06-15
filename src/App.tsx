import React, { useState } from 'react';
import { useAppData } from './hooks/useAppData';
import { SettingsForm } from './components/Settings';
import { DataTable } from './components/DataTable';
import { RaportPrint } from './components/RaportPrint';
import { LandingPage } from './components/LandingPage';
import { Printer, Settings as SettingsIcon, Users, FileSpreadsheet } from 'lucide-react';

export default function App() {
  const { settings, updateSettings, students, addStudent, updateStudent, deleteStudent } = useAppData();
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<'data' | 'settings' | 'print'>('data');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [paperSize, setPaperSize] = useState<'A4' | 'F4'>('A4');
  
  const handlePrint = () => {
    // Gunakan fungsi native browser print yang paling stabil
    if (window.top !== window.self) {
      alert("PEMBERITAHUAN: Di mode pratinjau ini, dialog cetak/PDF mungkin diblokir oleh browser. \n\nSilakan klik ikon panah 'Buka di Tab Baru' (kiri atas) atau deploy ke Vercel agar tombol ini berfungsi 100% dengan lancar.");
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  return (
    <div className="h-screen bg-[#F4F1EA] text-[#1A1A1A] flex flex-col font-serif overflow-hidden print:overflow-visible print:bg-white print:h-auto print:block">
      <header className="bg-white border-b border-[#1A1A1A] px-8 py-4 sticky top-0 z-20 print:hidden flex justify-between items-center shrink-0">
          <div className="flex items-baseline gap-4">
            <h1 className="text-2xl font-bold tracking-tight uppercase">Sistem Manajemen Raport</h1>
            <span className="text-xs font-sans tracking-widest text-gray-500 uppercase hidden sm:block">Edisi Profesional v2.4</span>
          </div>
          <nav className="flex items-center gap-6 font-sans text-xs font-semibold tracking-widest">
            <TabButton 
                active={activeTab === 'data'} 
                onClick={() => setActiveTab('data')} 
                label="SHEET: DATA UTAMA" 
            />
            <TabButton 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')} 
                label="SHEET: PENGATURAN" 
            />
            <TabButton 
                active={activeTab === 'print'} 
                onClick={() => {
                  if(!selectedStudentId && students.length > 0) setSelectedStudentId(students[0].id);
                  setActiveTab('print');
                }} 
                label="CETAK RAPORT" 
            />
          </nav>
      </header>

      <main className="flex-1 flex overflow-hidden print:overflow-visible print:p-0 print:m-0 print:block print:h-auto">
        {activeTab === 'settings' && (
           <div className="flex-1 overflow-y-auto p-8">
               <SettingsForm settings={settings} onUpdate={updateSettings} />
           </div>
        )}

        {activeTab === 'data' && (
           <DataTable 
             students={students} 
             onUpdate={updateStudent} 
             onAdd={addStudent} 
             onDelete={deleteStudent}
           />
        )}

        {activeTab === 'print' && (
          <div className="flex-1 flex flex-col overflow-hidden print:block h-full print:overflow-visible print:h-auto">
             <div className="print:hidden bg-white p-6 border-b border-[#1A1A1A] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-sans font-bold uppercase tracking-widest">Pilih Siswa:</label>
                    <select 
                       value={selectedStudentId} 
                       onChange={(e) => setSelectedStudentId(e.target.value)}
                       className="border-b-2 border-[#1A1A1A] bg-transparent pb-1 px-2 min-w-[250px] focus:outline-none font-sans text-sm"
                    >
                       {students.map(s => (
                         <option key={s.id} value={s.id}>{s.urut}. {s.nisn} - {s.nama || '(Tanpa Nama)'}</option>
                       ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3 border-l border-[#1A1A1A] pl-6">
                     <label className="text-xs font-sans font-bold uppercase tracking-widest">Kertas:</label>
                     <select 
                       value={paperSize} 
                       onChange={(e) => setPaperSize(e.target.value as 'A4' | 'F4')}
                       className="border-b-2 border-[#1A1A1A] bg-transparent pb-1 px-2 focus:outline-none font-sans text-sm"
                    >
                       <option value="A4">A4 (210 x 297 mm)</option>
                       <option value="F4">F4 / Folio (210 x 330 mm)</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={handlePrint}
                    disabled={!selectedStudent}
                    className="bg-[#1A1A1A] hover:bg-black text-white px-6 py-2 uppercase font-sans text-xs tracking-widest font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <Printer className="w-4 h-4" /> Unduh PDF / Cetak
                  </button>
                  <span className="text-[9px] text-[#1A1A1A] max-w-[200px] text-right">
                    *Gunakan fitur "Simpan sebagai PDF" pada jendela Print. (Buka Tab Baru/Deploy jika macet)
                  </span>
                </div>
             </div>

             <div className="flex-1 overflow-auto bg-[#E5E7EB] p-10 flex justify-center print:hidden print:p-0">
                <div className="shadow-2xl transition-transform transform origin-top w-max bg-white/5 pb-10">
                   {selectedStudent ? (
                     <RaportPrint student={selectedStudent} settings={settings} paperSize={paperSize} />
                   ) : (
                     <div className={`w-[210mm] ${paperSize === 'F4' ? 'h-[330mm]' : 'h-[297mm]'} bg-white flex items-center justify-center text-gray-400 font-sans tracking-widest text-sm border-2 border-[#1A1A1A]`}>
                        PILIH SISWA UNTUK MELIHAT PREVIEW
                     </div>
                   )}
                </div>
             </div>
             
             {/* Only rendered visible during print mode */}
             <div className="hidden print:block w-full">
                 {selectedStudent && <RaportPrint student={selectedStudent} settings={settings} paperSize={paperSize} />}
             </div>
          </div>
        )}
      </main>

      <footer className="bg-[#1A1A1A] text-white px-8 py-2 text-[10px] font-sans flex justify-between items-center shrink-0 print:hidden">
        <div>STATUS: <span className="text-green-400">TERHUBUNG KE DATABASE PENDIDIKAN</span></div>
        <div className="flex gap-4">
          <span>PROGRAM SEKOLAH MENGAJI</span>
          <span className="opacity-50 tracking-widest">DOC ID: TCH-2026-001</span>
        </div>
      </footer>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button 
           onClick={onClick}
           className={`uppercase transition-colors ${active ? 'underline text-[#1A1A1A]' : 'text-gray-400 hover:underline'}`}
        >
            {label}
        </button>
    );
}
