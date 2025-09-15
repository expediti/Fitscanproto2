import { useNavigate } from 'react-router-dom';
import { healthTools } from '@/data/tools';

export const useToolNavigation = () => {
  const navigate = useNavigate();

  const navigateToTool = (toolId: string) => {
    const tool = healthTools.find(t => t.id === toolId);
    if (tool) {
      // Navigate to the tool page
      navigate(`/${toolId}`);
    } else {
      console.error(`Tool with ID ${toolId} not found`);
    }
  };

  const getToolUrl = (toolId: string) => {
    return `/${toolId}`;
  };

  return {
    navigateToTool,
    getToolUrl
  };
};
