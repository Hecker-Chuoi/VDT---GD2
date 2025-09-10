import { useState } from "react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Shield,
  Lock,
  Mail,
  User,
  CheckCircle,
  UserPlus,
  Eye,
  EyeOff,
} from "lucide-react";

interface LoginProps {
  onLogin: () => void;
  waitlist: string[];
  onAddToWaitlist: (email: string) => void;
}

export function Login({ onLogin, waitlist, onAddToWaitlist }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Waitlist modal state
  const [email, setEmail] = useState("");
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a brief loading state
    setTimeout(() => {
      if (username === "admin" && password === "XMindsEquiTech") {
        // Store authentication state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginTime", Date.now().toString());
        onLogin();
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 500);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistError("");

    if (!email || !email.includes("@")) {
      setWaitlistError("Please enter a valid email address");
      return;
    }

    if (waitlist.includes(email)) {
      setWaitlistError("This email is already on the waitlist");
      return;
    }

    onAddToWaitlist(email);
    setWaitlistSuccess(true);
    setEmail("");

    // Auto close after success message
    setTimeout(() => {
      setIsWaitlistOpen(false);
      setWaitlistSuccess(false);
    }, 2000);
  };

  const handleWaitlistClose = () => {
    setIsWaitlistOpen(false);
    setEmail("");
    setWaitlistError("");
    setWaitlistSuccess(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">
              Software infrastructure topology
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="h-11 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-700 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
                <Lock className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Access Dashboard
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-500 font-medium">
                Don't have access?
              </span>
            </div>
          </div>

          <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-11 border-slate-200 hover:bg-slate-50"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Request Access
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Join Access Waitlist
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Submit your email address to request access to the network
                  security dashboard. You'll be notified when your access is
                  approved.
                </p>

                {waitlistSuccess ? (
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                    <p className="font-medium text-emerald-800">
                      Request Submitted Successfully!
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      We'll review your request and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@company.com"
                        className="h-11 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {waitlistError && (
                      <div className="text-red-700 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
                        {waitlistError}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1 h-11">
                        Submit Request
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleWaitlistClose}
                        className="h-11"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-500 mb-2">
              Demo Environment - Test Credentials:
            </p>
            <div className="space-y-1">
              <p className="font-mono text-sm text-slate-700">
                Username: <span className="font-semibold">admin</span>
              </p>
              <p className="font-mono text-sm text-slate-700">
                Password: <span className="font-semibold">XMindsEquiTech</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
