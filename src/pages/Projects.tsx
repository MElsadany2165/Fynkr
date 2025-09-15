import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  Users,
  Clock,
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  Share,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function Projects() {
  const [darkMode] = useState(document.documentElement.classList.contains('dark'));
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const projects = [
    {
      id: '1',
      name: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      status: 'active',
      progress: 85,
      tasks: 15,
      completedTasks: 13,
      budget: 12500,
      deadline: '2024-02-15',
      startDate: '2024-01-01',
      deploymentUrl: 'https://demo-ecommerce.vercel.app',
      description: 'Modern e-commerce platform with advanced features',
      priority: 'high',
      category: 'Web Development'
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      client: 'FinanceFlow',
      status: 'active',
      progress: 60,
      tasks: 20,
      completedTasks: 12,
      budget: 18000,
      deadline: '2024-03-01',
      startDate: '2024-01-15',
      description: 'Secure mobile banking application with biometric authentication',
      priority: 'high',
      category: 'Mobile Development'
    },
    {
      id: '3',
      name: 'Brand Identity Package',
      client: 'Creative Studio',
      status: 'completed',
      progress: 100,
      tasks: 8,
      completedTasks: 8,
      budget: 5500,
      deadline: '2024-01-20',
      startDate: '2023-12-01',
      description: 'Complete brand identity design including logo, guidelines, and assets',
      priority: 'medium',
      category: 'Design'
    },
    {
      id: '4',
      name: 'SaaS Dashboard',
      client: 'DataViz Pro',
      status: 'active',
      progress: 40,
      tasks: 25,
      completedTasks: 10,
      budget: 22000,
      deadline: '2024-04-15',
      startDate: '2024-01-20',
      deploymentUrl: 'https://demo-saas.vercel.app',
      description: 'Analytics dashboard with real-time data visualization',
      priority: 'medium',
      category: 'Web Development'
    },
    {
      id: '5',
      name: 'Marketing Website',
      client: 'StartupX',
      status: 'on-hold',
      progress: 25,
      tasks: 12,
      completedTasks: 3,
      budget: 8000,
      deadline: '2024-03-30',
      startDate: '2024-01-25',
      description: 'Marketing website with lead generation features',
      priority: 'low',
      category: 'Web Development'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || project.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700', 
          icon: <Play className="w-3 h-3" />
        };
      case 'completed': 
        return { 
          color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700', 
          icon: <CheckCircle className="w-3 h-3" />
        };
      case 'on-hold': 
        return { 
          color: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700', 
          icon: <Pause className="w-3 h-3" />
        };
      default: 
        return { 
          color: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600', 
          icon: <Clock className="w-3 h-3" />
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const handleAction = (action: string, projectName: string) => {
    toast.success(`${action} action for ${projectName}`);
  };

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-slate-100'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'}`}>
              Projects
            </h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Manage and track all your projects in one place
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 w-64 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white/90 border-slate-200'}`}
              />
            </div>
            
            <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            
            <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Projects</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {projectStats.total}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Projects</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {projectStats.active}
                  </p>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Play className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Budget</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    ${projectStats.totalBudget.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Avg Progress</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {projectStats.avgProgress}%
                  </p>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <TabsTrigger value="all">All Projects ({projectStats.total})</TabsTrigger>
            <TabsTrigger value="active">Active ({projectStats.active})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({projectStats.completed})</TabsTrigger>
            <TabsTrigger value="on-hold">On Hold ({projectStats.onHold})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const statusConfig = getStatusConfig(project.status);
                
                return (
                  <Card key={project.id} className={`group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-slate-800'} line-clamp-1`}>
                              {project.name}
                            </CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusConfig.color}>
                              {statusConfig.icon}
                              <span className="ml-1">{project.status.replace('-', ' ')}</span>
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(project.priority)}>
                              {project.priority}
                            </Badge>
                          </div>
                          <CardDescription className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} line-clamp-2`}>
                            {project.description}
                          </CardDescription>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className={darkMode ? 'bg-slate-800 border-slate-700' : ''}>
                            <DropdownMenuItem onClick={() => handleAction('Edit', project.name)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('Share', project.name)}>
                              <Share className="w-4 h-4 mr-2" />
                              Share with Client
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('Delete', project.name)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Client Info */}
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {project.client}
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Progress</span>
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className={`h-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-slate-200 dark:border-slate-700">
                        <div className="text-center">
                          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {project.completedTasks}/{project.tasks}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Tasks
                          </p>
                        </div>
                        <div className="text-center">
                          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            ${project.budget.toLocaleString()}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Budget
                          </p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Started:</span>
                          <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {new Date(project.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Deadline:</span>
                          <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {new Date(project.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className={`flex-1 ${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}`}
                          onClick={() => handleAction('Manage', project.name)}
                        >
                          <Edit className="w-3 h-3 mr-2" />
                          Manage
                        </Button>
                        {project.deploymentUrl && (
                          <Button 
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
                            onClick={() => window.open(project.deploymentUrl, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3 mr-2" />
                            View Live
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Calendar className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  No projects found
                </h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-4`}>
                  {searchTerm ? 'Try adjusting your search terms or filters.' : 'Start by creating your first project.'}
                </p>
                {!searchTerm && (
                  <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Project
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}