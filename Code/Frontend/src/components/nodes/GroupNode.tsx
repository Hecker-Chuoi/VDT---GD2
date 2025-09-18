import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import TopoNode from "./TopoNode";

interface GroupNodeProps {
  data: {
    icon: string;
    label: string;
    expanded?: boolean;
    nodes: any[];
    onExpand?: () => void;
    onCollapse?: () => void;
  };
}

export default function GroupNode({ data }: GroupNodeProps) {
  const [expanded, setExpanded] = useState(data.expanded || false);
  const [hover, setHover] = useState(false);
  const [hoverBorder, setHoverBorder] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => {
      const next = !prev;
      if (next) data.onExpand();
      if (!next) data.onCollapse();
      return next;
    });
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        minWidth: 80,
        textAlign: "center",
        background: "transparent",
        border: "none",
        borderRadius: 8,
        padding: expanded ? 10 : 6,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Collapse: chỉ hiển thị icon group và label dưới border */}
      {!expanded && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 48,
            }}
          >
            <img
              src="/icons/group-module.png"
              alt="group"
              style={{ width: 80, height: 80 }}
            />
            {hover && (
              <button
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  border: "none",
                  background: "#eee",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  cursor: "pointer",
                  zIndex: 2,
                }}
                onClick={handleToggle}
              >
                +
              </button>
            )}
          </div>
          <div style={{ marginTop: 4, fontWeight: 500, color: "#333" }}>
            {data.label}
          </div>
        </>
      )}

      {/* Expanded: show group nodes inside dashed border */}
      {expanded && (
        <div
          style={{
            border: "2px dashed #38bdf8",
            borderRadius: 12,
            marginTop: 12,
            padding: 12,
            position: "relative",
            background: "transparent",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={() => setHoverBorder(true)}
          onMouseLeave={() => setHoverBorder(false)}
        >
          {/* Dấu trừ khi hover border */}
          {hoverBorder && (
            <button
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                border: "none",
                background: "#eee",
                borderRadius: "50%",
                width: 24,
                height: 24,
                cursor: "pointer",
                zIndex: 2,
              }}
              onClick={handleToggle}
            >
              -
            </button>
          )}
          {/* Hiển thị các node bên trong group */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Array.isArray(data.nodes) && data.nodes.length > 0 ? (
              data.nodes.map((node, idx) => (
                <React.Fragment key={node.id || idx}>
                  <TopoNode data={node} />
                </React.Fragment>
              ))
            ) : (
              <div
                style={{ color: "#888", textAlign: "center", width: "100%" }}
              >
                Không có node nào trong group
              </div>
            )}
          </div>
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
