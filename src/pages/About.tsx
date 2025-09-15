import { Shield, Users, Award, Heart, Brain, Stethoscope, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your health data is encrypted and never shared with third parties. We maintain the highest standards of data protection."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Our advanced algorithms analyze symptoms using the latest medical research to provide accurate assessments."
    },
    {
      icon: Stethoscope,
      title: "Medical Expertise",
      description: "All tools are developed in collaboration with licensed healthcare professionals and medical institutions."
    },
    {
      icon: Target,
      title: "Personalized Results",
      description: "Get tailored recommendations based on your specific symptoms, age, gender, and health history."
    }
  ];

  const stats = [
    { number: "15+", label: "Health Assessment Tools" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "10K+", label: "Users Helped" },
    { number: "24/7", label: "Available Support" }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      specialty: "Cardiology",
      description: "15+ years in cardiovascular medicine"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Mental Health",
      specialty: "Psychiatry",
      description: "Expert in anxiety and depression treatment"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Digestive Health Specialist",
      specialty: "Gastroenterology",
      description: "Specialist in IBS and digestive disorders"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FitScan</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Empowering individuals to take control of their health through accessible, 
            accurate, and AI-powered symptom assessment tools.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At FitScan, we believe that everyone deserves access to reliable health information. 
                Our mission is to bridge the gap between initial health concerns and professional 
                medical care through innovative technology.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We're committed to providing accurate, easy-to-use health assessment tools that 
                help people make informed decisions about their wellbeing while encouraging 
                appropriate medical consultation when needed.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-6 h-6 text-success" />
                <span className="text-lg font-medium">Trusted by healthcare professionals</span>
              </div>
            </div>
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
              <Heart className="w-24 h-24 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose FitScan?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with medical expertise to deliver 
              reliable health assessments you can trust.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-premium text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that reflect our commitment to your health
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Medical Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform is backed by experienced healthcare professionals dedicated to 
              providing accurate health assessments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-premium text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.specialty}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="card-premium">
            <div className="text-center">
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Medical Disclaimer</h2>
              <div className="text-left space-y-4 text-muted-foreground">
                <p>
                  FitScan provides health assessment tools for informational purposes only. 
                  These tools are not intended to diagnose, treat, cure, or prevent any disease 
                  or medical condition.
                </p>
                <p>
                  Always consult with a qualified healthcare provider for proper diagnosis, 
                  treatment, and medical advice. Never disregard professional medical advice 
                  or delay seeking treatment based on information from our platform.
                </p>
                <p>
                  In case of a medical emergency, call your emergency services immediately. 
                  FitScan is not a substitute for emergency medical care.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your health assessment journey with FitScan today
          </p>
          <Button size="lg" className="btn-hero">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;