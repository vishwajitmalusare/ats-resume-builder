import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ATSService } from '../../services/atsService';

const ATSScore: React.FC = () => {
    const { resume } = useResume();
    const [result, setResult] = useState<any>(null);
    const [jobDesc, setJobDesc] = useState('');
    const [keywordMatch, setKeywordMatch] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState<'score' | 'match'>('score');
    const ats = new ATSService();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setResult(ats.calculateATSScore(resume));
            setLoading(false);
        }, 200);
    }, [resume]);

    const analyzeMatch = () => {
        if (!jobDesc.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const match = ats.matchJobDescription(JSON.stringify(resume), jobDesc);
            setKeywordMatch(match);
            setLoading(false);
        }, 300);
    };

    const getColor = (score: number) => score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
    const getBg = (score: number) => score >= 80 ? 'bg-green-100 border-green-300' : score >= 60 ? 'bg-yellow-100 border-yellow-300' : 'bg-red-100 border-red-300';
    const getLabel = (score: number) => score >= 80 ? '✅ Excellent - ATS Friendly!' : score >= 60 ? '⚠️ Good - Needs Improvement' : '❌ Poor - Needs Work';

    if (loading) return <div className="text-center py-8 text-gray-500">Analyzing your resume...</div>;

    return (
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
            <div className="flex items-center gap-3 border-b pb-3">
                <span className="text-2xl">🤖</span>
                <div>
                    <h2 className="text-lg font-semibold">ATS Analysis</h2>
                    <p className="text-sm text-gray-500">Check your resume's ATS compatibility</p>
                </div>
            </div>

            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button onClick={() => setTab('score')} className={`flex-1 py-1.5 text-sm rounded-md transition-all ${tab === 'score' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>
                    📊 Score
                </button>
                <button onClick={() => setTab('match')} className={`flex-1 py-1.5 text-sm rounded-md transition-all ${tab === 'match' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}>
                    🔍 Job Match
                </button>
            </div>

            {tab === 'score' && result && (
                <div className="space-y-3">
                    <div className={`border-2 rounded-xl p-4 ${getBg(result.overall)}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Overall ATS Score</p>
                                <p className={`text-3xl font-bold ${getColor(result.overall)}`}>{result.overall}%</p>
                                <p className="text-xs mt-1">{getLabel(result.overall)}</p>
                            </div>
                            <div className={`w-16 h-16 rounded-full border-2 ${getBg(result.overall)} flex items-center justify-center`}>
                                <span className={`text-xl font-bold ${getColor(result.overall)}`}>{result.overall}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Section Breakdown</p>
                        {Object.entries(result.sections).map(([key, value]) => {
                            const score = Number(value);

                            return (
                                <div key={key} className="flex items-center gap-2">
                                    <span className="text-xs capitalize text-gray-600 w-16">
                                        {key}
                                    </span>

                                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${score >= 80
                                                ? 'bg-green-500'
                                                : score >= 60
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                                }`}
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>

                                    <span
                                        className={`text-xs font-medium w-8 text-right ${getColor(score)}`}
                                    >
                                        {score}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {result.recommendations?.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-xs font-medium text-yellow-700 flex items-center gap-1">⚠️ Recommendations</p>
                            <ul className="mt-1 space-y-0.5 max-h-24 overflow-y-auto">
                                {result.recommendations.slice(0, 5).map((rec: string, i: number) => (
                                    <li key={i} className="text-xs text-yellow-700 flex items-start gap-1">• {rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {tab === 'match' && (
                <div className="space-y-3">
                    <textarea
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Paste job description here..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                    />
                    <button onClick={analyzeMatch} disabled={loading || !jobDesc.trim()} className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg transition-all disabled:opacity-50">
                        {loading ? 'Analyzing...' : '🔍 Match Keywords'}
                    </button>

                    {keywordMatch && (
                        <div className="space-y-3 animate-fade-in max-h-80 overflow-y-auto">
                            <div className={`border-2 rounded-lg p-3 ${getBg(keywordMatch.matchPercentage)}`}>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Match</span>
                                    <span className={`text-xl font-bold ${getColor(keywordMatch.matchPercentage)}`}>{keywordMatch.matchPercentage}%</span>
                                </div>
                                <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${keywordMatch.matchPercentage >= 80 ? 'bg-green-500' : keywordMatch.matchPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${keywordMatch.matchPercentage}%` }} />
                                </div>
                            </div>

                            {keywordMatch.matchedKeywords.length > 0 && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-xs font-medium text-green-700">✅ Matched ({keywordMatch.matchedKeywords.length})</p>
                                    <div className="flex flex-wrap gap-1 mt-1 max-h-16 overflow-y-auto">
                                        {keywordMatch.matchedKeywords.slice(0, 15).map((k: string) => <span key={k} className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">{k}</span>)}
                                    </div>
                                </div>
                            )}

                            {keywordMatch.missingKeywords.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-xs font-medium text-red-700">❌ Missing ({keywordMatch.missingKeywords.length})</p>
                                    <div className="flex flex-wrap gap-1 mt-1 max-h-16 overflow-y-auto">
                                        {keywordMatch.missingKeywords.slice(0, 15).map((k: string) => <span key={k} className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">{k}</span>)}
                                    </div>
                                </div>
                            )}

                            {keywordMatch.suggestions.length > 0 && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-xs font-medium text-blue-700">💡 Suggestions</p>
                                    <ul className="mt-1 space-y-0.5 max-h-16 overflow-y-auto">
                                        {keywordMatch.suggestions.slice(0, 3).map((s: string, i: number) => <li key={i} className="text-xs text-blue-700">• {s}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ATSScore;