import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  MessageSquare
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function Clients() {
  const [darkMode] = useState(document.documentElement.classList.contains('dark'));
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: '1',
      name: 'TechCorp Inc.',
      email: 'contact@techcorp.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      avatar: 'TC',
      status: 'active',
      projects: 3,
      totalValue: 25000,
      lastContact: '2024-01-15',
      joinDate: '2023-08-15',
      color: 'blue'
    },
    {
      id: '2', 
      name: 'FinanceFlow',
      email: 'hello@financeflow.io',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      avatar: 'FF',
      status: 'active',
      projects: 2,
      totalValue: 32000,
      lastContact: '2024-01-12',
      joinDate: '2023-09-20',
      color: 'emerald'
    },
    {
      id: '3',
      name: 'Creative Studio',
      email: 'team@creativestudio.com',
      phone: '+1 (555) 456-7890',
      location: 'Los Angeles, CA',
      avatar: 'CS',
      status: 'completed',
      projects: 1,
      totalValue: 8500,
      lastContact: '2023-12-20',
      joinDate: '2023-06-10',
      color: 'purple'
    },
    {
      id: '4',
      name: 'DataViz Pro',
      email: 'info@datavizpro.com',
      phone: '+1 (555) 321-0987',
      location: 'Seattle, WA',
      avatar: 'DV',
      status: 'active',
      projects: 4,
      totalValue: 45000,
      lastContact: '2024-01-10',
      joinDate: '2023-07-05',
      color: 'orange'
    },
    {
      id: '5',
      name: 'StartupX',
      email: 'founders@startupx.co',
      phone: '+1 (555) 654-3210',
      location: 'Austin, TX',
      avatar: 'SX',
      status: 'prospect',
      projects: 0,
      totalValue: 0,
      lastContact: '2024-01-08',
      joinDate: '2024-01-08',
      color: 'indigo'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'prospect': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const handleAction = (action: string, clientName: string) => {
    toast.success(`${action} action for ${clientName}`);
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-slate-100'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'}`}>
              Clients
            </h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Manage your client relationships and communications
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 w-64 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white/90 border-slate-200'}`}
              />
            </div>
            
            <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Clients</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {clients.length}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Clients</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {clients.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-md transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Revenue</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    ${clients.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
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
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Avg. Project Value</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    ${Math.round(clients.reduce((sum, c) => sum + c.totalValue, 0) / clients.filter(c => c.projects > 0).length).toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className={`group ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className={`w-12 h-12 bg-gradient-to-r from-${client.color}-500 to-${client.color}-600`}>
                      <AvatarFallback className="text-white font-semibold">
                        {client.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {client.name}
                      </CardTitle>
                      <Badge className={`${getStatusColor(client.status)} text-xs`}>
                        {client.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={darkMode ? 'bg-slate-800 border-slate-700' : ''}>
                      <DropdownMenuItem onClick={() => handleAction('Edit', client.name)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Message', client.name)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Delete', client.name)} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Client
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} truncate`}>
                      {client.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {client.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {client.location}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-slate-200 dark:border-slate-700">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {client.projects}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Projects
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      ${client.totalValue.toLocaleString()}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Total Value
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Joined {new Date(client.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3 h-3 text-slate-400" />
                    <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Last contact {new Date(client.lastContact).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className={`flex-1 ${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}`}
                    onClick={() => handleAction('Contact', client.name)}
                  >
                    <Mail className="w-3 h-3 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
                    onClick={() => handleAction('View Projects', client.name)}
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              No clients found
            </h3>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-4`}>
              {searchTerm ? 'Try adjusting your search terms.' : 'Start by adding your first client.'}
            </p>
            {!searchTerm && (
              <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Client
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}