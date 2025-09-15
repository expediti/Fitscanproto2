import {
  Clock,
  ArrowRight,
  Heart,
  Brain,
  Activity,
  Wind,
  Sandwich,
  Shield,
  Thermometer,
  Bone,
  Zap,
  Droplets,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  estimatedTime: string;
  icon: string;
  onStartTool: (toolId: string) => void;
}

const difficultyStyles: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 border-green-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Advanced: "bg-red-100 text-red-700 border-red-200",
};

const FallbackIcon = Activity;

function pickIcon(toolId: string, category: string) {
  switch (toolId) {
    case "heart-disease-checker":
    case "heart-attack-checker":
      return Heart;
    case "anxiety-checker":
    case "depression-checker":
      return Brain;
    case "diabetes-checker":
      return Thermometer;
    case "asthma-checker":
      return Wind;
    case "ibs-checker":
    case "food-poisoning-checker":
    case "gastroenteritis-checker":
      return Sandwich;
    case "covid-checker":
      return Shield;
    case "anemia-checker":
      return Droplets;
    case "pcos-checker":
      return Bone;
    case "dizziness-checker":
      return Zap;
    case "uti-checker":
      return Droplets;
    default:
      switch (category) {
        case "Heart Health":
          return Heart;
        case "Mental Health":
          return Brain;
        case "Respiratory":
          return Wind;
        case "Digestive":
          return Sandwich;
        case "Metabolic Health":
          return Thermometer;
        case "Infectious Disease":
          return Shield;
        case "Women's Health":
          return Bone;
        case "Neurological":
          return Zap;
        default:
          return FallbackIcon;
      }
  }
}

export default function ToolCard(props: ToolCardProps) {
  const { id, title, description, category, difficulty, estimatedTime, onStartTool } = props;
  const Icon = pickIcon(id, category);
  const diffStyle = difficultyStyles[difficulty] ?? "bg-gray-100 text-gray-700 border-gray-200";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onStartTool(id);
  };

  return (
    <Card className="hover:shadow-lg transition border">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-tight">{title}</h3>
              <p className="text-xs text-muted-foreground">{category}</p>
            </div>
          </div>
          <Badge className={`border ${diffStyle}`}>{difficulty}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{estimatedTime}</span>
        </div>

        <div className="mt-2 flex justify-end">
          <Button onClick={handleClick} className="gap-2">
            Start Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
