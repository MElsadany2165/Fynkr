import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Settings, Users, CreditCard, CheckSquare } from 'lucide-react';
import TaskManager from '@/components/TaskManager';
import PaymentIntegration from '@/components/PaymentIntegration';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
  type: 'feature' | 'bug' | 'improvement';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  tasks: Task[];
  budget: number;
  deploymentUrl?: string;
  createdAt: string;
}

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load project from localStorage
    const savedProjects = localStorage.getItem('freelance_projects');
    if (savedProjects) {
      const projects = JSON.parse(savedProjects);
      const foundProject = projects.find((p: Project) => p.id === projectId);
      
      if (foundProject) {
        // Add tasks if not present
        if (!foundProject.tasks) {
          foundProject.tasks = [
            {
              id: '1',
              title: 'Set up project structure',
              status: 'completed',
              type: 'feature',
              priority: 'high',
              createdAt: '2024-01-16'
            },
            {
              id: '2',
              title: 'Design user interface',
              status: 'completed',
              type: 'feature',
              priority: 'high',
              createdAt: '2024-01-18'
            },
            {
              id: '3',
              title: 'Implement core functionality',
              status: 'in-progress',
              type: 'feature',
              priority: 'high',
              createdAt: '2024-01-22'
            },
            {
              id: '4',
              title: 'Add responsive design',
              status: 'todo',
              type: 'improvement',
              priority: 'medium',
              createdAt: '2024-02-01'
            },
            {
              id: '5',
              title: 'Fix navigation bug',
              status: 'todo',
              type: 'bug',
              priority: 'low',
              createdAt: '2024-02-05'
            }
          ];
        }
        setProject(foundProject);
      }
    }
  }, [projectId]);

  const handleTasksUpdate = (updatedTasks: Task[]) => {
    if (!project) return;

    const updatedProject = { ...project, tasks: updatedTasks };
    
    // Calculate progress based on completed tasks
    const completedTasks = updatedTasks.filter(task => task.status === 'completed').length;
    const totalTasks = updatedTasks.length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    updatedProject.progress = progress;
    setProject(updatedProject);

    // Update localStorage
    const savedProjects = localStorage.getItem('freelance_projects');
    if (savedProjects) {
      const projects = JSON.parse(savedProjects);
      const updatedProjects = projects.map((p: Project) => 
        p.id === projectId ? updatedProject : p
      );
      localStorage.setItem('freelance_projects', JSON.stringify(updatedProjects));
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="border-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {project.name}
              </h1>
              <p className="text-muted-foreground">Client: {project.client}</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => window.open(`/client/${project.id}`, '_blank')}
            className="border-2"
          >
            <Users className="w-4 h-4 mr-2" />
            Client View
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <TaskManager 
              projectId={project.id}
              tasks={project.tasks}
              onTasksUpdate={handleTasksUpdate}
            />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentIntegration projectId={project.id} />
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Settings Card */}
              <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Project Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Project Name</label>
                    <p className="text-lg">{project.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Client</label>
                    <p className="text-lg">{project.client}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <p className="text-lg capitalize">{project.status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Budget</label>
                    <p className="text-lg">${project.budget.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Client Access Card */}
              <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Client Access</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Client Portal URL</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 p-2 bg-gray-100 rounded text-sm">
                        {window.location.origin}/client/{project.id}
                      </code>
                      <Button
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/client/${project.id}`);
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  {project.deploymentUrl && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Live Site</label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-gray-100 rounded text-sm">
                          {project.deploymentUrl}
                        </code>
                        <Button
                          size="sm"
                          onClick={() => window.open(project.deploymentUrl, '_blank')}
                        >
                          Visit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}