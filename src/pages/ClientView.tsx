import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Calendar, CheckCircle, Clock, Bug, Rocket, Star, MessageCircle, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
  type: 'feature' | 'bug' | 'improvement';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  tasks: Task[];
  deploymentUrl?: string;
  description: string;
  startDate: string;
  estimatedCompletion: string;
  budget: number;
  freelancerName: string;
  freelancerEmail: string;
}

export default function ClientView() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Enhanced mock project data
    const mockProject: Project = {
      id: projectId || '1',
      name: 'E-commerce Platform Redesign',
      client: 'TechCorp Inc.',
      status: 'active',
      progress: 78,
      description: 'A comprehensive e-commerce platform redesign featuring modern UI/UX, advanced search functionality, mobile optimization, and integrated payment processing.',
      startDate: '2024-01-15',
      estimatedCompletion: '2024-03-15',
      budget: 15000,
      freelancerName: 'Alex Johnson',
      freelancerEmail: 'alex@fynkr.com',
      deploymentUrl: 'https://demo-ecommerce.vercel.app',
      tasks: [
        {
          id: '1',
          title: 'User Authentication & Security Setup',
          status: 'completed',
          type: 'feature',
          priority: 'high',
          createdAt: '2024-01-16',
          completedAt: '2024-01-20'
        },
        {
          id: '2',
          title: 'Product Catalog & Search Implementation',
          status: 'completed',
          type: 'feature',
          priority: 'high',
          createdAt: '2024-01-18',
          completedAt: '2024-01-25'
        },
        {
          id: '3',
          title: 'Shopping Cart & Checkout Flow',
          status: 'completed',
          type: 'feature',
          priority: 'high',
          createdAt: '2024-01-22',
          completedAt: '2024-02-01'
        },
        {
          id: '4',
          title: 'Payment Gateway Integration (Stripe)',
          status: 'completed',
          type: 'feature',
          priority: 'high',
          createdAt: '2024-02-01',
          completedAt: '2024-02-08'
        },
        {
          id: '5',
          title: 'Admin Dashboard Development',
          status: 'in-progress',
          type: 'feature',
          priority: 'medium',
          createdAt: '2024-02-05'
        },
        {
          id: '6',
          title: 'Mobile Responsive Design',
          status: 'in-progress',
          type: 'improvement',
          priority: 'medium',
          createdAt: '2024-02-10'
        },
        {
          id: '7',
          title: 'Performance Optimization',
          status: 'todo',
          type: 'improvement',
          priority: 'medium',
          createdAt: '2024-02-12'
        },
        {
          id: '8',
          title: 'Fix product image loading issue',
          status: 'todo',
          type: 'bug',
          priority: 'low',
          createdAt: '2024-02-14'
        },
        {
          id: '9',
          title: 'SEO Optimization & Meta Tags',
          status: 'todo',
          type: 'improvement',
          priority: 'low',
          createdAt: '2024-02-15'
        }
      ]
    };
    setProject(mockProject);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Loading your project dashboard...</p>
        </div>
      </div>
    );
  }

  const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = project.tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = project.tasks.filter(task => task.status === 'todo').length;
  const bugTasks = project.tasks.filter(task => task.type === 'bug' && task.status !== 'completed').length;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'feature': return <Rocket className="w-4 h-4" />;
      case 'bug': return <Bug className="w-4 h-4" />;
      case 'improvement': return <Star className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewLive = () => {
    if (project.deploymentUrl) {
      window.open(project.deploymentUrl, '_blank');
      toast.success('Opening live website...');
    }
  };

  const handleContactFreelancer = () => {
    window.open(`mailto:${project.freelancerEmail}?subject=Question about ${project.name}`, '_blank');
    toast.success('Opening email client...');
  };

  const handleDownloadReport = () => {
    toast.success('Generating project report... Download will start shortly!');
  };

  const handleShareProject = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Project link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {project.name}
              </h1>
              <p className="text-gray-600 font-medium">Powered by Fynkr</p>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {project.deploymentUrl && (
              <Button 
                onClick={handleViewLive}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Website
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={handleContactFreelancer}
              className="border-2 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact {project.freelancerName}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDownloadReport}
              className="border-2 hover:bg-green-50 shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleShareProject}
              className="border-2 hover:bg-purple-50 shadow-md hover:shadow-lg transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Project
            </Button>
          </div>
        </div>

        {/* Enhanced Progress Overview */}
        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-1">{project.progress}%</div>
                <p className="text-sm text-blue-700 font-medium">Overall Progress</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-1">{completedTasks}</div>
                <p className="text-sm text-green-700 font-medium">Tasks Completed</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-1">{inProgressTasks}</div>
                <p className="text-sm text-orange-700 font-medium">In Progress</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-1">${project.budget.toLocaleString()}</div>
                <p className="text-sm text-purple-700 font-medium">Project Value</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-medium">
                <span>Project Progress</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  {project.progress}%
                </span>
              </div>
              <div className="relative">
                <Progress value={project.progress} className="h-4 bg-gray-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-20 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground font-medium">Start Date:</span>
                <span className="font-semibold">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground font-medium">Est. Completion:</span>
                <span className="font-semibold">{new Date(project.estimatedCompletion).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-muted-foreground font-medium">Freelancer:</span>
                <span className="font-semibold">{project.freelancerName}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Task Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-600 mb-2">{completedTasks}</div>
              <p className="text-green-700 font-medium">Completed Tasks</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-blue-600 mb-2">{inProgressTasks}</div>
              <p className="text-blue-700 font-medium">In Progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-600 mb-2">{todoTasks}</div>
              <p className="text-gray-700 font-medium">Upcoming Tasks</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Bug className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-red-600 mb-2">{bugTasks}</div>
              <p className="text-red-700 font-medium">Open Issues</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Task List */}
        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Detailed Task Progress</CardTitle>
            <CardDescription className="text-base">
              Real-time breakdown of all project tasks and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.tasks.map((task, index) => (
                <div key={task.id}>
                  <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-slate-50/80 to-slate-100/80 hover:from-slate-100/80 hover:to-slate-200/80 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl shadow-sm ${
                        task.status === 'completed' ? 'bg-green-100' : 
                        task.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
                          {task.completedAt && (
                            <span className="text-green-600 font-medium">
                              ✅ Completed {new Date(task.completedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={`${getPriorityColor(task.priority)} px-3 py-1 font-medium`}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      <Badge className={`${getStatusColor(task.status)} px-3 py-1 font-medium`}>
                        {task.status === 'in-progress' ? 'IN PROGRESS' : task.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  {index < project.tasks.length - 1 && <Separator className="my-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            This dashboard is powered by <strong className="text-blue-600">Fynkr</strong> - Professional Freelance Management
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => toast.success('Help center opened!')}>
              Need Help?
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toast.success('Feedback submitted!')}>
              Send Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}