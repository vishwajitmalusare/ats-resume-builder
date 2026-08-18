import { useEffect, useRef, useState } from "react";
import { useResume } from "../../context/ResumeContext";
import { useTemplate } from "../../context/TemplateContext";
import { ExportService } from "../../services/exportService";
import { FaCompress, FaExpand, FaFileAlt, FaFilePdf, FaFileWord } from "react-icons/fa";
import ResumePreview from "../preview/ResumePreview";

const PreviewPanel: React.FC = () => {
    const { currentTemplate } = useTemplate();
    const { resume } = useResume();
    const [zoom, setZoom] = useState(1);
    const [fileSize, setFileSize] = useState<string>('');
    const [exporting, setExporting] = useState<'pdf' | 'docx' | 'txt' | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const exportService = new ExportService();

    const estimateFileSize = () => {
        const text = JSON.stringify(resume);
        const sizeInBytes = new Blob([text]).size;
        if (sizeInBytes < 1024) return `${sizeInBytes} B`;
        if (sizeInBytes < 1048576) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
        return `${(sizeInBytes / 1048576).toFixed(1)} MB`;
    }

    useEffect(() => {
        setFileSize(estimateFileSize());
    }, [resume]);

    const handleExportPDF = async () => {
        const el = document.getElementById('resume-preview');
        if (el) {
            setExporting('pdf');
            try {
                await exportService.exportAsPDF(el);
            } finally {
                setExporting(null);
            }
        }
    };

    const handleExportDOCX = async () => {
        setExporting('docx');
        try {
            await exportService.exportAsDOCX(resume);
        } finally {
            setExporting(null);
        }
    };

    const handleExportText = async () => {
        setExporting('txt');
        try {
            await exportService.exportAsText(resume);
        } finally {
            setExporting(null);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-card p-4 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Preview</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                    {currentTemplate}
                </span>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    📄 {fileSize}
                </span>
            </div>
            <div className="flex items-center gap-1.5">
                <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-1 hover:bg-gray-100 rounded">
                    <FaCompress className="text-xs text-gray-600" />
                </button>
                <span className="text-xs font-medium text-gray-600 w-10 text-center">
                    {Math.round(zoom * 100)}%
                </span>
                <button onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))} className="p-1 hover:bg-gray-100 rounded">
                    <FaExpand className="text-xs text-gray-600" />
                </button>

                <span className="w-px h-5 bg-gray-300 mx-1" />

                <button
                    onClick={handleExportPDF}
                    disabled={exporting !== null}
                    className="flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaFilePdf className="text-[10px]" /> {exporting === 'pdf' ? '...' : 'PDF'}
                </button>
                <button
                    onClick={handleExportDOCX}
                    disabled={exporting !== null}
                    className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaFileWord className="text-[10px]" /> {exporting === 'docx' ? '...' : 'DOCX'}
                </button>
                <button
                    onClick={handleExportText}
                    disabled={exporting !== null}
                    className="flex items-center gap-1 px-2.5 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaFileAlt className="text-[10px]" /> {exporting === 'txt' ? '...' : 'TXT'}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 rounded-lg p-2">
                <div className="transition-transform duration-200 origin-top" style={{ transform: `scale(${zoom})` }}>
                    <ResumePreview />
                </div>
            </div>

            <div className="mt-2 pt-2 border-gray-100 flex justify-between text-[10px] text-gray-400">
                <span>💡 ATS-friendly: Simple formatting, standard fonts, under 500KB</span>
                <span>📏 {fileSize} estimated file size</span>
            </div>
        </div>
    );
};

export default PreviewPanel;
