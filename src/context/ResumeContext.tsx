import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ResumeData, ResumeSectionKey } from "../types/resume.types";

const defaultResume: ResumeData = {
    personal: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        portfolio: 'johndoe.dev',
        title: 'Senior Full-Stack Developer',
    },
    summary: 'Experienced software engineer with 5+ years of full-stack development expertise. Passionate about building scalable applications and leading agile teams to deliver high-impact solutions.',
    experience: [
        {
            id: '1',
            company: 'Tech Innovations Inc.',
            position: 'Senior Full-Stack Developer',
            startDate: '2021-01',
            endDate: '',
            current: true,
            description: [
                'Led development of microservices architecture serving 1M+ users',
                'Implemented CI/CD pipeline reducing deployment time by 60%',
                'Mentored 5 junior developers and conducted code reviews',
            ],
        },
    ],
    education: [
        {
            id: '1',
            institution: 'Stanford University',
            degree: 'M.S.',
            field: 'Computer Science',
            graduationDate: '2020-06',
            gpa: '3.9',
        },
    ],
    skills: [
        { id: '1', name: 'React', category: 'technical' },
        { id: '2', name: 'TypeScript', category: 'technical' },
        { id: '3', name: 'Node.js', category: 'technical' },
        { id: '4', name: 'Python', category: 'technical' },
        { id: '5', name: 'AWS', category: 'technical' },
        { id: '6', name: 'Docker', category: 'technical' },
        { id: '7', name: 'Leadership', category: 'soft' },
        { id: '8', name: 'Communication', category: 'soft' },
        { id: '9', name: 'Problem Solving', category: 'soft' },
    ],
    projects: [
        {
            id: '1',
            name: 'E-Commerce Platform',
            description: 'Built full-stack e-commerce solution with real-time inventory and payment processing',
            techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: 'github.com/project',
        },
    ],
    certifications: [
        {
            id: '1',
            name: 'AWS Solutions Architect',
            issuer: 'Amazon',
            date: '2022-03',
        },
    ],
};

interface ResumeContextType {
    resume: ResumeData;
    activeSection: ResumeSectionKey;
    setActiveSection: (section: ResumeSectionKey) => void;
    updatePersonal: (data: Partial<ResumeData['personal']>) => void;
    updateSummary: (summary: string) => void;
    addExperience: (experience: Omit<ResumeData['experience'][0], 'id'>) => void;
    updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
    removeExperience: (id: string) => void;
    addEducation: (education: Omit<ResumeData['education'][0], 'id'>) => void;
    updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: Omit<ResumeData['skills'][0], 'id'>) => void;
    removeSkill: (id: string) => void;
    addProject: (project: Omit<ResumeData['projects'][0], 'id'>) => void;
    updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
    removeProject: (id: string) => void;
    addCertification: (cert: Omit<ResumeData['certifications'][0], 'id'>) => void;
    removeCertification: (id: string) => void;
    exportResume: () => ResumeData;
    importResume: (data: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [resume, setResume] = useState<ResumeData>(defaultResume);
    const [activeSection, setActiveSection] = useState<ResumeSectionKey>('personal');

    const updatePersonal = useCallback((data: Partial<ResumeData['personal']>) => {
        setResume(prev => ({
            ...prev,
            personal: { ...prev.personal, ...data },
        }));
    }
        , []);

    const updateSummary = useCallback((summary: string) => {
        setResume(prev => ({ ...prev, summary }));
    }, []);

    const addExperience = useCallback((experience: Omit<ResumeData['experience'][0], 'id'>) => {
        setResume(prev => ({
            ...prev,
            experience: [...prev.experience, { ...experience, id: Date.now().toString() }],
        }));
    }, []);

    const updateExperience = useCallback((id: string, data: Partial<ResumeData['experience'][0]>) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, ...data } : exp),
        }));
    }, []);

    const removeExperience = useCallback((id: string) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id),
        }));
    }, []);

    const addEducation = useCallback((education: Omit<ResumeData['education'][0], 'id'>) => {
        setResume(prev => ({
            ...prev,
            education: [...prev.education, { ...education, id: Date.now().toString() }],
        }));
    }, []);

    const updateEducation = useCallback((id: string, data: Partial<ResumeData['education'][0]>) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, ...data } : edu),
        }));
    }, []);

    const removeEducation = useCallback((id: string) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id),
        }));
    }, []);

    const addSkill = useCallback((skill: Omit<ResumeData['skills'][0], 'id'>) => {
        setResume(prev => ({
            ...prev,
            skills: [...prev.skills, { ...skill, id: Date.now().toString() }],
        }));
    }, []);

    const removeSkill = useCallback((id: string) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.id !== id),
        }));
    }, []);

    const addProject = useCallback((project: Omit<ResumeData['projects'][0], 'id'>) => {
        setResume(prev => ({
            ...prev,
            projects: [...prev.projects, { ...project, id: Date.now().toString() }],
        }));
    }, []);

    const updateProject = useCallback((id: string, data: Partial<ResumeData['projects'][0]>) => {
        setResume(prev => ({
            ...prev,
            projects: prev.projects.map(proj => proj.id === id ? { ...proj, ...data } : proj),
        }));
    }, []);

    const removeProject = useCallback((id: string) => {
        setResume(prev => ({
            ...prev,
            projects: prev.projects.filter(proj => proj.id !== id),
        }));
    }, []);

    const addCertification = useCallback((cert: Omit<ResumeData['certifications'][0], 'id'>) => {
        setResume(prev => ({
            ...prev,
            certifications: [...prev.certifications, { ...cert, id: Date.now().toString() }],
        }));
    }, []);

    const removeCertification = useCallback((id: string) => {
        setResume(prev => ({
            ...prev,
            certifications: prev.certifications.filter(cert => cert.id !== id),
        }));
    }, []);

    const exportResume = useCallback(() => resume, [resume]);

    const importResume = useCallback((data: ResumeData) => {
        setResume(data);
    }, []);

    const value: ResumeContextType = {
        resume,
        activeSection,
        setActiveSection,
        updatePersonal,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        removeCertification,
        exportResume,
        importResume,
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );

};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within ResumeProvider');
    }
    return context;
};
