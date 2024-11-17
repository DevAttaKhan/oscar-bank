import { icons } from "lucide-react";

type Props = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  className?: string;
  onClick?: (e: any) => void;
};

export const Lucide: React.FC<Props> = ({
  name,
  color,
  size,
  className,
  onClick,
}) => {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      color={color}
      size={size}
      className={className}
      onClick={onClick}
    />
  );
};
