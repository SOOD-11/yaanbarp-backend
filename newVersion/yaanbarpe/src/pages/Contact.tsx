import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Mail, Clock, MessageCircle, Star, Users, Zap, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent! 🎉",
      description: "We'll get back to you within 2 hours. Check your email!",
    });
    
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', contactMethod: 'email' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqData = [
    {
      question: "How quickly do you respond?",
      answer: "We typically respond within 2 hours during business hours, and within 24 hours on weekends. Urgent bookings get priority! ⚡"
    },
    {
      question: "Can I customize my experience?",
      answer: "Absolutely! We love creating unique experiences. Tell us your interests and we'll craft something special just for you. ✨"
    },
    {
      question: "What's included in the packages?",
      answer: "All packages include local guides, cultural activities, traditional meals, and transportation. Some include accommodation and special workshops. 🎭"
    },
    {
      question: "Is it suitable for all ages?",
      answer: "Yes! We have family-friendly options and can adapt experiences for different age groups and mobility levels. 👨‍👩‍👧‍👦"
    }
  ];

  const teamMembers = [
    {
      name: "Sakshath Shetty",
      role: "CEO & Founder",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      status: "online"
    },
    {
      name: "Anamay Tripathy",
      role: "Tech Head",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      status: "online"
    },
    {
      name: "Jeevan Shetty",
      role: "Cultural Heritage Specialist",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      status: "online"
    },
    {
      name: "Ashika Mittal",
      role: "Operations Head",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
      status: "away"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-tulu-sand/10 via-background to-tulu-beige/20">
      <Navigation />
      <main className="w-full pt-20">
        {/* Hero Section with Gradient Mesh */}
        <div className="relative py-20 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-tulu-blue/5 via-tulu-teal/5 to-tulu-green/5"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-tulu-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-tulu-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-tulu-teal/10 text-tulu-teal border-tulu-teal/20 animate-bounce">
              💬 Let's Chat!
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tulu-blue via-tulu-teal to-tulu-green bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to dive into Tulu culture? We're here 24/7 to help you plan the perfect adventure! 
              <span className="inline-block ml-2">🚀</span>
            </p>
            
            {/* Live Support Indicator */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 bg-tulu-green rounded-full animate-pulse"></div>
              <span className="text-tulu-green font-medium">4 team members online</span>
              <span className="text-muted-foreground">• Avg response: 2 hours</span>
            </div>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Side - Contact Form */}
              <div className="space-y-8">
                <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-tulu-blue flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form below and we'll get back to you ASAP! ⚡
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Method Preference */}
                      <div>
                        <label className="block text-sm font-medium mb-3">How would you like us to reach you?</label>
                        <Tabs value={formData.contactMethod} onValueChange={(value) => setFormData(prev => ({...prev, contactMethod: value}))}>
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="email">📧 Email</TabsTrigger>
                            <TabsTrigger value="phone">📱 Phone</TabsTrigger>
                            <TabsTrigger value="whatsapp">💬 WhatsApp</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Name *</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your awesome name"
                            className="border-tulu-sand/30 focus:border-tulu-teal focus:ring-tulu-teal/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Phone</label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="border-tulu-sand/30 focus:border-tulu-teal focus:ring-tulu-teal/20"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                          className="border-tulu-sand/30 focus:border-tulu-teal focus:ring-tulu-teal/20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">What's this about?</label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Package booking, custom tour, general inquiry..."
                          className="border-tulu-sand/30 focus:border-tulu-teal focus:ring-tulu-teal/20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Tell us more! *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Share your travel dreams, dates, group size, special interests... the more details, the better we can help! ✨"
                          className="border-tulu-sand/30 focus:border-tulu-teal focus:ring-tulu-teal/20 resize-none"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-tulu-red to-tulu-teal hover:from-tulu-teal hover:to-tulu-blue text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Quick Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  
                  <Card className="backdrop-blur-sm bg-gradient-to-br from-tulu-green/10 to-tulu-gold/10 border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-4 text-center">
                      <MessageCircle className="w-8 h-8 text-tulu-green mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">Quick replies</p>
                      <Badge className="mt-2 bg-tulu-blue/20 text-tulu-blue">Instant connect</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Side - Contact Info & Team */}
              <div className="space-y-8">
                {/* Contact Information */}
                <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-tulu-blue flex items-center gap-2">
                      <MapPin className="w-6 h-6" />
                      Find Us Here
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-tulu-sand/20 hover:bg-tulu-sand/30 transition-colors">
                        <MapPin className="w-6 h-6 text-tulu-red mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">Our Office</h3>
                          <p className="text-muted-foreground text-sm">
                            Car Street, Udupi, Karnataka 576101<br />
                            Near Sri Krishna Temple
                          </p>
                          <Badge className="mt-2 bg-tulu-red/20 text-tulu-red">📍 Easy to find</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-tulu-blue/10 hover:bg-tulu-blue/20 transition-colors">
                        <Clock className="w-6 h-6 text-tulu-blue mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">We're Open</h3>
                          <p className="text-muted-foreground text-sm">
                            Monday - Sunday: 9:00 AM - 7:00 PM<br />
                            Emergency Support: 24/7
                          </p>
                          <Badge className="mt-2 bg-tulu-green/20 text-tulu-green">Always available</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-tulu-teal/10 hover:bg-tulu-teal/20 transition-colors">
                        <Mail className="w-6 h-6 text-tulu-teal mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">Email Us</h3>
                          <p className="text-muted-foreground text-sm">
                           <br />
                           yaanbarpe@gmail.com
                          </p>
                          <Badge className="mt-2 bg-tulu-gold/20 text-tulu-gold">Fast replies</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-tulu-blue flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Meet Our Team
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">The passionate team behind YaanBarpe's cultural experiences</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-tulu-sand/20 transition-colors">
                          <div className="relative">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                              member.status === 'online' ? 'bg-tulu-green' : 'bg-tulu-gold'
                            }`}></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{member.name}</h4>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {member.status === 'online' ? '🟢 Online' : '🟡 Away'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Section */}
                <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-tulu-blue flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Quick Answers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqData.map((faq, index) => (
                        <details key={index} className="group">
                          <summary className="cursor-pointer p-3 rounded-lg hover:bg-tulu-sand/20 transition-colors font-medium text-sm list-none">
                            <div className="flex items-center justify-between">
                              <span>{faq.question}</span>
                              <span className="group-open:rotate-180 transition-transform">↓</span>
                            </div>
                          </summary>
                          <div className="mt-2 p-3 text-sm text-muted-foreground bg-tulu-beige/20 rounded-lg">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-4 md:px-8 bg-gradient-to-r from-tulu-blue/5 to-tulu-teal/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-tulu-red animate-pulse" />
              <Badge className="bg-tulu-gold/20 text-tulu-gold border-tulu-gold/30">
                Made with love in Tulu Nadu
              </Badge>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-tulu-blue">
              Ready for an Adventure?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't just visit Tulu Nadu – experience it! Let's create memories that'll last a lifetime. 
              Your cultural journey starts with a simple message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-tulu-red to-tulu-blue hover:from-tulu-blue hover:to-tulu-teal text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://forms.google.com/your-form-link', '_blank')}
              >
                🎯 Fill Google Form
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-tulu-blue text-tulu-blue hover:bg-tulu-blue hover:text-white px-8 py-4 rounded-full transition-all duration-300"
              >
                📞 Call Us Directly
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
