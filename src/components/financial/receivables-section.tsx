'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Receipt,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react'
import { Receivable } from '@/lib/types'

export function ReceivablesSection() {
  const [receivables, setReceivables] = useState<Receivable[]>([
    {
      id: '1',
      contract_id: '1',
      installment_id: '1',
      amount: 15000,
      due_date: '2024-01-15',
      received_date: '2024-01-15',
      payment_method: 'pix',
      status: 'paid',
      notes: 'Pagamento recebido via PIX',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
      contract: {
        id: '1',
        project_id: '1',
        client_id: '1',
        total_value: 50000,
        payment_method: 'pix',
        installments: 3,
        terms: '',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        project: {
          id: '1',
          name: 'Projeto Residencial Santos',
          description: 'Casa moderna de 200m²',
          client_id: '1',
          status: 'in_progress',
          start_date: '2024-01-01',
          end_date: '2024-06-01',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        client: {
          id: '1',
          name: 'Maria Silva',
          email: 'maria@email.com',
          phone: '(11) 99999-9999',
          company: 'Pessoa Física',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      }
    },
    {
      id: '2',
      contract_id: '1',
      installment_id: '2',
      amount: 20000,
      due_date: '2024-02-15',
      received_date: null,
      payment_method: 'pix',
      status: 'pending',
      notes: '',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      contract: {
        id: '1',
        project_id: '1',
        client_id: '1',
        total_value: 50000,
        payment_method: 'pix',
        installments: 3,
        terms: '',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        project: {
          id: '1',
          name: 'Projeto Residencial Santos',
          description: 'Casa moderna de 200m²',
          client_id: '1',
          status: 'in_progress',
          start_date: '2024-01-01',
          end_date: '2024-06-01',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        client: {
          id: '1',
          name: 'Maria Silva',
          email: 'maria@email.com',
          phone: '(11) 99999-9999',
          company: 'Pessoa Física',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      }
    },
    {
      id: '3',
      contract_id: '2',
      installment_id: '3',
      amount: 5000,
      due_date: '2024-01-05',
      received_date: null,
      payment_method: 'ted',
      status: 'overdue',
      notes: 'Cliente contatado em 10/01',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
      contract: {
        id: '2',
        project_id: '2',
        client_id: '2',
        total_value: 80000,
        payment_method: 'ted',
        installments: 4,
        terms: '',
        status: 'active',
        created_at: '2024-01-05T00:00:00Z',
        updated_at: '2024-01-05T00:00:00Z',
        project: {
          id: '2',
          name: 'Projeto Comercial ABC',
          description: 'Escritório corporativo 500m²',
          client_id: '2',
          status: 'planning',
          start_date: '2024-02-01',
          end_date: '2024-08-01',
          created_at: '2024-01-05T00:00:00Z',
          updated_at: '2024-01-05T00:00:00Z'
        },
        client: {
          id: '2',
          name: 'João Santos',
          email: 'joao@empresa.com',
          phone: '(11) 88888-8888',
          company: 'Empresa XYZ Ltda',
          created_at: '2024-01-05T00:00:00Z',
          updated_at: '2024-01-05T00:00:00Z'
        }
      }
    }
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const, icon: Clock },
      paid: { label: 'Pago', variant: 'default' as const, icon: CheckCircle },
      overdue: { label: 'Em Atraso', variant: 'destructive' as const, icon: AlertTriangle },
      cancelled: { label: 'Cancelado', variant: 'outline' as const, icon: Clock }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      pix: 'PIX',
      ted: 'TED',
      boleto: 'Boleto',
      cartao: 'Cartão',
      dinheiro: 'Dinheiro'
    }
    return methods[method as keyof typeof methods] || method
  }

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const totalReceived = receivables
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + r.amount, 0)

  const totalPending = receivables
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0)

  const totalOverdue = receivables
    .filter(r => r.status === 'overdue')
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Controle de Recebimentos
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Acompanhe pagamentos, vencimentos e histórico de recebimentos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Receipt className="w-4 h-4 mr-2" />
            Gerar Recibo
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                <Plus className="w-4 h-4 mr-2" />
                Registrar Recebimento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Registrar Recebimento</DialogTitle>
                <DialogDescription>
                  Confirme o recebimento de um pagamento
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="receivable">Recebimento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o recebimento" />
                    </SelectTrigger>
                    <SelectContent>
                      {receivables.filter(r => r.status !== 'paid').map(receivable => (
                        <SelectItem key={receivable.id} value={receivable.id}>
                          {receivable.contract?.project?.name} - R$ {receivable.amount.toLocaleString('pt-BR')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="received_date">Data do Recebimento</Label>
                  <Input id="received_date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment_method">Forma de Pagamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="ted">TED</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                      <SelectItem value="cartao">Cartão</SelectItem>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Input id="notes" placeholder="Observações sobre o pagamento..." />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                  Confirmar Recebimento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Total Recebido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalReceived.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <CheckCircle className="w-4 h-4" />
              {receivables.filter(r => r.status === 'paid').length} pagamentos
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              A Receber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalPending.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <Clock className="w-4 h-4" />
              {receivables.filter(r => r.status === 'pending').length} pendentes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Em Atraso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalOverdue.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <AlertTriangle className="w-4 h-4" />
              {receivables.filter(r => r.status === 'overdue').length} em atraso
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Taxa de Recebimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((receivables.filter(r => r.status === 'paid').length / receivables.length) * 100).toFixed(1)}%
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <TrendingUp className="w-4 h-4" />
              Taxa de sucesso
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Receivables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Recebimentos</CardTitle>
          <CardDescription>
            Acompanhe todos os recebimentos programados e realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto / Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Recebimento</TableHead>
                  <TableHead>Forma de Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivables.map((receivable) => (
                  <TableRow key={receivable.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {receivable.contract?.project?.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {receivable.contract?.client?.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-emerald-600">
                      R$ {receivable.amount.toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className={`text-sm ${
                          receivable.status === 'overdue' 
                            ? 'text-red-600 font-medium' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {new Date(receivable.due_date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {receivable.status === 'overdue' && (
                        <div className="text-xs text-red-600 mt-1">
                          {getDaysOverdue(receivable.due_date)} dias em atraso
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {receivable.received_date ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(receivable.received_date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getPaymentMethodLabel(receivable.payment_method)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(receivable.status)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate">
                      {receivable.notes || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {receivable.status !== 'paid' && (
                          <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Receipt className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}