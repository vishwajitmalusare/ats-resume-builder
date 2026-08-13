import { useResume } from "../../context/ResumeContext";
import { useTemplate } from "../../context/TemplateContext";
import TemplateClassic from "./templates/TemplateClassic";
import TemplateCreative from "./templates/TemplateCreative";
import TemplateMinimal from "./templates/TemplateMinimal";
import TemplateModern from "./templates/TemplateModern";

const ResumePreview: React.FC = () => {
  const { resume } = useResume();
  const { currentTemplate } = useTemplate();

  const renderTemplate = () => {
    const props = { resume };
    switch (currentTemplate) {
      case 'modern':
        return <TemplateModern {...props} />
      case 'classic':
        return <TemplateClassic {...props} />
      case 'minimal':
        return <TemplateMinimal {...props} />
      case 'creative':
        return <TemplateCreative {...props} />
      default:
        return <TemplateModern {...props} />
    }
  };

  return (
    <div id="resume-preview" className="bg-white shadow-lg rounded-lg overflow-hidden">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
