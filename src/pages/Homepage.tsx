import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Zap, Shield, Star, Play, CheckCircle, TrendingUp, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Client Management",
      description: "Seamlessly manage client relationships with professional dashboards and real-time updates.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
      title: "Project Tracking",
      description: "Track project progress with advanced analytics and automated reporting systems.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee and data protection.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const testimonials = [
    {
      name: "Joseph Martin",
      role: "Freelance Designer",
      content: "Fynkr transformed how I manage my clients. The professional dashboards impressed my biggest clients!",
      rating: 5
    },
    {
      name: "Mohamed Elsadany",
      role: "Web Developer",
      content: "The project tracking features saved me 10+ hours per week. My clients love the transparency.",
      rating: 5
    },
    {
      name: "Mostafa ElShenawy",
      role: "Marketing Consultant",
      content: "Best investment for my freelance business. The client invitations feature is a game-changer!",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Projects Managed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  // Demo video handler - ADD YOUR VIDEO LINK HERE
  const handleWatchDemo = () => {
    // Option 1: Direct link to external video (YouTube, Vimeo, etc.)
    const demoVideoUrl = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"; // Replace with your actual video URL
    
    // Option 2: If you want to use a modal/popup for the video
    // You can implement a video modal here
    
    // Option 3: Navigate to a dedicated demo page
    // navigate('/demo');
    
    // Current implementation - opens external link
    window.open(demoVideoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                  <span className="text-white font-bold text-3xl">F</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl opacity-20 animate-ping" />
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                Elevate Your 
                <br />
                
<span className="relative text-gray-900">
  Freelance Business
  <div
    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full transform scale-x-0 animate-pulse"
    style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
  ></div>
</span>

              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Professional project management, client dashboards, and business analytics 
                designed specifically for modern freelancers and agencies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWatchDemo} // Updated to use the demo handler
                className="px-8 py-4 text-lg border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 delay-${index * 200}`}
                  style={{ animationDelay: `${1.5 + index * 0.2}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and impress your clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`group bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${2 + index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Trusted by
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"> Professionals</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl text-slate-700 mb-8 leading-relaxed font-medium">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-slate-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-slate-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-16 text-center text-white relative">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of freelancers who've already elevated their business with Fynkr
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
  variant="outline" 
  size="lg"
  onClick={handleWatchDemo}
  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg transition-all duration-300"
>
  Schedule Demo
</Button>

                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  <span className="text-2xl font-bold">Fynkr</span>
                </div>
                <p className="text-slate-400">
                  Professional freelance management platform for modern businesses.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <div className="space-y-2 text-slate-400">
                  <div>Features</div>
                  <div>Pricing</div>
                  <div>Integrations</div>
                  <div>API</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2 text-slate-400">
                  <div>About</div>
                  <div>Blog</div>
                  <div>Careers</div>
                  <div>Contact</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2 text-slate-400">
                  <div>Help Center</div>
                  <div>Documentation</div>
                  <div>Community</div>
                  <div>Status</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
              <p>&copy; 2025 Fynkr. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}