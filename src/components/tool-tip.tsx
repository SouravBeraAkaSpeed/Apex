import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolTipProps {
  content: React.ReactNode;
  tooltip: string;
}

const ToolTip = ({ content, tooltip }: ToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{content}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
