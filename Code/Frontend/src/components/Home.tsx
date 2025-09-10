import { useState } from "react";
import { infraData } from "./MockData";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Separator } from "./ui/separator";
import SoftwareInfraDiagram from "./SoftwareInfraDiagram";
import {
  Shield,
  Users,
  Activity,
  Settings,
  Copy,
  Download,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Network,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Service {
  id: string;
  serviceCode: string;
  serviceName: string;
  status: "active" | "inactive" | "maintenance";
  nodes: number;
  lastUpdated: string;
}

interface HomeProps {
  onLogout: () => void;
  waitlist: string[];
}

export function Home({ onLogout, waitlist }: HomeProps) {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loginTime");
    onLogout();
  };

  const copyEmailsToClipboard = () => {
    const emailList = waitlist.join("\n");
    navigator.clipboard.writeText(emailList).then(() => {
      // Could add a toast notification here
    });
  };

  // Mock services data - expanded to 25 services for pagination demonstration
  const allServices: Service[] = [
    {
      id: "SVC-001",
      serviceCode: "MPLS-001",
      serviceName: "Enterprise MPLS Connection - Branch Office Alpha",
      status: "active",
      nodes: 12,
      lastUpdated: "2024-01-15 14:30",
    },
    {
      id: "SVC-002",
      serviceCode: "INET-202",
      serviceName: "Internet Gateway Service - Data Center Primary",
      status: "active",
      nodes: 8,
      lastUpdated: "2024-01-15 14:28",
    },
    {
      id: "SVC-003",
      serviceCode: "VPN-015",
      serviceName: "Site-to-Site VPN - Remote Locations",
      status: "maintenance",
      nodes: 6,
      lastUpdated: "2024-01-15 13:45",
    },
    {
      id: "SVC-004",
      serviceCode: "MPLS-002",
      serviceName: "Enterprise MPLS Connection - Branch Office Beta",
      status: "active",
      nodes: 10,
      lastUpdated: "2024-01-15 14:32",
    },
    {
      id: "SVC-005",
      serviceCode: "INET-203",
      serviceName: "Internet Gateway Service - Backup Route",
      status: "inactive",
      nodes: 4,
      lastUpdated: "2024-01-15 12:15",
    },
    {
      id: "SVC-006",
      serviceCode: "DDOS-001",
      serviceName: "DDoS Protection Service - Main Infrastructure",
      status: "active",
      nodes: 15,
      lastUpdated: "2024-01-15 14:35",
    },
    {
      id: "SVC-007",
      serviceCode: "MPLS-003",
      serviceName: "Enterprise MPLS Connection - Branch Office Gamma",
      status: "active",
      nodes: 9,
      lastUpdated: "2024-01-15 14:25",
    },
    {
      id: "SVC-008",
      serviceCode: "VPN-016",
      serviceName: "Client Access VPN - Remote Workers",
      status: "active",
      nodes: 14,
      lastUpdated: "2024-01-15 14:20",
    },
    {
      id: "SVC-009",
      serviceCode: "INET-204",
      serviceName: "Internet Gateway Service - Secondary Route",
      status: "active",
      nodes: 6,
      lastUpdated: "2024-01-15 14:18",
    },
    {
      id: "SVC-010",
      serviceCode: "LAN-001",
      serviceName: "Local Area Network - Headquarters",
      status: "active",
      nodes: 18,
      lastUpdated: "2024-01-15 14:15",
    },
    {
      id: "SVC-011",
      serviceCode: "WAN-001",
      serviceName: "Wide Area Network - Multi-Site Connection",
      status: "active",
      nodes: 22,
      lastUpdated: "2024-01-15 14:10",
    },
    {
      id: "SVC-012",
      serviceCode: "MPLS-004",
      serviceName: "Enterprise MPLS Connection - Branch Office Delta",
      status: "maintenance",
      nodes: 7,
      lastUpdated: "2024-01-15 13:55",
    },
    {
      id: "SVC-013",
      serviceCode: "VPN-017",
      serviceName: "Site-to-Site VPN - International Offices",
      status: "active",
      nodes: 11,
      lastUpdated: "2024-01-15 14:05",
    },
    {
      id: "SVC-014",
      serviceCode: "INET-205",
      serviceName: "Internet Gateway Service - Disaster Recovery",
      status: "inactive",
      nodes: 3,
      lastUpdated: "2024-01-15 11:30",
    },
    {
      id: "SVC-015",
      serviceCode: "DDOS-002",
      serviceName: "DDoS Protection Service - Edge Infrastructure",
      status: "active",
      nodes: 12,
      lastUpdated: "2024-01-15 14:00",
    },
    {
      id: "SVC-016",
      serviceCode: "MPLS-005",
      serviceName: "Enterprise MPLS Connection - Regional Hub",
      status: "active",
      nodes: 16,
      lastUpdated: "2024-01-15 13:58",
    },
    {
      id: "SVC-017",
      serviceCode: "VPN-018",
      serviceName: "Mobile VPN Access - Field Operations",
      status: "active",
      nodes: 8,
      lastUpdated: "2024-01-15 13:50",
    },
    {
      id: "SVC-018",
      serviceCode: "LAN-002",
      serviceName: "Local Area Network - Manufacturing Plant",
      status: "active",
      nodes: 20,
      lastUpdated: "2024-01-15 13:45",
    },
    {
      id: "SVC-019",
      serviceCode: "INET-206",
      serviceName: "Internet Gateway Service - Load Balanced",
      status: "active",
      nodes: 10,
      lastUpdated: "2024-01-15 13:40",
    },
    {
      id: "SVC-020",
      serviceCode: "WAN-002",
      serviceName: "Wide Area Network - Backup Connection",
      status: "maintenance",
      nodes: 5,
      lastUpdated: "2024-01-15 12:30",
    },
    {
      id: "SVC-021",
      serviceCode: "MPLS-006",
      serviceName: "Enterprise MPLS Connection - Distribution Center",
      status: "active",
      nodes: 13,
      lastUpdated: "2024-01-15 13:35",
    },
    {
      id: "SVC-022",
      serviceCode: "VPN-019",
      serviceName: "Partner Network VPN - B2B Connections",
      status: "active",
      nodes: 9,
      lastUpdated: "2024-01-15 13:30",
    },
    {
      id: "SVC-023",
      serviceCode: "DDOS-003",
      serviceName: "DDoS Protection Service - Cloud Infrastructure",
      status: "active",
      nodes: 17,
      lastUpdated: "2024-01-15 13:25",
    },
    {
      id: "SVC-024",
      serviceCode: "LAN-003",
      serviceName: "Local Area Network - Research Facility",
      status: "active",
      nodes: 11,
      lastUpdated: "2024-01-15 13:20",
    },
    {
      id: "SVC-025",
      serviceCode: "INET-207",
      serviceName: "Internet Gateway Service - High Availability",
      status: "active",
      nodes: 14,
      lastUpdated: "2024-01-15 13:15",
    },
  ];

  // Mock data for dashboard metrics
  const metrics = {
    totalNodes: 30,
    activeAgents: 8,
    detectedThreats: 2,
    networkHealth: 98,
    totalServices: allServices.length,
    activeServices: allServices.filter((s) => s.status === "active").length,
  };

  // Calculate pagination
  const totalPages = Math.ceil(allServices.length / servicesPerPage);
  const startIndex = (currentPage - 1) * servicesPerPage;
  const endIndex = startIndex + servicesPerPage;
  const services = allServices.slice(startIndex, endIndex);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleBackToDashboard = () => {
    setSelectedService(null);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Custom status badge for Normal, Warning, Error
  const getStatusBadge = (status: Service["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Normal
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Warning
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Error
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // If a service is selected, show the service topology view
  if (selectedService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Service Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-900">
                      {selectedService.serviceName}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Service Code: {selectedService.serviceCode}</span>
                      <span>•</span>
                      <span>ID: {selectedService.id}</span>
                      <span>•</span>
                      <span>{selectedService.nodes} nodes</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(selectedService.status)}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Topology Content */}
        <div className="w-full h-full">
          <SoftwareInfraDiagram />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Enhanced Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">
                    Software infrastructure topology
                  </h1>
                  <p className="text-sm text-slate-500"></p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 border-emerald-200"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Admin Access
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              {waitlist.length > 0 && (
                <Dialog open={showWaitlist} onOpenChange={setShowWaitlist}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Users className="w-4 h-4" />
                      Waitlist ({waitlist.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Access Waitlist
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          {waitlist.length} pending access request
                          {waitlist.length !== 1 ? "s" : ""}
                        </p>
                        {waitlist.length > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={copyEmailsToClipboard}
                            className="gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copy All
                          </Button>
                        )}
                      </div>

                      <ScrollArea className="h-[300px] w-full border rounded-lg p-3">
                        {waitlist.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">
                            No pending requests
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {waitlist.map((email, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                              >
                                <span className="font-mono text-sm">
                                  {email}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  #{index + 1}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>

                      <Button
                        onClick={() => setShowWaitlist(false)}
                        className="w-full"
                      >
                        Close
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            // Reset pagination when switching to services tab
            if (value === "services") {
              setCurrentPage(1);
            }
          }}
          className="space-y-6"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1100px",
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingBottom: "0px",
          }}
        >
          <TabsList className="grid w-full grid-cols-2 max-w-lg">
            <TabsTrigger value="services" className="gap-2">
              <Network className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Services
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Click on any service to view its topology.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, allServices.length)} of{" "}
                    {allServices.length} services
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto w-full flex justify-center pb-2 px-2">
                  <Table className="min-w-[900px] w-full max-w-4xl mx-auto text-center">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24 text-center">ID</TableHead>
                        <TableHead className="w-32 text-center">
                          Service Code
                        </TableHead>
                        <TableHead className="w-64 text-center">
                          Service Name
                        </TableHead>
                        <TableHead className="w-24 text-center">
                          Status
                        </TableHead>
                        <TableHead className="w-28 text-center">
                          Load Balancer
                        </TableHead>
                        <TableHead className="w-28 text-center">
                          Module
                        </TableHead>
                        <TableHead className="w-28 text-center">
                          Server
                        </TableHead>
                        <TableHead className="w-28 text-center">
                          Database
                        </TableHead>
                        <TableHead className="w-28 text-center">
                          Storage
                        </TableHead>
                        <TableHead className="w-40 text-center">
                          Last Updated
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow
                          key={service.id}
                          className="group cursor-pointer hover:bg-slate-50 transition-all duration-200 hover:shadow-sm"
                          onClick={() => handleServiceClick(service)}
                        >
                          <TableCell className="font-mono text-sm font-medium text-center">
                            {service.id}
                          </TableCell>
                          <TableCell className="text-left">
                            <div className="flex items-center gap-2 justify-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="font-medium">
                                {service.serviceCode}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs text-left">
                            <div
                              className="truncate font-medium"
                              title={service.serviceName}
                            >
                              {service.serviceName}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(service.status)}
                          </TableCell>
                          <TableCell className="text-center">
                            {infraData.loadBalancers.length}
                          </TableCell>
                          <TableCell className="text-center">
                            {infraData.modules.length}
                          </TableCell>
                          <TableCell className="text-center">
                            {infraData.servers.length}
                          </TableCell>
                          <TableCell className="text-center">
                            {infraData.databases.length}
                          </TableCell>
                          <TableCell className="text-center">
                            {infraData.storage.length}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground text-center">
                            {service.lastUpdated}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNumber;
                            if (totalPages <= 5) {
                              pageNumber = i + 1;
                            } else if (currentPage <= 3) {
                              pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNumber = totalPages - 4 + i;
                            } else {
                              pageNumber = currentPage - 2 + i;
                            }

                            return (
                              <Button
                                key={pageNumber}
                                variant={
                                  currentPage === pageNumber
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageClick(pageNumber)}
                                className="w-8 h-8 p-0"
                              >
                                {pageNumber}
                              </Button>
                            );
                          }
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="gap-1"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Active Threats & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-red-900">
                        DDoS Attack Detected
                      </p>
                      <p className="text-sm text-red-700">
                        High volume traffic from SW1-4, SW1-5 targeting SW2-1
                      </p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-yellow-900">
                        Unusual Traffic Pattern
                      </p>
                      <p className="text-sm text-yellow-700">
                        AI Agent E1-2 reports anomalous behavior
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      Warning
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
