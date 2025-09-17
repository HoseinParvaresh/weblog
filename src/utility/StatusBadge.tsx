import { MdAccessTime, MdCheckCircleOutline, MdErrorOutline } from "react-icons/md";
import { IconType } from "react-icons";

type Status = "pending" | "approved" | "rejected";

interface StatusInfo {
  icon: IconType;
  color: string;
  label: string;
}

const statusMap: Record<Status, StatusInfo> = {
  pending: {
    icon: MdAccessTime,
    color: "#FFC107",
    label: "pending",
  },
  approved: {
    icon: MdCheckCircleOutline,
    color: "#4CAF50",
    label: "approved",
  },
  rejected: {
    icon: MdErrorOutline,
    color: "#F44336",
    label: "rejected",
  },
};

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusInfo = statusMap[status];

  if (!statusInfo) return null;

  const Icon = statusInfo.icon;

  return (
    <div
      style={{ color: statusInfo.color }}
      className="flex items-center gap-1"
    >
      <span className="font-danaBold">{statusInfo.label}</span>
      <Icon className="size-4.5" />
    </div>
  );
}