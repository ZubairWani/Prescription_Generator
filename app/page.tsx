"use client";

import React, { useState, useEffect } from 'react';
import { FileText, Stethoscope, Shield, Clock, Users, ChevronRight, Menu, X, Star, Check, ArrowRight, Zap, Globe, Heart } from 'lucide-react';

import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}


const Link = ({ href, children, className = "" }: LinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);


export default function PrescriptionLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { // Correction Applied Here
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Templates",
      description: "Pre-built prescription templates for common medications and treatments"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data protection"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Generation",
      description: "Generate professional prescriptions in under 30 seconds"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Provider",
      description: "Support for clinics, hospitals, and individual practitioners"
    }
  ];

  const stats = [
    { number: "50K+", label: "Prescriptions Generated" },
    { number: "2.5K+", label: "Healthcare Providers" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    
    // landing theme 1
    
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
    //   {/* Animated Background Elements */}
    //   <div className="absolute inset-0 overflow-hidden">
    //     <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    //     <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    //     <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    //   </div>

    //   {/* Cursor Glow Effect */}
    //   <div
    //     className="fixed w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
    //     style={{
    //       left: mousePosition.x - 192,
    //       top: mousePosition.y - 192,
    //     }}
    //   ></div>
    

  
  
  
  
  // landing theme 5
  
  // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-amber-900 text-white overflow-hidden relative">
  // {/* Animated Background Elements */}
  // <div className="absolute inset-0 overflow-hidden">
  //   <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
  //   <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  //   <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  // </div>
  // {/* Cursor Glow Effect */}
  // <div
  //   className="fixed w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
  //   style={{
  //     left: mousePosition.x - 192,
  //     top: mousePosition.y - 192,
  //   }}
  // ></div>
  
  
  
  
  
  
  
  
  // Landing theme 6
  
  // <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white overflow-hidden relative">
  // {/* Animated Background Elements */}
  // <div className="absolute inset-0 overflow-hidden">
  //   <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
  //   <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  //   <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  // </div>
  // {/* Cursor Glow Effect */}
  // <div
  //   className="fixed w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
  //   style={{
  //     left: mousePosition.x - 192,
  //     top: mousePosition.y - 192,
  //   }}
  // ></div>
  
  
  
  
  
   // landing theme 3
  
  // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white overflow-hidden relative">
  // {/* Animated Background Elements */}
  // <div className="absolute inset-0 overflow-hidden">
  //   <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl animate-pulse"></div>
  //   <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  //   <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-zinc-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  // </div>
  // {/* Cursor Glow Effect */}
  // <div
  //   className="fixed w-96 h-96 bg-slate-500/5 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
  //   style={{
  //     left: mousePosition.x - 192,
  //     top: mousePosition.y - 192,
  //   }}
  // ></div>
  
  
  
  
  
   // landing theme 4
  
  // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 text-white overflow-hidden relative">
  // {/* Animated Background Elements */}
  // <div className="absolute inset-0 overflow-hidden">
  //   <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
  //   <div className="absolute top-1/2 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  //   <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  // </div>
  // {/* Cursor Glow Effect */}
  // <div
  //   className="fixed w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
  //   style={{s
  //     left: mousePosition.x - 192,
  //     top: mousePosition.y - 192,
  //   }}
  // ></div>
  
  
  
     // landing theme 2
    
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 text-white overflow-hidden relative">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>
  {/* Cursor Glow Effect */}
  <div
    className="fixed w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
    style={{
      left: mousePosition.x - 192,
      top: mousePosition.y - 192,
    }}
  ></div>
  
  

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-xl">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            MedScript Pro
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-all hover:scale-105">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-slate-800/95 backdrop-blur-md z-40 p-6">
          <div className="flex flex-col space-y-4">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-all text-left">
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative z-10 px-6 lg:px-12 pt-12 lg:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

            {/* Badge */}
            <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <Zap className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm text-blue-300">New: AI-Powered Prescription Suggestions</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Prescription Generator
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create accurate, compliant, and professional medical prescriptions in seconds.
              Trusted by healthcare providers worldwide for efficiency and reliability.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/prescription">
                <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center">
                  Create Prescription
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="px-8 py-4 rounded-xl text-lg font-semibold border border-slate-600 hover:border-blue-500 transition-all hover:bg-blue-500/10">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Feature Cards */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-24">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                Why Choose <span className="text-blue-400">MedScript Pro?</span>
              </h2>

              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      activeFeature === index ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                    } transition-colors`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      activeFeature === index ? 'rotate-90 text-blue-400' : 'text-slate-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Demo Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 bg-slate-700 h-6 rounded ml-4"></div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="font-semibold">Patient Information</span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="bg-slate-700 h-3 rounded w-3/4"></div>
                      <div className="bg-slate-700 h-3 rounded w-1/2"></div>
                    </div>
                  </div>

                  <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-5 h-5 text-green-400" />
                      <span className="font-semibold">Prescription Details</span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="bg-slate-700 h-3 rounded w-full"></div>
                      <div className="bg-slate-700 h-3 rounded w-2/3"></div>
                    </div>
                  </div>

                  <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <Globe className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold">Generate & Export</span>
                    </div>
                    <Link href="/prescription">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform">
                        Create Prescription
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-blue-500 p-3 rounded-full animate-bounce">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-500 p-3 rounded-full animate-pulse">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-32 border-t border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">MedScript Pro</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Empowering healthcare professionals with cutting-edge prescription generation technology.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Contact Us</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">API</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Status</a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>© 2025 MedScript Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}