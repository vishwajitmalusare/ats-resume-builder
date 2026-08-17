import React from "react";
import { useResume } from "../../context/ResumeContext";
import { FaCertificate, FaPlus, FaTrash } from "react-icons/fa";

const CertificationsEditor: React.FC = () => {
    const { resume, addCertification, removeCertification } = useResume();

    const handleAdd = () => {
        addCertification({
            name: 'Certification Name',
            issuer: "Issuing Organization",
            date: '',
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justtify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <FaCertificate className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
                        <p className="text-sm text-gray-500">Add your professional certifications</p>
                    </div>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all"
                >
                    <FaPlus />
                    Add Certification
                </button>
            </div>

            <div className="space-y-4">
                {resume.certifications.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                            <div className="flex-1 grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Certification Name</label>
                                    <input
                                        type="text"
                                        value={cert.name}
                                        onChange={(e) => {
                                            const newCert = { ...cert, name: e.target.value };
                                            const index = resume.certifications.findIndex(c => c.id === cert.id);
                                            if (index !== -1) {
                                                const updated = [...resume.certifications];
                                                updated[index] = newCert;
                                            }
                                        }}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Issuer</label>
                                    <input
                                        type="text"
                                        value={cert.issuer}
                                        onChange={(e) => {
                                            const newCert = { ...cert, issuer: e.target.value };
                                            const index = resume.certifications.findIndex(c => c.id === cert.id);
                                            if (index !== -1) {
                                                const updated = [...resume.certifications];
                                                updated[index] = newCert;
                                            }
                                        }}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Date Earned</label>
                                    <input
                                        type="month"
                                        value={cert.date}
                                        onChange={(e) => {
                                            const newCert = { ...cert, date: e.target.value };
                                            const index = resume.certifications.findIndex(c => c.id === cert.id);
                                            if (index !== -1) {
                                                const updated = [...resume.certifications];
                                                updated[index] = newCert;
                                            }
                                        }}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => removeCertification(cert.id)}
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors ml-4"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {resume.certifications.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg mb-2">No certifications added yet</p>
                        <p className="text-sm">Click "Add Certification" to highlight your credentials</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificationsEditor;
