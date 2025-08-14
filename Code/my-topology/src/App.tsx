import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "ui", position: { x: 0, y: 0 }, data: { label: "UI" } },
  { id: "gw", position: { x: 200, y: 0 }, data: { label: "API Gateway" } },
  { id: "svcA", position: { x: 400, y: 0 }, data: { label: "Service A" } },
  { id: "svcB", position: { x: 400, y: 100 }, data: { label: "Service B" } },
];

const initialEdges = [
  { id: "e1-2", source: "ui", target: "gw", type: "default" },
  { id: "e2-3", source: "gw", target: "svcA", type: "straight" },
  { id: "e2-4", source: "gw", target: "svcB", type: "straight" },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Hàm thêm node mới
  const addNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `New Node ${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <button
        style={{ position: "absolute", zIndex: 10, left: 10, top: 10 }}
        onClick={addNode}
      >
        Add Node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
