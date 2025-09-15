import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  HeadphonesIcon,
  Globe,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [darkMode] = useState(document.documentElement.classList.contains('dark'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@fynkr.com',
      action: 'mailto:support@fynkr.com',
      color: 'blue'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'emerald'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      action: '#',
      color: 'purple'
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: 'Video Call',
      description: 'Schedule a meeting',
      contact: 'Book a call',
      action: '#',
      color: 'orange'
    }
  ];

  const officeInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-slate-500" />,
      label: 'Address',
      value: '123 Business Ave, Suite 100\nSan Francisco, CA 94105'
    },
    {
      icon: <Clock className="w-5 h-5 text-slate-500" />,
      label: 'Business Hours',
      value: 'Monday - Friday: 9:00 AM - 6:00 PM PST\nWeekends: 10:00 AM - 4:00 PM PST'
    },
    {
      icon: <Globe className="w-5 h-5 text-slate-500" />,
      label: 'Website',
      value: 'www.fynkr.com'
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: 'https://twitter.com/fynkr' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: 'https://linkedin.com/company/fynkr' },
    { icon: <Github className="w-5 h-5" />, name: 'GitHub', url: 'https://github.com/fynkr' }
  ];

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-slate-100'}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'}`}>
            Contact Us
          </h1>
          <p className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
            Have questions or need support? We're here to help you succeed with Fynkr.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className={`group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-${method.color}-100 to-${method.color}-200 dark:from-${method.color}-900/30 dark:to-${method.color}-800/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <div className={`text-${method.color}-600 dark:text-${method.color}-400`}>
                    {method.icon}
                  </div>
                </div>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {method.title}
                </h3>
                <p className={`text-sm mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {method.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-full ${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}`}
                  onClick={() => {
                    if (method.action.startsWith('mailto:') || method.action.startsWith('tel:')) {
                      window.location.href = method.action;
                    } else {
                      toast.success(`${method.title} feature coming soon!`);
                    }
                  }}
                >
                  {method.contact}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                <Send className="w-5 h-5" />
                Send us a Message
              </CardTitle>
              <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                      className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description"
                      className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>
                  Get in Touch
                </CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  We're here to help and answer any questions you might have
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {officeInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {info.icon}
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {info.label}
                      </p>
                      <p className={`text-sm whitespace-pre-line ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>
                  Follow Us
                </CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Stay connected with us on social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className={`${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}`}
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      {social.icon}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border-blue-800' : 'bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200'}`}>
              <CardContent className="p-6">
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  Need Immediate Help?
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Check out our comprehensive help center with guides, tutorials, and FAQs.
                </p>
                <Button variant="outline" className={`w-full ${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}`}>
                  Visit Help Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}