// src/utils/ConvertServiceDetail.ts
// Chuyển đổi dữ liệu chi tiết service từ backend thành nodes và edges cho React Flow

import { LoadBalance, ServiceResult } from "../components/DataType";

const node = {
  type: "topoNode",
  position: { x: 0, y: 0 },
  sourcePosition: "bottom",
  targetPosition: "top",
}

export function convertServiceDetailToFlow(data: ServiceResult) {
  const nodes: any[] = [];

  // Service node
  nodes.push({...node,
    id: data.id,
    data: { icon: "/icons/service.png", label: data.serviceName },
    rank: 1,
  });

  // Load balancer nodes
  data.loadBalances.forEach(lb => {
    nodes.push({...node,
      id: lb.id,
      data: { icon: "/icons/load_balancer.png", label: lb.lbName },
      rank: 2,
    });
  });

  // group modules
  data.groupModules.forEach(group => {
    nodes.push({...node,
      id: group.id,
      type: "groupNode",
      data: { 
        icon: "/icons/group-module.png", 
        label: group.groupModuleName ,
        nodes: group.modules.map(m => {
          return {...node,
            id: m.id,
            data: { icon: "/icons/module.png", label: m.moduleName },
            rank: 3,
          }
        })
      },
      rank: 3,
    })
  });

  data.servers.forEach(server => {
    nodes.push({...node,
      id: server.id,
      data:{
        icon: "/icons/server.png", 
        label: server.serverIp,
      },
      rank: 4,
    })
  });

  data.databases.forEach(db => {
    nodes.push({...node,
      id: db.id,
      data:{
        icon: "/icons/database.png", 
        label: db.databaseName,
      },
      rank: 5,
    })
  });

  data.storages.forEach(storage => {
    nodes.push({...node,
      id: storage.id,
      data:{
        icon: "/icons/storage.png", 
        label: storage.storageName,
      },
      rank: 6,
    })
  });

  const edges = data.edges.map(edge => {
    return {
      id: edge.id,
      source: edge.sourceId,
      target: edge.targetId,
      animated: false,
      type: "default",
      style: { stroke: "#999", strokeWidth: 1 },
    }
  });

  return { nodes, edges };
}
