import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Users, Calendar, DollarSign, ExternalLink, Search, Bell, Settings, TrendingUp } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import ClientInvite from '@/components/ClientInvite';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  tasks: number;
  completedTasks: number;
  budget: number;
  deploymentUrl?: string;
  createdAt: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    budget: '',
    deploymentUrl: ''
  });

  useEffect(() => {
    // Check dark mode from document class
    setDarkMode(document.documentElement.classList.contains('dark'));
    
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('fynkr_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Enhanced demo data
      const demoProjects: Project[] = [
        {
          id: '1',
          name: 'E-commerce Platform',
          client: 'TechCorp Inc.',
          status: 'active',
          progress: 85,
          tasks: 15,
          completedTasks: 13,
          budget: 12500,
          deploymentUrl: 'https://demo-ecommerce.vercel.app',
          createdAt: '2024-01-15'
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
          createdAt: '2024-02-01'
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
          createdAt: '2024-01-01'
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
          deploymentUrl: 'https://demo-saas.vercel.app',
          createdAt: '2024-02-10'
        }
      ];
      setProjects(demoProjects);
      localStorage.setItem('fynkr_projects', JSON.stringify(demoProjects));
    }
  }, []);

  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.client || !newProject.budget) {
      toast.error('Please fill in all required fields');
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      client: newProject.client,
      status: 'active',
      progress: 0,
      tasks: 0,
      completedTasks: 0,
      budget: parseFloat(newProject.budget),
      deploymentUrl: newProject.deploymentUrl || undefined,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem('fynkr_projects', JSON.stringify(updatedProjects));
    
    setNewProject({ name: '', client: '', budget: '', deploymentUrl: '' });
    setShowNewProjectDialog(false);
    toast.success('Project created successfully!', {
      description: 'Your new project is ready to manage!'
    });
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeProjects = projects.filter(p => p.status === 'active');
  const totalRevenue = projects.reduce((sum, p) => sum + p.budget, 0);
  const avgProgress = projects.length > 0 ? projects.reduce((sum, p) => sum + p.progress, 0) / projects.length : 0;
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks, 0);

  return (
    <div className={`min-h-screen transition-all duration-500 p-6 ${darkMode 
      ? 'bg-slate-900' 
      : 'bg-gradient-to-br from-gray-50 to-slate-100'}`}>
      
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-blue-400 to-indigo-500" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-emerald-400 to-teal-500" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'}`}>
              Dashboard
            </h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} max-w-md`}>
              Welcome back! Here's what's happening with your projects today.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Enhanced Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 w-64 backdrop-blur-sm border shadow-sm focus:border-blue-400 transition-colors ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-400' 
                    : 'bg-white/90 border-slate-200'
                }`}
              />
            </div>

            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm transition-all">
                  <Users className="w-4 h-4 mr-2" />
                  Invite Client
                </Button>
              </DialogTrigger>
              <DialogContent className={`backdrop-blur-sm border shadow-xl ${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/95 border-slate-200'
              }`}>
                <ClientInvite onClose={() => setShowInviteDialog(false)} />
              </DialogContent>
            </Dialog>
            
            <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className={`backdrop-blur-sm border shadow-xl ${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/95 border-slate-200'
              }`}>
                <DialogHeader>
                  <DialogTitle className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent'
                  }`}>
                    Create New Project
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName" className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Project Name *
                      </Label>
                      <Input
                        id="projectName"
                        placeholder="Amazing Website"
                        value={newProject.name}
                        onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                        className={`border transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-400' 
                            : 'border-slate-200 focus:border-blue-400'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientName" className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Client Name *
                      </Label>
                      <Input
                        id="clientName"
                        placeholder="Acme Corp"
                        value={newProject.client}
                        onChange={(e) => setNewProject(prev => ({ ...prev, client: e.target.value }))}
                        className={`border transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white focus:border-emerald-400' 
                            : 'border-slate-200 focus:border-emerald-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Budget ($) *
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="5000"
                        value={newProject.budget}
                        onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                        className={`border transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white focus:border-orange-400' 
                            : 'border-slate-200 focus:border-orange-400'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deploymentUrl" className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Live URL (Optional)
                      </Label>
                      <Input
                        id="deploymentUrl"
                        placeholder="https://client-site.com"
                        value={newProject.deploymentUrl}
                        onChange={(e) => setNewProject(prev => ({ ...prev, deploymentUrl: e.target.value }))}
                        className={`border transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white focus:border-indigo-400' 
                            : 'border-slate-200 focus:border-indigo-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowNewProjectDialog(false)} 
                      className={`flex-1 ${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200'}`}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateProject} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Create Project
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className={`backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group ${
            darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/90 border-slate-200'
          }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Active Projects
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/70 dark:group-hover:to-blue-700/70 transition-all">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {activeProjects.length}
              </div>
              <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className={`backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group ${
            darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/90 border-slate-200'
          }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Total Revenue
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 rounded-lg group-hover:from-emerald-200 group-hover:to-emerald-300 dark:group-hover:from-emerald-800/70 dark:group-hover:to-emerald-700/70 transition-all">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                ${totalRevenue.toLocaleString()}
              </div>
              <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card className={`backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group ${
            darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/90 border-slate-200'
          }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Avg Progress
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/50 dark:to-orange-800/50 rounded-lg group-hover:from-orange-200 group-hover:to-orange-300 dark:group-hover:from-orange-800/70 dark:group-hover:to-orange-700/70 transition-all">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                {Math.round(avgProgress)}%
              </div>
              <Progress value={avgProgress} className={`h-2 mt-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
            </CardContent>
          </Card>

          <Card className={`backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group ${
            darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/90 border-slate-200'
          }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Total Tasks
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 rounded-lg group-hover:from-indigo-200 group-hover:to-indigo-300 dark:group-hover:from-indigo-800/70 dark:group-hover:to-indigo-700/70 transition-all">
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {totalTasks}
              </div>
              <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                Across all projects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className={`text-2xl font-semibold ${
                darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'
              }`}>
                Recent Projects
              </h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <Button 
              variant="ghost" 
              className={`transition-all ${
                darkMode 
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20' 
                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
              }`}
              onClick={() => toast.success('📋 Viewing all projects!')}
            >
              View All <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} darkMode={darkMode} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-slate-100 to-slate-200'
              }`}>
                <Search className={`w-8 h-8 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`} />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                No projects found
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Try adjusting your search terms or create a new project.
              </p>
              <Button 
                onClick={() => setShowNewProjectDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Create Your First Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}