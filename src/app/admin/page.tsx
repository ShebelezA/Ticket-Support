"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { 
  Shield, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Clock,
  LogOut,
  Lock
} from "lucide-react"

interface Ticket {
  id: string
  name: string
  email: string
  reference: string
  category: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Basic authentication (for demo purposes)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true)
      toast.success("Login successful!")
    } else {
      toast.error("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername("")
    setPassword("")
    toast.success("Logged out successfully!")
  }

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/tickets")
      const data = await response.json()
      if (data.tickets) {
        setTickets(data.tickets)
        setFilteredTickets(data.tickets)
      }
    } catch (error) {
      toast.error("Failed to fetch tickets")
    }
  }

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success("Ticket status updated!")
        fetchTickets()
      } else {
        toast.error("Failed to update ticket status")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchTickets()
    }
  }, [isAuthenticated])

  useEffect(() => {
    let filtered = tickets

    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.reference.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter)
    }

    setFilteredTickets(filtered)
  }, [tickets, searchTerm, statusFilter, categoryFilter])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Login
            </CardTitle>
            <p className="text-gray-600">
              Enter your credentials to access the admin panel
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Demo credentials: admin / admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage support tickets and customer inquiries
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Tickets</p>
                    <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {tickets.filter(t => t.status === "pending").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">
                      {tickets.filter(t => t.status === "resolved").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {tickets.filter(t => {
                        const today = new Date().toDateString()
                        const ticketDate = new Date(t.createdAt).toDateString()
                        return today === ticketDate
                      }).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Payment">Payment</SelectItem>
                      <SelectItem value="Cancellation">Cancellation</SelectItem>
                      <SelectItem value="Change Dates">Change Dates</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setCategoryFilter("all")
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tickets Table */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Tickets ({filteredTickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.name}</p>
                            <p className="text-sm text-gray-500">{ticket.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {ticket.reference}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={ticket.status === "resolved" ? "default" : "secondary"}
                            className={ticket.status === "resolved" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                          >
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {ticket.status === "pending" ? (
                              <Button
                                size="sm"
                                onClick={() => updateTicketStatus(ticket.id, "resolved")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTicketStatus(ticket.id, "pending")}
                              >
                                <Clock className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ticket Details Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer Name</Label>
                  <p className="text-gray-900">{selectedTicket.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-gray-900">{selectedTicket.email}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Booking Reference</Label>
                  <p className="text-gray-900 font-mono">{selectedTicket.reference}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Badge variant="secondary">{selectedTicket.category}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                  {selectedTicket.description}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge
                    variant={selectedTicket.status === "resolved" ? "default" : "secondary"}
                    className={selectedTicket.status === "resolved" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                  >
                    {selectedTicket.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-gray-900">
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                {selectedTicket.status === "pending" ? (
                  <Button
                    onClick={() => {
                      updateTicketStatus(selectedTicket.id, "resolved")
                      setSelectedTicket(null)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateTicketStatus(selectedTicket.id, "pending")
                      setSelectedTicket(null)
                    }}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Mark as Pending
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 