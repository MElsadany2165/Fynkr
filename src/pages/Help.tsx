import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, 
  BookOpen, 
  Video, 
  MessageCircle, 
  HelpCircle,
  ExternalLink,
  Download,
  Play,
  FileText,
  Lightbulb,
  Settings,
  CreditCard,
  Users,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

export default function Help() {
  const [darkMode] = useState(document.documentElement.classList.contains('dark'));
  const [searchTerm, setSearchTerm] = useState('');

  const helpCategories = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Getting Started',
      description: 'Learn the basics of Fynkr',
      articles: 12,
      color: 'blue'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Account & Settings',
      description: 'Manage your account preferences',
      articles: 8,
      color: 'emerald'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Project Management',
      description: 'Create and manage projects',
      articles: 15,
      color: 'purple'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Billing & Payments',
      description: 'Subscription and payment help',
      articles: 6,
      color: 'orange'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security & Privacy',
      description: 'Keep your account secure',
      articles: 5,
      color: 'red'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      articles: 10,
      color: 'indigo'
    }
  ];

  const quickActions = [
    {
      icon: <Video className="w-5 h-5" />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      action: () => toast.success('Video tutorials coming soon!')
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: 'Download Resources',
      description: 'Get templates and guides',
      action: () => toast.success('Resource downloads coming soon!')
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: 'Contact Support',
      description: 'Get help from our team',
      action: () => toast.success('Redirecting to contact page...')
    }
  ];

  const faqs = [
    {
      category: 'general',
      question: 'How do I get started with Fynkr?',
      answer: 'Getting started is easy! Simply sign up for an account, complete your profile, and create your first project. Our onboarding guide will walk you through each step.'
    },
    {
      category: 'general',
      question: 'What makes Fynkr different from other project management tools?',
      answer: 'Fynkr is specifically designed for freelancers and agencies. We focus on client relationships, professional presentations, and business growth features that other tools often overlook.'
    },
    {
      category: 'billing',
      question: 'Can I change my subscription plan?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and billing is prorated.'
    },
    {
      category: 'billing',
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied, contact our support team for a full refund.'
    },
    {
      category: 'projects',
      question: 'How many projects can I create?',
      answer: 'The number of projects depends on your plan. Free accounts can create up to 3 projects, while paid plans offer unlimited projects.'
    },
    {
      category: 'projects',
      question: 'Can I invite clients to view my projects?',
      answer: 'Absolutely! You can generate secure client links that give your clients read-only access to project progress, timelines, and deliverables.'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click the "Forgot Password" link on the login page, enter your email address, and we\'ll send you instructions to reset your password.'
    },
    {
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from the account settings page. Please note that this action is irreversible and will permanently delete all your data.'
    }
  ];

  const tutorials = [
    {
      title: 'Creating Your First Project',
      duration: '5 min',
      difficulty: 'Beginner',
      description: 'Learn how to set up and configure your first project in Fynkr'
    },
    {
      title: 'Inviting Clients to Projects',
      duration: '3 min',
      difficulty: 'Beginner',
      description: 'Share project progress with clients using secure links'
    },
    {
      title: 'Advanced Project Settings',
      duration: '8 min',
      difficulty: 'Intermediate',
      description: 'Configure advanced features like custom fields and automation'
    },
    {
      title: 'Analytics and Reporting',
      duration: '6 min',
      difficulty: 'Intermediate',
      description: 'Generate insights and reports from your project data'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-slate-100'}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'}`}>
            Help & Support
          </h1>
          <p className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
            Find answers to your questions and learn how to get the most out of Fynkr
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-12 h-12 text-lg ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className={`group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}>
              <CardContent className="p-6 text-center" onClick={action.action}>
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-blue-600 dark:text-blue-400">
                    {action.icon}
                  </div>
                </div>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className={`${darkMode ? 'bg-slate-800' : 'bg-white'} w-full`}>
            <TabsTrigger value="categories" className="flex-1">Help Categories</TabsTrigger>
            <TabsTrigger value="tutorials" className="flex-1">Video Tutorials</TabsTrigger>
            <TabsTrigger value="faqs" className="flex-1">FAQs</TabsTrigger>
          </TabsList>

          {/* Help Categories */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => (
                <Card key={index} className={`group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}>
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 mb-4 bg-gradient-to-r from-${category.color}-100 to-${category.color}-200 dark:from-${category.color}-900/30 dark:to-${category.color}-800/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <div className={`text-${category.color}-600 dark:text-${category.color}-400`}>
                        {category.icon}
                      </div>
                    </div>
                    <CardTitle className={`${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {category.title}
                    </CardTitle>
                    <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={darkMode ? 'bg-slate-700 text-slate-300' : ''}>
                        {category.articles} articles
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => toast.success(`Opening ${category.title} articles...`)}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Video Tutorials */}
          <TabsContent value="tutorials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className={`group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className={`${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {tutorial.title}
                        </CardTitle>
                        <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                          {tutorial.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className={darkMode ? 'border-slate-600 text-slate-400' : ''}>
                        {tutorial.duration}
                      </Badge>
                      <Badge 
                        variant={tutorial.difficulty === 'Beginner' ? 'default' : 'secondary'}
                        className={tutorial.difficulty === 'Beginner' ? 'bg-emerald-600' : ''}
                      >
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQs */}
          <TabsContent value="faqs">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className={`border rounded-lg px-4 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                      <AccordionTrigger className={`text-left ${darkMode ? 'text-white hover:text-slate-300' : 'text-slate-800 hover:text-slate-600'}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} pb-4`}>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                    <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      No FAQs found
                    </h3>
                    <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Try adjusting your search terms or browse our help categories above.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <Card className={`${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border-blue-800' : 'bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200'}`}>
          <CardContent className="p-8 text-center">
            <Lightbulb className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Still need help?
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
              Can't find what you're looking for? Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
                onClick={() => toast.success('Redirecting to contact page...')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className={darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}
                onClick={() => toast.success('Community forum coming soon!')}
              >
                <Users className="w-4 h-4 mr-2" />
                Community Forum
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}