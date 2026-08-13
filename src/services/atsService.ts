export interface ATSResult {
    overall: number;
    sections: {
        personal: number;
        summary: number;
        experience: number;
        education: number;
        skills: number;
        projects: number;
        formatting: number;
    };
    recommendations: string[];
}

export interface KeywordMatch {
    matchedKeywords: string[];
    missingKeywords: string[];
    matchPercentage: number;
    suggestions: string[];
    keywordDensity: Record<string, number>;
}

export class ATSService {
    private actionVerbs = ['led', 'managed', 'developed', 'created', 'designed', 'implemented', 'achieved', 'improved', 'increased', 'reduced', 'solved', 'built', 'launched', 'delivered', 'optimized', 'transformed'];
    private stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'without', 'by', 'from', 'up', 'down', 'off', 'over']);


    calculateATSScore(resume: any): ATSResult {
        const sections = {
            personal: this.checkPersonal(resume.personal || {}),
            summary: this.checkSummary(resume.summary || ''),
            experience: this.checkExperience(resume.experience || []),
            education: this.checkEducation(resume.education || []),
            skills: this.checkSkills(resume.skills || []),
            projects: this.checkProjects(resume.projects || []),
            formatting: this.checkFormatting(resume)
        };

        const values = Object.values(sections);
        const overall = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

        return {
            overall,
            sections,
            recommendations: this.getRecommendations(sections, resume)
        };
    }

    private checkPersonal(personal: any): number {
        let score = 0;
        const fields = ['firstName', 'lastName', 'email', 'phone', 'location'];
        const filled = fields.filter(f => personal[f]?.length > 0);
        score += (filled.length / fields.length) * 50;
        if (personal.linkedin?.length > 0) score += 20;
        if (personal.portfolio?.length > 0) score += 20;
        if (personal.title?.length > 0) score += 10;
        return Math.min(Math.round(score), 100);
    }

    private checkSummary(summary: string): number {
        if (!summary) return 0;
        const words = summary.split(/\s+/).filter(w => w.length > 0);
        const count = words.length;
        const hasActionVerbs = this.actionVerbs.some(verb => summary.toLowerCase().includes(verb));
        let score = 0;
        if (count >= 30 && count <= 60) score += 40;
        else if (count >= 20) score += 25;
        else if (count >= 10) score += 15;
        else score += 5;
        if (hasActionVerbs) score += 20;
        if (count >= 50) score += 15;
        if (this.hasQuantifiable(summary)) score += 15;
        return Math.min(score, 100);
    }

    private checkExperience(experience: any[]): number {
        if (!experience?.length) return 20;
        const valid = experience.filter(e => e.company || e.position);
        if (!valid.length) return 20;
        let score = 0;
        valid.slice(0, 3).forEach(exp => {
            const desc = exp.description?.join(' ') || '';
            if (this.actionVerbs.some(v => desc.toLowerCase().includes(v))) score += 10;
            if (exp.description?.length > 0) {
                const bullets = exp.description.filter((d: string) => d.length > 10);
                score += Math.min(bullets.length * 8, 30);
                bullets.forEach((bullet: string) => { if (this.hasQuantifiable(bullet)) { score += 5; } });
            }
            if (exp.company?.length > 0) score += 10;
            if (exp.position?.length > 0) score += 10;
            if (exp.startDate) score += 5;
            if (exp.current || exp.endDate) score += 5;
        });
        if (valid.length >= 3) score += 10;
        else if (valid.length >= 2) score += 5;
        return Math.min(score / Math.max(valid.length, 1), 100);
    }

    private checkEducation(education: any[]): number {
        if (!education?.length) return 20;
        const valid = education.filter(e => e.institution || e.degree);
        if (!valid.length) return 20;
        let score = 0;
        valid.slice(0, 2).forEach(edu => {
            if (edu.institution?.length > 0) score += 25;
            if (edu.degree?.length > 0) score += 25;
            if (edu.field?.length > 0) score += 20;
            if (edu.graduationDate) score += 15;
            if (edu.gpa && parseFloat(edu.gpa) >= 3.5) score += 15;
        });
        return Math.min(score / valid.length, 100);
    }

    private checkSkills(skills: any[]): number {
        if (!skills?.length) return 0;
        const tech = skills.filter(s => s.category === 'technical');
        const soft = skills.filter(s => s.category === 'soft');
        const lang = skills.filter(s => s.category === 'language');
        let score = 0;
        if (tech.length >= 8) score += 35;
        else if (tech.length >= 5) score += 25;
        else if (tech.length >= 3) score += 15;
        else score += 5;
        if (soft.length >= 4) score += 20;
        else if (soft.length >= 2) score += 12;
        else if (soft.length >= 1) score += 5;
        if (lang.length >= 2) score += 15;
        else if (lang.length >= 1) score += 8;
        if (skills.length >= 15) score += 15;
        else if (skills.length >= 10) score += 10;
        else if (skills.length >= 7) score += 5;
        if (tech.length > 0 && soft.length > 0 && lang.length > 0) score += 10;
        return Math.min(score, 100);
    }

    private checkProjects(projects: any[]): number {
        if (!projects?.length) return 0;
        const valid = projects.filter(p => p.name || p.description);
        if (!valid.length) return 0;
        let score = 0;
        valid.slice(0, 2).forEach(project => {
            if (project.name?.length > 0) score += 20;
            if (project.description?.length > 30) score += 25;
            else if (project.description?.length > 15) score += 15;
            if (project.techStack?.length > 0) { score += 25; if (project.techStack.length >= 3) score += 10; }
            if (project.link) score += 10;
        });
        if (valid.length >= 3) score += 15;
        return Math.min(score / valid.length, 100);
    }

    private checkFormatting(resume: any): number {
        let score = 70;
        const sections = ['summary', 'experience', 'education', 'skills'];
        const hasSections = sections.filter(s => resume[s]?.length > 0);
        if (hasSections.length >= 4) score += 20;
        else if (hasSections.length >= 3) score += 10;
        if (resume.experience?.some((e: any) => e.description?.length > 0)) score += 10;
        return Math.min(score, 100);
    }

    private hasQuantifiable(text: string): boolean {
        return /\d+%|\d+\s*(?:dollars?|users?|customers?)|increased|decreased|improved|reduced/i.test(text);
    }

    private getRecommendations(sections: any, resume: any): string[] {
        const recs: string[] = [];
        if (sections.personal < 80) {
            if (!resume.personal?.linkedin) recs.push('Add LinkedIn profile');
            if (!resume.personal?.title) recs.push('Add professional title');
        }
        if (sections.summary < 70) {
            const words = resume.summary?.split(/\s+/).filter((w: string) => w.length > 0).length || 0;
            if (words < 20) recs.push('Expand summary to 30-60 words');
            if (!this.actionVerbs.some(v => resume.summary?.toLowerCase().includes(v))) recs.push('Use action verbs in summary');
        }
        if (sections.skills < 80) {
            const tech = resume.skills?.filter((s: any) => s.category === 'technical').length || 0;
            if (tech < 5) recs.push('Add more technical skills');
            if ((resume.skills?.length || 0) < 10) recs.push('Aim for 10-15 skills');
        }
        return recs.slice(0, 4);
    }

    private extractKeywords(text: string): string[] {
        if (!text) return [];
        return text.toLowerCase().replace(/[^a-zA-Z\s]/g, ' ').replace(/\s+/g, ' ').trim()
            .split(' ')
            .filter(w => w.length > 2 && !this.stopWords.has(w));
    }

    matchJobDescription(resumeText: string, jobDescription: string): KeywordMatch {
        if (!resumeText || !jobDescription) {
            return { matchedKeywords: [], missingKeywords: [], matchPercentage: 0, suggestions: ['Provide both texts'], keywordDensity: {} };
        }
        const resumeKeywords = this.extractKeywords(resumeText);
        const jobKeywords = this.extractKeywords(jobDescription);
        if (jobKeywords.length === 0) {
            return { matchedKeywords: [], missingKeywords: [], matchPercentage: 0, suggestions: ['No keywords found'], keywordDensity: {} };
        }
        const resumeSet = new Set(resumeKeywords);
        const jobSet = new Set(jobKeywords);
        const matched = [...jobSet].filter(k => resumeSet.has(k));
        const missing = [...jobSet].filter(k => !resumeSet.has(k));
        const precentage = Math.round((matched.length / jobSet.size) * 100);
        const suggestions = missing.slice(0, 5).map(k => `Add "${k} to resume`);
        return {
            matchedKeywords: matched.slice(0, 20),
            missingKeywords: missing.slice(0, 20),
            matchPercentage: precentage,
            suggestions: suggestions.length ? suggestions : ['Good match!'],
            keywordDensity: {}
        };
    }
}
