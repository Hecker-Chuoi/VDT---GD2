import { Handle, Position } from "reactflow";

interface TopoNodeProps {
  data: {
    icon: string;
    label: string;
  };
}

export default function TopoNode({ data }: TopoNodeProps) {
  return (
    <div
      className="flex flex-col items-center min-w-[40px] relative"
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="mb-2">
        <img src={data.icon} alt="icon" className="w-20 h-20" />
      </div>
      <div className="font-semibold text-slate-700">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
