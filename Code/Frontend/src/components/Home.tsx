import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";

interface Service {
  id: string;
  serviceCode: string;
  serviceName: string;
  status: "active" | "maintenance" | "inactive";
}

interface HomeProps {
  onLogout: () => void;
  waitlist: string[];
}

export function Home({ onLogout, waitlist }: HomeProps) {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [data, setData] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState("services");
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/services");
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
    console.log("Fetched services:", data);
  }, [currentPage]);

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

  // Calculate pagination
  const totalPages = Math.ceil(data.length / servicesPerPage);
  const startIndex = (currentPage - 1) * servicesPerPage;
  const endIndex = startIndex + servicesPerPage;
  const services = data.slice(startIndex, endIndex);

  const handleServiceClick = (service: Service) => {
    navigate(`/topo/${service.id}`);
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
                    Showing {startIndex + 1}-{Math.min(endIndex, data.length)}{" "}
                    of {data.length} services
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
