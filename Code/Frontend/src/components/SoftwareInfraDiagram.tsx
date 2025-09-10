import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodes as initialNodes, edges as initialEdges } from "./MockData";
import TopoNode from "./nodes/TopoNode";
import { getLayoutedElements } from "../utils/LayoutElements";
import NodeInfoPopup from "./NodeInfoPopup";

const nodeTypes = {
  topoNode: TopoNode,
};

const legend = [
  { label: "Service", icon: "/icons/service.png" },
  {
    label: "Load balancer",
    icon: "/icons/load_balancer.png",
  },
  { label: "Module", icon: "/icons/module.png" },
  { label: "Server", icon: "/icons/server.png" },
  {
    label: "Database",
    icon: "/icons/database.png",
  },
  { label: "Storage", icon: "/icons/storage.png" },
  { label: "Edge", icon: "/icons/edge.png" },
  {
    label: "Selected edge",
    icon: "/icons/selected-edge.png",
  },
];

export default function SoftwareInfraDiagram() {
  const [showMinimap, setShowMinimap] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [contextNode, setContextNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sidebarWidth, setSidebarWidth] = useState(window.innerWidth / 4);
  const minSidebar = 200;
  const maxSidebar = window.innerWidth / 3;

  // Xử lý resize sidebar
  const handleSidebarResize = (e) => {
    e.preventDefault();
    document.body.style.cursor = "col-resize";
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    const onMouseMove = (moveEvent) => {
      let newWidth = startWidth + (moveEvent.clientX - startX);
      newWidth = Math.max(minSidebar, Math.min(maxSidebar, newWidth));
      setSidebarWidth(newWidth);
    };
    const onMouseUp = () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleNodeClick = (event, node) => {
    console.log("Node clicked:", node);

    setEdges((eds) =>
      eds.map((e) => {
        const isConnected = e.source === node.id || e.target === node.id;
        return {
          ...e,
          animated: isConnected,
          style: {
            stroke: isConnected ? "blue" : "#999",
            strokeWidth: isConnected ? 3 : 1,
          },
        };
      })
    );
  };

  const handleNodeContextMenu = (event, node) => {
    event.preventDefault();
    setContextNode(node);
    setContextMenuPos({ x: event.clientX, y: event.clientY });
    setShowContextMenu(true);
  };

  useEffect(() => {
    const { nodes, edges } = getLayoutedElements(
      initialNodes,
      initialEdges,
      "TB"
    );
    setNodes(nodes);
    setEdges(edges);
  }, []);

  return (
    <div className="w-full h-full flex" style={{ minHeight: "80vh" }}>
      {/* Sidebar */}
      <div
        className="relative bg-slate-100 border-r border-slate-300"
        style={{
          width: sidebarWidth,
          minWidth: minSidebar,
          maxWidth: maxSidebar,
        }}
      >
        {/* Thanh resize */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 8,
            height: "100%",
            cursor: "col-resize",
            zIndex: 50,
          }}
          onMouseDown={handleSidebarResize}
        ></div>

        {/* Thông tin service và mock cảnh báo */}
        <div className="p-6">
          <div className="mb-6">
            <div className="text-xl font-bold mb-2">
              Enterprise MPLS Connection - Branch Office Alpha
            </div>
            <div className="text-sm text-slate-600 mb-1">
              Service Code: <span className="font-mono">MPLS-001</span>
            </div>
            <div className="text-sm text-slate-600 mb-1">
              ID: <span className="font-mono">SVC-001</span>
            </div>
            <div className="inline-block px-3 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
              Normal
            </div>
          </div>
          <div className="mb-2 text-base font-semibold">
            Danh sách cảnh báo:
          </div>
          <ul className="space-y-4">
            {[
              {
                level: "warning",
                title: "Tải cao ở Server 2",
                description:
                  "Server 2 đang có lượng truy cập lớn hơn bình thường.",
              },
              {
                level: "error",
                title: "Kết nối thất bại ở db_user1",
                description: "db_user1 không thể kết nối tới database.",
              },
              {
                level: "normal",
                title: "Tất cả các node khác hoạt động bình thường",
                description: "Không có cảnh báo nào khác.",
              },
            ].map((alert, idx) => (
              <li
                key={idx}
                className={`rounded px-3 py-2 ${
                  alert.level === "normal"
                    ? "bg-green-100 text-green-700"
                    : alert.level === "warning"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <div className="font-bold">{alert.title}</div>
                <div className="text-xs italic">Mức độ: {alert.level}</div>
                <div className="text-sm mt-1">{alert.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Main topo area */}
      <div className="flex-1 flex justify-center h-full">
        <div
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 relative w-full h-full"
          style={{ width: 1300, height: 738, margin: 5 }}
        >
          <ReactFlow
            fitView
            fitViewOptions={{ padding: 0.5 }}
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            onNodeContextMenu={handleNodeContextMenu}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            panOnDrag={true}
            panOnScroll={true}
            nodeTypes={nodeTypes}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            // style={{ width: 2100, height: 700, background: "#fff" }}
          >
            {showMinimap && (
              <MiniMap
                style={{
                  width: 250,
                  height: 150,
                  background: "#fff",
                  border: "1px solid #eee",
                }}
              />
            )}
            <Background color="#e5e7eb" gap={18} />
            <Controls />

            {/* Button group bottom center */}
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 z-20 flex gap-4">
              <button
                className="bg-white border border-slate-300 rounded-lg px-3 py-1 shadow hover:bg-slate-50"
                onClick={() => setShowLegend((v) => !v)}
              >
                {showLegend ? "Hide legend" : "Show legend"}
              </button>
              <button
                className="bg-white border border-slate-300 rounded-lg px-3 py-1 shadow hover:bg-slate-50"
                onClick={() => setShowMinimap((v) => !v)}
              >
                {showMinimap ? "Hide minimap" : "Show minimap"}
              </button>
            </div>

            {/* Legend */}
            {showLegend && (
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 mt-0 grid grid-cols-2 md:grid-cols-3 gap-6 bg-white rounded-xl border border-slate-200 shadow"
                style={{
                  width: 250,
                  height: 250,
                  padding: 16,
                  overflowY: "auto",
                }}
              >
                {legend.map((l) => (
                  <div key={l.label} className="flex items-center gap-3">
                    <img
                      src={l.icon}
                      alt={l.label}
                      style={{
                        width: 32,
                        height: 32,
                        objectFit: "contain",
                      }}
                    />
                    <span className="text-base font-semibold text-slate-700">
                      {l.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </ReactFlow>
          {/* Hiển thị context menu khi click chuột phải vào node */}
          {showContextMenu && contextNode && (
            <NodeInfoPopup
              node={contextNode}
              position={contextMenuPos}
              onClose={() => setShowContextMenu(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
