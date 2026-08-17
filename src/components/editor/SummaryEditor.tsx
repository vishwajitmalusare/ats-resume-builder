import React from "react";
import { useResume } from "../../context/ResumeContext";
import { FaAlignLeft } from "react-icons/fa";

const SummaryEditor: React.FC = () => {
    const { resume, updateSummary } = useResume();
    const wordCount = resume.summary.split(/\s+/).filter(w => w.length > 0).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                    <FaAlignLeft className="text-xl" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
                    <p className="text-sm text-gray-500">Write a compelling of your experience</p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Summary <span className="text-gray-400">({wordCount} words)</span>
                </label>
                <textarea
                    value={resume.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    rows={8}
                    className="input-field resize-none"
                    placeholder="Experienced professional with a proven track record..."
                />
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>Pro tip: Keep it concise and highlight key achivements</span>
                    <span className={wordCount < 30 ? 'text-yellow-600' : 'text-green-600'}>
                        {wordCount < 30 ? 'Try to add more detail' : 'Good Length'}
                    </span>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 Tips for a Great Summary</h4>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>Include your years of experience and key skills</li>
                    <li>Highlight your most significant achievements</li>
                    <li>Mention industry experties or specializations</li>
                    <li>Keep it to 3-5 sentences (30-60 words)</li>
                </ul>
            </div>
        </div>
    );
};

export default SummaryEditor;
