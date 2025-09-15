import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Clock, 
  Target,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

export default function Analytics() {
  const [darkMode] = useState(document.documentElement.classList.contains('dark'));

  const stats = [
    {
      title: "Total Revenue",
      value: "$58,000",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "emerald"
    },
    {
      title: "Active Projects",
      value: "24",
      change: "+3",
      trend: "up", 
      icon: <Target className="w-5 h-5" />,
      color: "blue"
    },
    {
      title: "Total Clients",
      value: "18",
      change: "+2",
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "purple"
    },
    {
      title: "Avg. Project Time",
      value: "14 days",
      change: "-2 days",
      trend: "down",
      icon: <Clock className="w-5 h-5" />,
      color: "orange"
    }
  ];

  const recentProjects = [
    { name: "E-commerce Platform", client: "TechCorp", revenue: "$12,500", status: "completed", progress: 100 },
    { name: "Mobile Banking App", client: "FinanceFlow", revenue: "$18,000", status: "active", progress: 85 },
    { name: "Brand Identity", client: "Creative Studio", revenue: "$5,500", status: "completed", progress: 100 },
    { name: "SaaS Dashboard", client: "DataViz Pro", revenue: "$22,000", status: "active", progress: 60 }
  ];

  const monthlyData = [
    { month: "Jan", revenue: 4200, projects: 3 },
    { month: "Feb", revenue: 5800, projects: 4 },
    { month: "Mar", revenue: 7200, projects: 5 },
    { month: "Apr", revenue: 6500, projects: 4 },
    { month: "May", revenue: 8900, projects: 6 },
    { month: "Jun", revenue: 12400, projects: 8 }
  ];

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-slate-100'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'}`}>
              Analytics
            </h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Track your business performance and insights
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-lg transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                    <div className={`text-${stat.color}-600 dark:text-${stat.color}-400`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-orange-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {stat.value}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                    {stat.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className={`${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    <BarChart3 className="w-5 h-5" />
                    Monthly Revenue
                  </CardTitle>
                  <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Revenue trends over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {data.month}
                        </span>
                        <div className="flex items-center gap-4 flex-1 mx-4">
                          <Progress 
                            value={(data.revenue / 15000) * 100} 
                            className={`flex-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
                          />
                        </div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          ${data.revenue.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Status */}
              <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    <Target className="w-5 h-5" />
                    Project Status
                  </CardTitle>
                  <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Current project distribution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Active</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className={`w-24 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>18</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Completed</span>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className={`w-24 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>12</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>On Hold</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className={`w-24 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Projects Table */}
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Recent Projects</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Latest project performance and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
                      <div className="space-y-1">
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {project.name}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {project.client}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {project.revenue}
                          </p>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className={`w-16 h-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {project.progress}%
                            </span>
                          </div>
                        </div>
                        
                        <Badge 
                          variant={project.status === 'completed' ? 'default' : 'secondary'}
                          className={project.status === 'completed' ? 'bg-emerald-600' : ''}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Revenue Analytics</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Detailed revenue breakdown and forecasting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Revenue Analytics Coming Soon
                  </h3>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} max-w-md mx-auto`}>
                    Advanced revenue analytics and forecasting tools will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Project Analytics</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Project performance metrics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Project Analytics Coming Soon
                  </h3>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} max-w-md mx-auto`}>
                    Detailed project analytics including time tracking, efficiency metrics, and performance insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Client Analytics</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Client relationship metrics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Client Analytics Coming Soon
                  </h3>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} max-w-md mx-auto`}>
                    Client satisfaction scores, retention rates, and relationship insights will be available soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}