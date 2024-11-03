import { Lucide } from "@/components/common";
import Image from "next/image";

type Props = {
  title: string;
  onSearch?: (query: string) => void;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  userImageUrl: string;
};

export const Topbar: React.FC<Props> = ({
  title,
  onSettingsClick,
  onNotificationsClick,
  userImageUrl,
}) => {
  return (
    <div className="flex items-center justify-between p-2 lg:py-3 lg:px-4 bg-white border-b fixed top-0 right-0 left-64">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center ">
        <div className="flex items-center gap-4 lg:gap-8">
          <button
            onClick={onSettingsClick}
            className="text-gray-600 p-2  bg-surface rounded-full"
          >
            <Lucide name="Settings" size={20} className="text-dash_gray" />
          </button>

          <button
            onClick={onNotificationsClick}
            className="text-gray-600 p-2  bg-surface rounded-full"
          >
            <Lucide name="Bell" size={20} className="text-dash_red" />
          </button>

          <Image
            width={36}
            height={36}
            src={userImageUrl}
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};
