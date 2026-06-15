import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Settings2,
  CheckCircle2,
  FileSliders,
  LayoutTemplate,
  Maximize,
  Palette,
} from "lucide-react";

interface PrintGuideProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  paperSize: "A4" | "F4";
}

export function PrintGuide({
  isOpen,
  onConfirm,
  onCancel,
  paperSize,
}: PrintGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm print:hidden"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-lg bg-white shadow-2xl overflow-hidden font-sans border-2 border-[#1A1A1A] print:hidden flex flex-col max-h-[90vh]"
          >
            <div className="bg-[#1A1A1A] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Settings2 className="w-5 h-5" />
                <h2 className="text-base font-bold tracking-widest uppercase">
                  Panduan Cetak Raport
                </h2>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <p className="text-gray-600 mb-6 text-sm leading-relaxed font-medium">
                Agar hasil unduhan PDF atau cetakan raport rapi dan proporsional
                di kertas, mohon sesuaikan{" "}
                <strong className="text-[#1A1A1A]">More settings</strong> pada
                jendela Print/Cetak browser Anda:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-4 p-4 bg-[#F4F1EA] border border-[#1A1A1A]/10">
                  <LayoutTemplate className="w-5 h-5 mt-0.5 text-[#1A1A1A] shrink-0" />
                  <div>
                    <h3 className="font-bold text-xs tracking-wider uppercase text-[#1A1A1A]">
                      Paper Size
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      Pilih{" "}
                      <strong className="text-[#1A1A1A]">{paperSize}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F4F1EA] border border-[#1A1A1A]/10">
                  <FileSliders className="w-5 h-5 mt-0.5 text-[#1A1A1A] shrink-0" />
                  <div>
                    <h3 className="font-bold text-xs tracking-wider uppercase text-[#1A1A1A]">
                      Margins
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      Pilih <strong className="text-[#1A1A1A]">Custom</strong>{" "}
                      <br /> Atas & Bawah:{" "}
                      <strong className="text-[#1A1A1A]">0.31"</strong> <br />
                      Kiri & Kanan:{" "}
                      <strong className="text-[#1A1A1A]">0"</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F4F1EA] border border-[#1A1A1A]/10">
                  <Maximize className="w-5 h-5 mt-0.5 text-[#1A1A1A] shrink-0" />
                  <div>
                    <h3 className="font-bold text-xs tracking-wider uppercase text-[#1A1A1A]">
                      Scale
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      Pilih <strong className="text-[#1A1A1A]">Custom</strong>{" "}
                      dan isikan <strong className="text-[#1A1A1A]">106</strong>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F4F1EA] border border-[#1A1A1A]/10">
                  <Palette className="w-5 h-5 mt-0.5 text-[#1A1A1A] shrink-0" />
                  <div>
                    <h3 className="font-bold text-xs tracking-wider uppercase text-[#1A1A1A]">
                      Options
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      Centang{" "}
                      <strong className="text-[#1A1A1A]">
                        Headers and footers
                      </strong>{" "}
                      &{" "}
                      <strong className="text-[#1A1A1A]">
                        Background graphics
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
              <button
                onClick={onCancel}
                className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className="bg-[#1A1A1A] hover:bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <CheckCircle2 className="w-4 h-4" /> Mengerti, Lanjut Cetak
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
