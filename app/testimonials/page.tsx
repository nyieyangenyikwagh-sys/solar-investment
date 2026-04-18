"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Adebayo Ogundimu",
    role: "Business Owner",
    location: "Lagos",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    content: "Opera has transformed my approach to investing. The transparency and consistent returns have made it my primary investment vehicle. I have been able to fund my children's education through the earnings.",
    rating: 5,
    investmentAmount: "2,500,000",
    returns: "18%",
  },
  {
    id: 2,
    name: "Chidinma Okafor",
    role: "Medical Doctor",
    location: "Abuja",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "As a busy professional, I needed an investment that does not require constant monitoring. Opera gives me peace of mind with their reliable daily returns and easy withdrawal process.",
    rating: 5,
    investmentAmount: "1,800,000",
    returns: "20%",
  },
  {
    id: 3,
    name: "Emmanuel Nwachukwu",
    role: "Engineer",
    location: "Port Harcourt",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    content: "What I love most about Opera is the combination of good returns and positive environmental impact. Knowing my investment supports clean energy makes it even more rewarding.",
    rating: 5,
    investmentAmount: "3,200,000",
    returns: "22%",
  },
  {
    id: 4,
    name: "Fatima Abubakar",
    role: "Entrepreneur",
    location: "Kano",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    content: "The referral program has been amazing. I have introduced several friends and family members, and we are all benefiting together. It is truly a community-focused platform.",
    rating: 5,
    investmentAmount: "950,000",
    returns: "16%",
  },
  {
    id: 5,
    name: "Oluwaseun Adeleke",
    role: "Accountant",
    location: "Ibadan",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    content: "I have tried many investment platforms, but Opera stands out for its reliability and customer service. The verification process gave me confidence in the platform's legitimacy.",
    rating: 5,
    investmentAmount: "1,500,000",
    returns: "18%",
  },
  {
    id: 6,
    name: "Ngozi Eze",
    role: "Teacher",
    location: "Enugu",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    content: "Starting with just a small amount, I have grown my investment significantly over the past year. Opera has made wealth building accessible for ordinary Nigerians like me.",
    rating: 5,
    investmentAmount: "500,000",
    returns: "18%",
  },
]

const stats = [
  { value: "5M+", label: "Total Users" },
  { value: "NGN 50B+", label: "Total Invested" },
  { value: "18%", label: "Avg. Annual Return" },
  { value: "98%", label: "Satisfaction Rate" },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-foreground border-0">
            Testimonials
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Ask over 5 million people who have trusted us for decades
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real stories from real investors who have experienced the Opera difference.
          </p>
        </section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-accent/30 mb-4" />
                  
                  <p className="text-foreground mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} - {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="font-semibold text-foreground">NGN {testimonial.investmentAmount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Returns</p>
                      <p className="font-semibold text-green-600">{testimonial.returns} p.a.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Testimonials Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16">
          <Card className="bg-muted/30">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Want to share your story?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                We love hearing from our investors. Share your Opera experience and inspire others to start their investment journey.
              </p>
              <Badge className="bg-accent text-accent-foreground">
                Contact us at testimonials@opera.ng
              </Badge>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
