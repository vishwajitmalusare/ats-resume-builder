import type { ResumeData } from '../types/resume.types';

export class ExportService {
  async exportAsPDF(element: HTMLElement, filename: string = 'resume.pdf'): Promise<void> {
    try {
      const html2cavas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2cavas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 795,
        height: 1123,
        onclone: (cloneDoc) => {
          const el = cloneDoc.getElementById('resume-preview');
          if (el) {
            el.style.width = '795px';
            el.style.padding = '40px';
            el.style.fontSize = '12px';
          }
        }
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.85);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [795, 1123],
        compress: true,
        hotfixes: ['px_scaling']
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 795, 1123);
      pdf.save(filename);
    } catch (error) {
      console.error('PDF Export Error:', error);
      throw new Error('Failed to export PDF');
    }
  }

  async exportAsDOCX(resumeData: ResumeData, filename: string = 'resume.docx'): Promise<void> {
    try {
      const { Document, Packer, Paragraph, TextRun, AlignmentType, convertInchesToTwip } = await import('docx');
      const { saveAs } = await import('file-saver');

      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.5),
                bottom: convertInchesToTwip(0.5),
                left: convertInchesToTwip(0.7),
                right: convertInchesToTwip(0.7),
              },
            },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${resumeData.personal.firstName || ''} ${resumeData.personal.lastName || ''}`.trim(),
                  bold: true,
                  size: 32,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 80 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.personal.title || 'Professional',
                  size: 20,
                  color: '2563eb',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: [
                    resumeData.personal.email,
                    resumeData.personal.phone,
                    resumeData.personal.location,
                  ].filter(Boolean).join(' | '),
                  size: 16,
                  color: '666666',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '─────────────────────────────',
                  size: 14,
                  color: 'cccccc',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 150 },
            }),

            ...(resumeData.summary ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'PROFESSIONAL SUMMARY',
                    bold: true,
                    size: 18,
                    color: '2563eb',
                  }),
                ],
                spacing: { before: 150, after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: resumeData.summary,
                    size: 18,
                  }),
                ],
                spacing: { after: 150 },
              }),
            ] : []),

            ...(resumeData.experience && resumeData.experience.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'WORK EXPERIENCE',
                    bold: true,
                    size: 18,
                    color: '2563eb'
                  }),
                ],
                spacing: { before: 150, after: 80 },
              }),
              ...resumeData.experience.slice(0, 3).flatMap((exp) => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: exp.position || 'Position',
                      bold: true,
                      size: 18,
                    }),
                    new TextRun({
                      text: `  |  ${exp.company || 'Company'}`,
                      size: 17,
                    })
                  ],
                  spacing: { before: 120 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`,
                      size: 14,
                      color: '666666',
                    }),
                  ],
                  spacing: { after: 40 },
                }),
                ...(exp.description && exp.description.length > 0 ? exp.description.slice(0, 4).map((bullet: string) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `●  ${bullet}`,
                        size: 17,
                      }),
                    ],
                    spacing: { before: 20 },
                  })
                ) : []),
              ]),
            ] : []),

            ...(resumeData.skills && resumeData.skills.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'SKILLS',
                    bold: true,
                    size: 18,
                    color: '2563eb',
                  }),
                ],
                spacing: { before: 150, after: 80 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: resumeData.skills
                      .slice(0, 15)
                      .map((s) => s.name)
                      .filter(Boolean)
                      .join('  ●  '),
                    size: 17,
                  }),
                ],
                spacing: { after: 80 },
              }),
            ] : []),

            ...(resumeData.education && resumeData.education.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'EDUCATION',
                    bold: true,
                    size: 18,
                    color: '2563eb',
                  })
                ],
                spacing: { before: 150, after: 80 },
              }),
              ...resumeData.education.slice(0, 2).flatMap((edu) => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${edu.degree || 'Degree'} in ${edu.field || 'Field'}`,
                      bold: true,
                      size: 17,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: edu.institution || 'Institution',
                      size: 16,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: edu.graduationDate || '',
                      size: 14,
                      color: '666666',
                    }),
                  ],
                  spacing: { after: 40 },
                }),
              ]),
            ] : []),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, filename);
    } catch (error) {
      console.log('DOCX Export Error:', error);
      throw new Error('Failed to export DOCX');
    }
  };

  async exportAsText(resumeData: ResumeData, filename: string = 'resume.txt'): Promise<void> {
    const text = this.generatePlainText(resumeData);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const { saveAs } = await import('file-saver');
    saveAs(blob, filename);
  }

  private generatePlainText(resume: ResumeData): string {
    const lines = [];

    lines.push(`${resume.personal.firstName || ''} ${resume.personal.lastName || ''}`.trim());
    lines.push(resume.personal.title || 'Professional');
    lines.push(`${resume.personal.email || ''} | ${resume.personal.phone || ''} | ${resume.personal.location || ''}`);
    lines.push('');
    lines.push('='.repeat(50));
    lines.push('');

    if (resume.summary) {
      lines.push('PROFESSIONAL SUMMARY');
      lines.push('-'.repeat(30));
      lines.push(resume.summary);
      lines.push('');
    }

    if (resume.experience && resume.experience.length > 0) {
      lines.push('WORK EXPERIENCE');
      lines.push('-'.repeat(30));
      resume.experience.slice(0, 3).forEach(exp => {
        lines.push(`${exp.position} | ${exp.company}`);
        lines.push(`${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`);
        if (exp.description) {
          exp.description.slice(0, 4).forEach(bullet => {
            lines.push(`  - ${bullet}`);
          });
        }
        lines.push('');
      });
    }

    if (resume.skills && resume.skills.length > 0) {
      lines.push('SKILLS');
      lines.push('-'.repeat(30));
      const tech = resume.skills.filter(s => s.category === 'technical').slice(0, 10).map(s => s.name);
      const soft = resume.skills.filter(s => s.category === 'soft').slice(0, 5).map(s => s.name);
      const lang = resume.skills.filter(s => s.category === 'language').slice(0, 3).map(s => s.name);
      if (tech.length) lines.push(`Technical: ${tech.join(', ')}`);
      if (soft.length) lines.push(`Soft: ${soft.join(', ')}`);
      if (lang.length) lines.push(`Languages: ${lang.join(', ')}`);
      lines.push('');
    }

    if (resume.education && resume.education.length > 0) {
      lines.push('EDUCATION');
      lines.push('-'.repeat(30));
      resume.education.slice(0, 2).forEach(edu => {
        lines.push(`${edu.degree || 'Degree'} in ${edu.field || 'Field'}`);
        lines.push(`${edu.institution || 'Institution'}`);
        lines.push(`${edu.graduationDate || ''}`);
        lines.push('');
      });
    }

    return lines.join('\n');
  }
}
