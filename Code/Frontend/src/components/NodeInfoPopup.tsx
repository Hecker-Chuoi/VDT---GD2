export default function NodeInfoPopup({ node, position, onClose }) {
  if (!node) return null;
  // Mock danh sách cảnh báo
  const mockAlerts = node.data?.alerts || [
    {
      level: "warning",
      title: "Tải cao",
      description: "Node đang có lượng truy cập lớn hơn bình thường.",
    },
    {
      level: "error",
      title: "Kết nối thất bại",
      description: "Node không thể kết nối tới database.",
    },
  ];
  const levelColor = {
    normal: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };
  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 4px 16px #0002",
        minWidth: 260,
        padding: 16,
        maxWidth: 340,
      }}
      onClick={onClose}
    >
      <div className="font-bold text-lg mb-2">{node.data?.label}</div>
      <div className="mb-2">ID: {node.id}</div>
      <div className="mb-2 font-semibold">Danh sách cảnh báo:</div>
      <ul className="space-y-2">
        {mockAlerts.map((alert, idx) => (
          <li
            key={idx}
            className={`rounded px-3 py-2 ${levelColor[alert.level]}`}
          >
            <div className="font-bold">{alert.title}</div>
            <div className="text-xs italic">Mức độ: {alert.level}</div>
            <div className="text-sm mt-1">{alert.description}</div>
          </li>
        ))}
      </ul>
      <button className="mt-4 px-3 py-1 bg-slate-100 rounded" onClick={onClose}>
        Đóng
      </button>
    </div>
  );
}
