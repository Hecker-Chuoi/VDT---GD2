import { Handle, Position } from "reactflow";

interface TopoNodeProps {
  data: {
    icon: string;
    label: string;
  };
}

export default function TopoNode({ data }: TopoNodeProps) {
  return (
    <div className="bg-white rounded-xl shadow border px-4 py-2 flex flex-col items-center min-w-[120px] relative">
      <Handle type="target" position={Position.Top} />
      <div className="mb-2">
        <img src={data.icon} alt="icon" className="w-8 h-8" />
      </div>
      <div className="font-semibold text-slate-700">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
