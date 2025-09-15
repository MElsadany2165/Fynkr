import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette, 
  Globe, 
  Save,
  Eye,
  EyeOff,
  Trash2,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('fynkr_dark_mode', JSON.stringify(!darkMode));
    toast.success(`Switched to ${!darkMode ? 'dark' : 'light'} mode`);
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-slate-100'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent'}`}>
            Settings
          </h1>
          <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Manage your account preferences and application settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Profile Information</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    A
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
                      Change Avatar
                    </Button>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>First Name</Label>
                    <Input defaultValue="Alex" className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''} />
                  </div>
                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Last Name</Label>
                    <Input defaultValue="Johnson" className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Email Address</Label>
                  <Input defaultValue="alex@fynkr.com" type="email" className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''} />
                </div>

                <div className="space-y-2">
                  <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Bio</Label>
                  <Input 
                    defaultValue="Professional freelancer specializing in web development and design" 
                    className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Phone</Label>
                    <Input defaultValue="+1 (555) 123-4567" className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''} />
                  </div>
                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Location</Label>
                    <Input defaultValue="San Francisco, CA" className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''} />
                  </div>
                </div>

                <Button onClick={() => handleSave('Profile')} className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Notification Preferences</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Choose how you want to be notified about updates and activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Email Notifications</Label>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>

                  <Separator className={darkMode ? 'bg-slate-700' : 'bg-slate-200'} />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Push Notifications</Label>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>

                  <Separator className={darkMode ? 'bg-slate-700' : 'bg-slate-200'} />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>SMS Notifications</Label>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Receive important updates via SMS
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>

                  <Separator className={darkMode ? 'bg-slate-700' : 'bg-slate-200'} />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Marketing Communications</Label>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Receive updates about new features and promotions
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave('Notification')} className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Password & Security</CardTitle>
                  <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Manage your password and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Current Password</Label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter current password"
                        className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>New Password</Label>
                      <Input 
                        type="password" 
                        placeholder="Enter new password"
                        className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Confirm Password</Label>
                      <Input 
                        type="password" 
                        placeholder="Confirm new password"
                        className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave('Password')} className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Two-Factor Authentication</CardTitle>
                  <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Authenticator App</p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Use an authenticator app to generate verification codes
                      </p>
                    </div>
                    <Badge variant="outline" className={darkMode ? 'border-slate-600 text-slate-400' : ''}>
                      Not Enabled
                    </Badge>
                  </div>
                  <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
                    Enable 2FA
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Current Plan</CardTitle>
                  <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Professional Plan</h3>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        $29/month • Billed monthly
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 py-4">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>∞</p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Projects</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>50GB</p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Storage</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>24/7</p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Support</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
                      Change Plan
                    </Button>
                    <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Payment Method</CardTitle>
                  <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Update your payment information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        ••••
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>•••• •••• •••• 4242</p>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
                      Edit
                    </Button>
                  </div>

                  <Button variant="outline" className={darkMode ? 'border-slate-600 text-slate-300' : ''}>
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Billing History</CardTitle>
                  <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Download your invoices and view payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['November 2024', 'October 2024', 'September 2024'].map((month) => (
                      <div key={month} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>Invoice - {month}</p>
                          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>$29.00 • Paid</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Appearance Settings</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Dark Mode</Label>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                  </div>

                  <Separator className={darkMode ? 'bg-slate-700' : 'bg-slate-200'} />

                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Sidebar Position</Label>
                    <Select defaultValue="left">
                      <SelectTrigger className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Accent Color</Label>
                    <div className="flex gap-2">
                      {['blue', 'emerald', 'purple', 'orange'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full bg-gradient-to-r from-${color}-600 to-${color}-700 border-2 border-white shadow-sm`}
                          onClick={() => toast.success(`Accent color changed to ${color}`)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSave('Appearance')} className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>General Preferences</CardTitle>
                <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Configure your general application preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time</SelectItem>
                        <SelectItem value="est">Eastern Standard Time</SelectItem>
                        <SelectItem value="cst">Central Standard Time</SelectItem>
                        <SelectItem value="mst">Mountain Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className={darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={() => handleSave('Preferences')} className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            <Card className={`mt-6 ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
              <CardHeader>
                <CardTitle className={`${darkMode ? 'text-red-400' : 'text-red-800'}`}>Danger Zone</CardTitle>
                <CardDescription className={`${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}