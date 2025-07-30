"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Plane, Upload, Send, CheckCircle } from "lucide-react"

export default function SubmitTicketPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reference: "",
    category: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Ticket submitted successfully!", {
          description: "We'll get back to you within 24 hours.",
        })
        setFormData({
          name: "",
          email: "",
          reference: "",
          category: "",
          description: "",
        })
      } else {
        toast.error("Failed to submit ticket", {
          description: data.message || "Please try again.",
        })
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Plane className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Support Ticket
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Submit Support Ticket
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your issue and we'll get back to you as soon as possible
            </p>
          </div>

          {/* Form */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Ticket Details
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="reference" className="text-sm font-medium text-gray-700">
                      Booking Reference *
                    </Label>
                    <Input
                      id="reference"
                      type="text"
                      placeholder="Enter your booking reference"
                      value={formData.reference}
                      onChange={(e) => handleInputChange("reference", e.target.value)}
                      required
                      className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                      required
                    >
                      <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Payment">Payment</SelectItem>
                        <SelectItem value="Cancellation">Cancellation</SelectItem>
                        <SelectItem value="Change Dates">Change Dates</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your issue in detail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                    rows={6}
                    className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    Minimum 10 characters required
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Attachments (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Max file size: 10MB
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Ticket
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-sm text-gray-600">
                  We typically respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Plane className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Global Support</h3>
                <p className="text-sm text-gray-600">
                  Available for bookings worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Upload className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">File Upload</h3>
                <p className="text-sm text-gray-600">
                  Attach screenshots or documents
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 