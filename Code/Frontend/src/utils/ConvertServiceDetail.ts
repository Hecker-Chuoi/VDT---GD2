// src/utils/ConvertServiceDetail.ts
// Chuyển đổi dữ liệu chi tiết service từ backend thành nodes và edges cho React Flow

export function convertServiceDetailToFlow(data: any, connections: any[] = []) {
  const nodes: any[] = [];
  const edges: any[] = [];

  // Service node
  nodes.push({
    id: `service-${data.id}`,
    type: "topoNode",
    data: { icon: "/icons/service.png", label: data.serviceName },
    position: { x: 0, y: 0 },
    sourcePosition: "bottom",
    targetPosition: "top",
    rank: 1,
  });

  // Load balancer nodes
  if (Array.isArray(data.loadBalances)) {
    data.loadBalances.forEach((lb: any) => {
      nodes.push({
        id: `lb-${lb.id}`,
        type: "topoNode",
        data: { icon: "/icons/load_balancer.png", label: lb.lbName },
        position: { x: 0, y: 0 },
        sourcePosition: "bottom",
        targetPosition: "top",
        rank: 2,
      });
      // Edge: service -> load balancer (chỉ nếu isExternal = false)
      if (!lb.isExternal) {
          const edgeId5 = `e-service-${data.id}-lb-${lb.id}`;
          if (!edges.some(e => e.id === edgeId5)) {
            edges.push({
              id: edgeId5,
              source: `service-${data.id}`,
              target: `lb-${lb.id}`
            });
          }
        }
    });
  }

  // Module nodes & server nodes
  if (Array.isArray(data.groupModules)) {
    data.groupModules.forEach((group: any) => {
      // Tạo groupNode cho mỗi groupModule
      nodes.push({
        id: `group-${group.id}`,
        type: "groupNode",
        data: {
          icon: "/icons/group-module.png",
          label: group.groupModuleName,
          nodes: group.modules.map((mod: any) => ({
            icon: "/icons/module.png",
            label: mod.moduleName,
            ...mod,
          })),
        },
        position: { x: 0, y: 0 },
        sourcePosition: "bottom",
        targetPosition: "top",
        rank: 3,
      });

      // Edge: service -> groupNode
      const edgeId1 = `e-service-${data.id}-group-${group.id}`;
      if (!edges.some(e => e.id === edgeId1)) {
        edges.push({
          id: edgeId1,
          source: `service-${data.id}`,
          target: `group-${group.id}`,
          animated: false,
          type: "default",
          style: { stroke: "#999", strokeWidth: 1 },
        });
      }

      // Các logic edge/module/server bên trong group giữ nguyên nếu cần
      group.modules.forEach((mod: any) => {
        // Server node
        if (mod.server) {
          if (!nodes.some(n => n.id === `server-${mod.server.id}`)) {
            nodes.push({
              id: `server-${mod.server.id}`,
              type: "topoNode",
              data: { icon: "/icons/server.png", label: mod.server.serverIp },
              position: { x: 0, y: 0 },
              sourcePosition: "bottom",
              targetPosition: "top",
              rank: 4,
            });
          }
          // Edge: groupNode -> server
          const edgeId2 = `e-group-${group.id}-server-${mod.server.id}`;
          if (!edges.some(e => e.id === edgeId2)) {
            edges.push({
              id: edgeId2,
              source: `group-${group.id}`,
              target: `server-${mod.server.id}`,
              animated: false,
              type: "default",
              style: { stroke: "#999", strokeWidth: 1 },
            });
          }

          // Edge logic cho db/lb giữ nguyên
          if (Array.isArray(connections)) {
            connections.forEach(conn => {
              if (conn.type === 3 && conn.sourceModuleId === mod.id) {
                if (Array.isArray(data.databases)) {
                  data.databases.forEach((db: any) => {
                    if(db === undefined) return;
                    if (
                      db.serverIp && db.port &&
                      db.serverIp === conn.ipDest &&
                      db.port === conn.port
                    ) {
                      const edgeId = `e-server-${mod.server.id}-db-${db.id}`;
                      if (!edges.some(e => e.id === edgeId)) {
                        edges.push({
                          id: edgeId,
                          source: `server-${mod.server.id}`,
                          target: `db-${db.id}`,
                          animated: false,
                          type: "default",
                          style: { stroke: "#22c55e", strokeWidth: 2 },
                        });
                      }
                    }
                  });
                }
              }
              if (conn.type === 2 && conn.sourceModuleId === mod.id) {
                if (Array.isArray(data.loadBalances)) {
                  data.loadBalances.forEach((lb: any) => {
                    if (
                      lb.ip && lb.port &&
                      lb.ip === conn.ipDest &&
                      lb.port === conn.port
                    ) {
                      const edgeId = `e-lb-${lb.id}-group-${group.id}`;
                      if (!edges.some(e => e.id === edgeId)) {
                        edges.push({
                          id: edgeId,
                          source: `lb-${lb.id}`,
                          target: `group-${group.id}`,
                          animated: false,
                          type: "default",
                          style: { stroke: "#22c55e", strokeWidth: 2 },
                        });
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    });
  }

  // Database nodes & storage nodes
  if (Array.isArray(data.databases)) {
    data.databases.forEach((db: any) => {
      if(db !== undefined){
        // Chỉ thêm node database nếu chưa tồn tại
        if (!nodes.some(n => n.id === `db-${db.id}`)) {
            nodes.push({
              id: `db-${db.id}`,
              type: "topoNode",
              data: { icon: "/icons/database.png", label: db.databaseName },
              position: { x: 0, y: 0 },
              sourcePosition: "bottom",
              targetPosition: "top",
              rank: 5,
            });
          }
      // Storage node
      if (db.storage) {
        if (!nodes.some(n => n.id === `storage-${db.storage.id}`)) {
          nodes.push({
            id: `storage-${db.storage.id}`,
            type: "topoNode",
            data: { icon: "/icons/storage.png", label: db.storage.storageName },
            position: { x: 0, y: 0 },
            sourcePosition: "bottom",
            targetPosition: "top",
            rank: 6,
          });
        }
        // Edge: database -> storage
          const edgeId4 = `e-db-${db.id}-storage-${db.storage.id}`;
          if (!edges.some(e => e.id === edgeId4)) {
            edges.push({
              id: edgeId4,
              source: `db-${db.id}`,
              target: `storage-${db.storage.id}`,
              animated: false,
              type: "default",
              style: { stroke: "#999", strokeWidth: 1 },
            });
          }
        }
      }
    });
  }

  // Thêm edge cho các connection type 2 (load balancer) và 3 (database)
  if (Array.isArray(connections)) {
    connections.forEach(conn => {
      if (conn.type === 2) {
        // Edge: service -> external load balancer
        const edgeId6 = `e-conn-lb-${conn.id}`;
        if (!edges.some(e => e.id === edgeId6)) {
          edges.push({
            id: edgeId6,
            source: `service-${data.id}`,
            target: `lb-${conn.id}`,
            animated: false,
            type: "default",
            style: { stroke: "#f59e42", strokeWidth: 2 },
          });
        }

        // Nếu connection có moduleId thì nối từ load balancer đến module
        if (conn.moduleId) {
          const edgeIdLbMod = `e-lb-${conn.id}-module-${conn.moduleId}`;
          if (!edges.some(e => e.id === edgeIdLbMod)) {
            edges.push({
              id: edgeIdLbMod,
              source: `lb-${conn.id}`,
              target: `module-${conn.moduleId}`,
              animated: false,
              type: "default",
              style: { stroke: "#f59e42", strokeWidth: 2 },
            });
          }
        }
      } else if (conn.type === 3) {
        // Edge: server của module -> external database
        // Tìm server node của module
        let serverNodeId = null;
        if (conn.moduleId) {
          // Tìm module
          let foundServerId = null;
          if (Array.isArray(data.groupModules)) {
            for (const group of data.groupModules) {
              for (const mod of group.modules) {
                if (mod.id === conn.moduleId && mod.server) {
                  foundServerId = mod.server.id;
                  break;
                }
              }
              if (foundServerId) break;
            }
          }
          if (foundServerId) {
            serverNodeId = `server-${foundServerId}`;
          }
        }
        // Nếu tìm thấy server thì nối từ server, nếu không thì nối từ service
          const edgeId7 = `e-conn-db-${conn.id}`;
          if (!edges.some(e => e.id === edgeId7)) {
            edges.push({
              id: edgeId7,
              source: serverNodeId || `service-${data.id}`,
              target: `db-${conn.id}`,
              animated: false,
              type: "default",
              style: { stroke: "#38bdf8", strokeWidth: 2 },
            });
          }
      }
    });
  }
  return { nodes, edges };
}
