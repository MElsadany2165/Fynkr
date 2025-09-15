import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, DollarSign, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  description: string;
  method?: 'stripe' | 'paypal';
  paidAt?: string;
}

interface PaymentIntegrationProps {
  projectId: string;
}

export default function PaymentIntegration({ projectId }: PaymentIntegrationProps) {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      amount: 2500,
      status: 'paid',
      dueDate: '2024-01-30',
      description: 'Initial project payment (50%)',
      method: 'stripe',
      paidAt: '2024-01-28'
    },
    {
      id: '2',
      amount: 1500,
      status: 'pending',
      dueDate: '2024-02-28',
      description: 'Milestone 2 payment (30%)',
    },
    {
      id: '3',
      amount: 1000,
      status: 'pending',
      dueDate: '2024-03-15',
      description: 'Final payment (20%)',
    }
  ]);

  const [newInvoice, setNewInvoice] = useState({
    amount: '',
    description: '',
    dueDate: ''
  });

  const handleCreateInvoice = () => {
    if (!newInvoice.amount || !newInvoice.description || !newInvoice.dueDate) {
      toast.error('Please fill in all fields');
      return;
    }

    const invoice: Payment = {
      id: Date.now().toString(),
      amount: parseFloat(newInvoice.amount),
      status: 'pending',
      dueDate: newInvoice.dueDate,
      description: newInvoice.description
    };

    setPayments(prev => [...prev, invoice]);
    setNewInvoice({ amount: '', description: '', dueDate: '' });
    toast.success('Invoice created successfully!');
  };

  const handlePaymentAction = (paymentId: string, action: 'stripe' | 'paypal') => {
    // Simulate payment processing
    toast.success(`Redirecting to ${action} payment gateway...`);
    
    // In a real app, this would integrate with actual payment processors
    setTimeout(() => {
      setPayments(prev => prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: 'paid' as const, method: action, paidAt: new Date().toISOString() }
          : payment
      ));
      toast.success('Payment processed successfully!');
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Paid</p>
                <p className="text-2xl font-bold text-green-800">${paidAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-800">${pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Project</p>
                <p className="text-2xl font-bold text-blue-800">${totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Invoice */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Create New Invoice
          </CardTitle>
          <CardDescription>
            Generate invoices for project milestones and payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1000"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Milestone payment"
                value={newInvoice.description}
                onChange={(e) => setNewInvoice(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleCreateInvoice}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Create Invoice
          </Button>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Track all project payments and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div key={payment.id}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors space-y-3 lg:space-y-0">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(payment.status)}
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                        {payment.paidAt && (
                          <span>Paid: {new Date(payment.paidAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-semibold">${payment.amount.toLocaleString()}</div>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                    
                    {payment.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handlePaymentAction(payment.id, 'stripe')}
                          className="bg-[#635bff] hover:bg-[#5a54e6] text-white"
                        >
                          Pay with Stripe
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handlePaymentAction(payment.id, 'paypal')}
                          className="bg-[#0070ba] hover:bg-[#005ea6] text-white"
                        >
                          Pay with PayPal
                        </Button>
                      </div>
                    )}
                    
                    {payment.method && (
                      <Badge variant="outline" className="capitalize">
                        {payment.method}
                      </Badge>
                    )}
                  </div>
                </div>
                {index < payments.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}