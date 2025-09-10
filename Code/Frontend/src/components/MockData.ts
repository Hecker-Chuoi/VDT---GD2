// Sample data based on the provided image
const infraData = {
  service: [{ id: "svc1", name: "Ecommerce" }],
  loadBalancers: [
    { id: "lb1", name: "Load balancer 1" },
    { id: "lb2", name: "Load balancer 2" },
  ],
  modules: [
    { id: "ui", name: "UI" },
    { id: "api", name: "API Gateway" },
    { id: "user1", name: "User service 1" },
    { id: "user2", name: "User service 2" },
    { id: "user3", name: "User service 3" },
    { id: "catalog", name: "Product catalog service" },
    { id: "inventory", name: "Inventory service" },
    { id: "cart", name: "Cart service" },
    { id: "order", name: "Order service" },
    { id: "payment", name: "Payment service" },
    { id: "shipping1", name: "Shipping service1" },
    { id: "shipping2", name: "Shipping service2" },
  ],
  servers: [
    { id: "srv1", name: "Server 1 (Vercel)" },
    { id: "srv2", name: "Server 2" },
    { id: "srv3", name: "Server 3" },
    { id: "srv4", name: "Server 4" },
    { id: "srv5", name: "Server 5" },
  ],
  databases: [
    { id: "db_user1", name: "db_user1" },
    { id: "db_product", name: "db_product" },
    { id: "db_inventory", name: "db_inventory" },
    { id: "db_user2", name: "db_user2" },
    { id: "db_cart", name: "db_cart" },
    { id: "db_user3", name: "db_user3" },
    { id: "db_order", name: "db_order" },
    { id: "db_shipment1", name: "db_shipment1" },
    { id: "db_shipment2", name: "db_shipment2" },
    { id: "db_payment", name: "db_payment" },
  ],
  storage: [
    { id: "storage1", name: "Storage 1" },
    { id: "storage2", name: "Storage 2" },
  ],
};

const layerColors = {
  service: "#fecaca",
  loadBalancer: "#fef9c3",
  module: "#bbf7d0",
  server: "#fde68a",
  database: "#e0e7ff",
  storage: "#f0fdfa",
};

// Increased vertical spacing
const layers = [
  { key: "service", rank: 1, icon: "/icons/service.png", label: "Service", items: infraData.service },
  { key: "loadBalancer", rank: 2, icon: "/icons/load_balancer.png", label: "Load Balancer", items: infraData.loadBalancers },
  { key: "module", rank: 3, icon: "/icons/module.png", label: "Module", items: infraData.modules },
  { key: "server", rank: 4, icon: "/icons/server.png", label: "Server", items: infraData.servers },
  { key: "database", rank: 5, icon: "/icons/database.png", label: "Database", items: infraData.databases },
  { key: "storage", rank: 6, icon: "/icons/storage.png", label: "Storage", items: infraData.storage },
];
const position = { x: 0, y: 0 };

const nodes = layers.flatMap((layer, layerIdx) => {
  return layer.items.map((item, itemIdx) => ({
    id: `${layer.key}-${item.id}`,
    type: "topoNode",
    data: { icon: layer.icon, label: item.name },
    rank: layer.rank,
    position,
    sourcePosition: "bottom",
    targetPosition: "top",
  }));
});

const connections = [
  // Service to load balancer
  { from: { layer: 0, idx: 0 }, to: { layer: 1, idx: 0 } },
  // { from: { layer: 0, idx: 0 }, to: { layer: 1, idx: 1 } },
  // Service to modules
  ...infraData.modules.map((_, i) => ({
    from: { layer: 0, idx: 0 },
    to: { layer: 2, idx: i },
  })),
  // Load balancer to modules
  { from: { layer: 1, idx: 0 }, to: { layer: 2, idx: 2 } },
  { from: { layer: 1, idx: 0 }, to: { layer: 2, idx: 3 } },
  { from: { layer: 1, idx: 0 }, to: { layer: 2, idx: 4 } },
  { from: { layer: 1, idx: 1 }, to: { layer: 2, idx: 10 } },
  { from: { layer: 1, idx: 1 }, to: { layer: 2, idx: 11 } },
  // Module to server
  { from: { layer: 2, idx: 0 }, to: { layer: 3, idx: 0 } },
  { from: { layer: 2, idx: 1 }, to: { layer: 3, idx: 1 } },
  { from: { layer: 2, idx: 2 }, to: { layer: 3, idx: 1 } },
  { from: { layer: 2, idx: 3 }, to: { layer: 3, idx: 2 } },
  { from: { layer: 2, idx: 4 }, to: { layer: 3, idx: 2 } },
  { from: { layer: 2, idx: 5 }, to: { layer: 3, idx: 2 } },
  { from: { layer: 2, idx: 6 }, to: { layer: 3, idx: 3 } },
  { from: { layer: 2, idx: 7 }, to: { layer: 3, idx: 3 } },
  { from: { layer: 2, idx: 8 }, to: { layer: 3, idx: 3 } },
  { from: { layer: 2, idx: 9 }, to: { layer: 3, idx: 3 } },
  { from: { layer: 2, idx: 10 }, to: { layer: 3, idx: 4 } },
  { from: { layer: 2, idx: 11 }, to: { layer: 3, idx: 4 } },
  // Server to database
  { from: { layer: 3, idx: 1 }, to: { layer: 4, idx: 0 } },
  { from: { layer: 3, idx: 1 }, to: { layer: 4, idx: 1 } },
  { from: { layer: 3, idx: 2 }, to: { layer: 4, idx: 2 } },
  { from: { layer: 3, idx: 2 }, to: { layer: 4, idx: 3 } },
  { from: { layer: 3, idx: 2 }, to: { layer: 4, idx: 4 } },
  { from: { layer: 3, idx: 3 }, to: { layer: 4, idx: 5 } },
  { from: { layer: 3, idx: 3 }, to: { layer: 4, idx: 6 } },
  { from: { layer: 3, idx: 3 }, to: { layer: 4, idx: 7 } },
  { from: { layer: 3, idx: 4 }, to: { layer: 4, idx: 8 } },
  { from: { layer: 3, idx: 4 }, to: { layer: 4, idx: 9 } },
  // Database to storage (simulate)
  { from: { layer: 4, idx: 0 }, to: { layer: 5, idx: 0 } },
  { from: { layer: 4, idx: 1 }, to: { layer: 5, idx: 0 } },
  { from: { layer: 4, idx: 8 }, to: { layer: 5, idx: 1 } },
  { from: { layer: 4, idx: 9 }, to: { layer: 5, idx: 1 } },
];

const edges = connections.map((conn, i) => {
  const fromLayer = layers[conn.from.layer];
  const toLayer = layers[conn.to.layer];
  const fromItem = fromLayer.items[conn.from.idx];
  const toItem = toLayer.items[conn.to.idx];

  return {
    id: `e-${fromLayer.key}-${fromItem.id}-${toLayer.key}-${toItem.id}`,
    source: `${fromLayer.key}-${fromItem.id}`,
    target: `${toLayer.key}-${toItem.id}`,
    animated: false,
    type: "default",
    style: { stroke: '#999', strokeWidth: 1 },
  };
});
  
export { infraData, nodes, edges, layerColors };