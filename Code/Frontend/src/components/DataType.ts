// Root response
export interface ApiResponse <T> {
  statusCode: number;
  message: string;
  result: T;
}

// Service object
export interface ServiceResult {
  id: number;
  serviceCode: string;
  serviceName: string;
  groupModules: GroupModule[];
  loadBalances: LoadBalance[];
  servers: Server[];
  databases: Database[];
  storages: Storage[];
  edges: Edge[];
}

// Group of modules
export interface GroupModule {
  id: number;
  groupModuleCode: string;
  groupModuleName: string;
  modules: Module[];
}

// Module
export interface Module {
  id: number;
  moduleCode: string;
  moduleName: string;
}

// Load balancer
export interface LoadBalance {
  id: number;
  lbCode: string;
  lbName: string;
  ip: string;
  port: number;
}

// Server
export interface Server {
  id: number;
  serverIp: string;
}

// Database
export interface Database {
  id: number;
  databaseCode: string;
  databaseName: string;
  serverIp: string;
}

// Storage
export interface Storage {
  id: number;
  storageName: string;
  storageCode: string;
}

// Edge
export interface Edge {
  id: string;
  sourceId: string;
  targetId: string;
  enable: boolean;
}
