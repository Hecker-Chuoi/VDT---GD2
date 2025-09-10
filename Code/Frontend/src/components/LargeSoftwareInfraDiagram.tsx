import React from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  MiniMap,
} from "reactflow";

// Số lượng node và tầng
const NODE_COUNT = 1000;
const LAYER_COUNT = 6;
const canvasWidth = 5000;
const canvasHeight = 2000;
const minSpacing = 40;

// Tên các tầng
const layerNames = [
  "Service",
  "Load balancer",
  "Module",
  "Server",
  "Database",
  "Storage",
];

// Màu các tầng
const layerColors = [
  "#fecaca",
  "#fef9c3",
  "#bbf7d0",
  "#fde68a",
  "#e0e7ff",
  "#f0fdfa",
];

// Chia đều node cho các tầng
const nodesPerLayer = Array(LAYER_COUNT).fill(
  Math.floor(NODE_COUNT / LAYER_COUNT)
);
for (let i = 0; i < NODE_COUNT % LAYER_COUNT; i++) nodesPerLayer[i]++;

// Tạo node cho từng tầng
const nodes: Node[] = [];
let nodeIdx = 0;
for (let layer = 0; layer < LAYER_COUNT; layer++) {
  const y = 100 + layer * ((canvasHeight - 200) / (LAYER_COUNT - 1));
  const count = nodesPerLayer[layer];
  for (let i = 0; i < count; i++) {
    const x = 100 + i * ((canvasWidth - 200) / (count - 1));
    nodes.push({
      id: `node-${nodeIdx}`,
      data: { label: `${layerNames[layer]} ${i + 1}` },
      position: { x, y },
      style: {
        background: layerColors[layer],
        borderRadius: 8,
        border: "2px solid #888",
      },
      type: undefined,
    });
    nodeIdx++;
  }
}

// Tạo edge ngẫu nhiên giữa các tầng liền kề
const edges: Edge[] = [];
let idx = 0;
for (let layer = 0; layer < LAYER_COUNT - 1; layer++) {
  const fromStart = nodes.slice(idx, idx + nodesPerLayer[layer]);
  const toStart = nodes.slice(
    idx + nodesPerLayer[layer],
    idx + nodesPerLayer[layer] + nodesPerLayer[layer + 1]
  );
  for (let i = 0; i < fromStart.length; i++) {
    // Mỗi node nối tới 1-3 node ở tầng tiếp theo
    const targets = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => {
        const targetNode = toStart[Math.floor(Math.random() * toStart.length)];
        return targetNode ? targetNode.id : undefined;
      }
    ).filter(Boolean);
    targets.forEach((targetId) => {
      edges.push({
        id: `edge-${layer}-${i}-${targetId}`,
        source: fromStart[i].id,
        target: targetId as string,
      });
    });
  }
  idx += nodesPerLayer[layer];
}

export default function LargeSoftwareInfraDiagram() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="w-full flex justify-center">
        <div
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
          style={{ width: canvasWidth, height: canvasHeight, marginTop: 24 }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            panOnDrag={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            style={{
              width: canvasWidth,
              height: canvasHeight,
              background: "#fff",
            }}
          >
            <Background color="#e5e7eb" gap={18} />
            <Controls showInteractive={true} />
            <MiniMap
              nodeColor={(n) => {
                const layerIndex = Number(n.id.split("-")[1]);
                return layerColors[layerIndex];
              }}
              style={{
                background: "#fff",
                border: "1px solid #eee",
              }}
            />
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 bg-white rounded-xl p-8 border border-slate-200 w-fit">
              {layerNames.map((l, i) => (
                <div key={l} className="flex items-center gap-3">
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: layerColors[i],
                      border: "2px solid #888",
                    }}
                  ></div>
                  <span className="text-base font-semibold text-slate-700">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
