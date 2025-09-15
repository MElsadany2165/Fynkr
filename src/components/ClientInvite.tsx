import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Mail, User, Briefcase, Send, Sparkles, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface ClientInviteProps {
  onClose: () => void;
}

export default function ClientInvite({ onClose }: ClientInviteProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectName: '',
    message: '',
    accessLevel: 'view-only'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientEmail || !formData.projectName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate realistic API call with progress updates
    toast.loading('Preparing invitation...', { id: 'invite-process' });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.loading('Generating secure access link...', { id: 'invite-process' });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.loading('Sending email invitation...', { id: 'invite-process' });
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save invitation to localStorage with enhanced data
    const invitations = JSON.parse(localStorage.getItem('fynkr_client_invitations') || '[]');
    const newInvitation = {
      id: Date.now().toString(),
      ...formData,
      status: 'sent',
      invitedAt: new Date().toISOString(),
      inviteLink: `${window.location.origin}/client/${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      emailSent: true
    };
    
    invitations.push(newInvitation);
    localStorage.setItem('fynkr_client_invitations', JSON.stringify(invitations));

    setIsLoading(false);
    toast.success('🎉 Invitation sent successfully!', {
      id: 'invite-process',
      description: `${formData.clientName} will receive access instructions via email`,
      duration: 4000
    });
    
    // Reset form and close
    setFormData({
      clientName: '',
      clientEmail: '',
      projectName: '',
      message: '',
      accessLevel: 'view-only'
    });
    
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const generateSampleMessage = () => {
    const message = `Hi ${formData.clientName || '[Client Name]'},

I've set up a professional dashboard where you can track the real-time progress of your ${formData.projectName || '[Project Name]'} project.

You'll be able to see:
✅ Task completion status
📊 Project milestones
🚀 Live deployment links
💰 Payment schedules

This keeps you informed every step of the way!

Best regards,
Your Fynkr Team`;

    setFormData(prev => ({ ...prev, message }));
    toast.success('Sample message generated!');
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          Invite Client to Fynkr
        </DialogTitle>
        <DialogDescription className="text-base">
          Send your client a professional invitation to track their project progress in real-time
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Client Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="flex items-center gap-2 font-medium">
              <User className="w-4 h-4 text-blue-500" />
              Client Name *
            </Label>
            <Input
              id="clientName"
              placeholder="John Smith"
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              className="border-2 focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail" className="flex items-center gap-2 font-medium">
              <Mail className="w-4 h-4 text-purple-500" />
              Client Email *
            </Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="john@company.com"
              value={formData.clientEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
              className="border-2 focus:border-purple-400 transition-colors"
              required
            />
          </div>
        </div>

        {/* Project Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="flex items-center gap-2 font-medium">
              <Briefcase className="w-4 h-4 text-green-500" />
              Project Name *
            </Label>
            <Input
              id="projectName"
              placeholder="E-commerce Website Redesign"
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              className="border-2 focus:border-green-400 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-orange-500" />
              Access Level
            </Label>
            <Select value={formData.accessLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, accessLevel: value }))}>
              <SelectTrigger className="border-2 focus:border-orange-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view-only">👁️ View Only - See progress & updates</SelectItem>
                <SelectItem value="comment">💬 View & Comment - Add feedback</SelectItem>
                <SelectItem value="collaborate">🤝 Full Access - Complete collaboration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced Message Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="message" className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              Personal Message (Optional)
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateSampleMessage}
              className="text-xs hover:bg-blue-50 border-blue-200"
            >
              Generate Sample
            </Button>
          </div>
          <Textarea
            id="message"
            placeholder="Add a personal touch to your invitation..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={4}
            className="border-2 focus:border-cyan-400 transition-colors resize-none"
          />
        </div>

        {/* Preview Section */}
        {(formData.clientName || formData.projectName) && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Invitation Preview
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>To:</strong> {formData.clientName || 'Client Name'} ({formData.clientEmail || 'client@email.com'})</p>
              <p><strong>Project:</strong> {formData.projectName || 'Project Name'}</p>
              <p><strong>Access:</strong> {formData.accessLevel.replace('-', ' ').toUpperCase()}</p>
              <p><strong>Dashboard Link:</strong> fynkr.com/client/[unique-id]</p>
            </div>
          </div>
        )}

        {/* Enhanced Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-2 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending Invitation...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Professional Invitation
              </div>
            )}
          </Button>
        </div>
      </form>

      {/* Features Highlight */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">✨ What your client gets:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Real-time progress tracking
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Task completion updates
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            Payment schedule visibility
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            Live deployment links
          </div>
        </div>
      </div>
    </div>
  );
}