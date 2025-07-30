import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Plane, 
  Headphones, 
  Clock, 
  Shield, 
  Globe, 
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your travel needs"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get help within minutes, not hours"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your information is protected with enterprise-grade security"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Support for bookings worldwide"
    }
  ]

  const stats = [
    { number: "99.9%", label: "Satisfaction Rate" },
    { number: "< 5min", label: "Average Response" },
    { number: "24/7", label: "Support Available" },
    { number: "150+", label: "Countries Covered" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Premium Travel Support Portal
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Travel Booking
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Support
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get instant help with your travel bookings. Our expert team is here to assist you 
              with payments, cancellations, date changes, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/submit">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  Submit Support Ticket
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-white/50 transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Support?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide world-class support for all your travel booking needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Submit your support ticket and get assistance within minutes
          </p>
          <Link href="/submit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Travel Support Portal</span>
            </div>
            <p className="text-gray-400">
              Premium support for all your travel booking needs
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
