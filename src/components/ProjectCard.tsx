import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Calendar, CheckCircle, AlertCircle, Clock, MoreVertical, Edit, Trash2, Share } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
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

interface ProjectCardProps {
  project: Project;
  darkMode?: boolean;
}

export default function ProjectCard({ project, darkMode = false }: ProjectCardProps) {
  const navigate = useNavigate();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: darkMode 
            ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700' 
            : 'bg-emerald-100 text-emerald-700 border-emerald-200', 
          icon: <CheckCircle className="w-3 h-3" />
        };
      case 'completed': 
        return { 
          color: darkMode 
            ? 'bg-blue-900/50 text-blue-300 border-blue-700' 
            : 'bg-blue-100 text-blue-700 border-blue-200', 
          icon: <CheckCircle className="w-3 h-3" />
        };
      case 'on-hold': 
        return { 
          color: darkMode 
            ? 'bg-orange-900/50 text-orange-300 border-orange-700' 
            : 'bg-orange-100 text-orange-700 border-orange-200', 
          icon: <AlertCircle className="w-3 h-3" />
        };
      default: 
        return { 
          color: darkMode 
            ? 'bg-slate-700 text-slate-300 border-slate-600' 
            : 'bg-slate-100 text-slate-600 border-slate-200', 
          icon: <Clock className="w-3 h-3" />
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);

  const handleEdit = () => {
    toast.success('Edit project functionality activated!');
  };

  const handleDelete = () => {
    toast.success('Delete confirmation dialog would open here!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/client/${project.id}`);
    toast.success('Client link copied to clipboard!');
  };

  const handleManage = () => {
    navigate(`/project/${project.id}`);
    toast.success('Opening project management...');
  };

  const handleViewLive = () => {
    if (project.deploymentUrl) {
      window.open(project.deploymentUrl, '_blank');
      toast.success('Opening live site...');
    }
  };

  return (
    <Card className={`group relative backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
      darkMode 
        ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800/70' 
        : 'bg-white/90 border-slate-200'
    }`}>
      
      {/* Floating Action Menu */}
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-8 h-8 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border ${
                darkMode 
                  ? 'bg-slate-700/80 hover:bg-slate-700 border-slate-600 text-slate-300' 
                  : 'bg-white/80 hover:bg-white border-slate-200'
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`w-48 backdrop-blur-sm border shadow-lg ${
            darkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'
          }`}>
            <DropdownMenuItem onClick={handleEdit} className={`cursor-pointer ${
              darkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : ''
            }`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare} className={`cursor-pointer ${
              darkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : ''
            }`}>
              <Share className="w-4 h-4 mr-2" />
              Share with Client
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className={`cursor-pointer ${
              darkMode ? 'text-orange-400 hover:bg-orange-900/20 hover:text-orange-300' : 'text-orange-600'
            }`}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start pr-8">
          <div className="space-y-2">
            <CardTitle className={`text-lg font-semibold transition-colors duration-300 line-clamp-1 ${
              darkMode 
                ? 'text-white group-hover:text-blue-400' 
                : 'group-hover:text-blue-600'
            }`}>
              {project.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                darkMode ? 'bg-blue-500' : 'bg-blue-400'
              }`} />
              <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                {project.client}
              </span>
            </CardDescription>
          </div>
          
          <Badge className={`${statusConfig.color} flex items-center gap-1 capitalize font-medium px-3 py-1`}>
            {statusConfig.icon}
            {project.status.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section with Gradient */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Project Progress
            </span>
            <span className={`font-bold text-lg ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
            }`}>
              {project.progress}%
            </span>
          </div>
          <div className="relative">
            <Progress value={project.progress} className={`h-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className={`text-center p-3 rounded-lg border ${
            darkMode 
              ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600' 
              : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-100'
          }`}>
            <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              {project.completedTasks}/{project.tasks}
            </div>
            <div className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Tasks Done
            </div>
          </div>
          <div className={`text-center p-3 rounded-lg border ${
            darkMode 
              ? 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border-emerald-700' 
              : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-100'
          }`}>
            <div className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              ${project.budget.toLocaleString()}
            </div>
            <div className={`text-xs font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Budget
            </div>
          </div>
        </div>

        {/* Timeline with Accent Color */}
        <div className={`flex items-center gap-2 text-xs rounded-lg p-2 border ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-800 text-slate-400' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 text-slate-500'
        }`}>
          <Calendar className={`w-3 h-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <span>Started {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            onClick={handleManage}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm transition-all duration-300 font-medium"
          >
            <Edit className="w-3 h-3 mr-2" />
            Manage
          </Button>
          
          {project.deploymentUrl && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleViewLive}
              className={`px-3 border transition-all duration-300 shadow-sm ${
                darkMode 
                  ? 'border-emerald-700 text-emerald-400 hover:border-emerald-600 hover:bg-emerald-900/20' 
                  : 'border-emerald-200 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>

      {/* Subtle Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        darkMode 
          ? 'bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-emerald-600/5' 
          : 'bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-emerald-400/5'
      }`} />
    </Card>
  );
}