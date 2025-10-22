'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Receipt,
  Calendar,
  Building,
  Car,
  Laptop,
  Home,
  Users,
  Calculator,
  Wrench,
  Plane,
  MoreHorizontal
} from 'lucide-react'
import { Expense } from '@/lib/types'

export function ExpensesSection() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Aluguel do escritório',
      amount: 3500,
      category: 'rent',
      project_id: null,
      due_date: '2024-01-10',
      paid_date: '2024-01-10',
      payment_method: 'ted',
      status: 'paid',
      notes: 'Pagamento mensal do aluguel',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '2',
      description: 'Licença AutoCAD',
      amount: 1200,
      category: 'software',
      project_id: null,
      due_date: '2024-01-15',
      paid_date: '2024-01-15',
      payment_method: 'cartao',
      status: 'paid',
      notes: 'Renovação anual da licença',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '3',
      description: 'Impressões e plotagens - Projeto Santos',
      amount: 450,
      category: 'supplies',
      project_id: '1',
      due_date: '2024-01-20',
      paid_date: null,
      payment_method: 'pix',
      status: 'pending',
      notes: 'Impressões para apresentação do projeto',
      created_at: '2024-01-18T00:00:00Z',
      updated_at: '2024-01-18T00:00:00Z',
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
      }
    },
    {
      id: '4',
      description: 'Salário - Arquiteto Júnior',
      amount: 4500,
      category: 'salary',
      project_id: null,
      due_date: '2024-01-05',
      paid_date: null,
      payment_method: 'ted',
      status: 'overdue',
      notes: 'Salário mensal',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '5',
      description: 'Consultoria estrutural - Projeto ABC',
      amount: 2800,
      category: 'consulting',
      project_id: '2',
      due_date: '2024-01-25',
      paid_date: null,
      payment_method: 'ted',
      status: 'pending',
      notes: 'Consultoria para projeto comercial',
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
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
      }
    }
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getCategoryIcon = (category: string) => {
    const icons = {
      rent: Home,
      software: Laptop,
      supplies: Receipt,
      salary: Users,
      taxes: Calculator,
      equipment: Wrench,
      travel: Plane,
      consulting: Building,
      other: MoreHorizontal
    }
    return icons[category as keyof typeof icons] || MoreHorizontal
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      rent: 'Aluguel',
      software: 'Software',
      supplies: 'Suprimentos',
      salary: 'Salários',
      taxes: 'Impostos',
      equipment: 'Equipamentos',
      travel: 'Viagens',
      consulting: 'Consultoria',
      other: 'Outros'
    }
    return labels[category as keyof typeof labels] || category
  }

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

  const totalPaid = expenses
    .filter(e => e.status === 'paid')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalPending = expenses
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalOverdue = expenses
    .filter(e => e.status === 'overdue')
    .reduce((sum, e) => sum + e.amount, 0)

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Gestão de Despesas
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Controle despesas operacionais e custos por projeto
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Despesa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Despesa</DialogTitle>
              <DialogDescription>
                Registre uma nova despesa operacional ou custo de projeto
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" placeholder="Descreva a despesa..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <Input id="amount" placeholder="R$ 0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Aluguel</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="supplies">Suprimentos</SelectItem>
                    <SelectItem value="salary">Salários</SelectItem>
                    <SelectItem value="taxes">Impostos</SelectItem>
                    <SelectItem value="equipment">Equipamentos</SelectItem>
                    <SelectItem value="travel">Viagens</SelectItem>
                    <SelectItem value="consulting">Consultoria</SelectItem>
                    <SelectItem value="other">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Projeto (Opcional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Despesa geral</SelectItem>
                    <SelectItem value="1">Projeto Residencial Santos</SelectItem>
                    <SelectItem value="2">Projeto Comercial ABC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Data de Vencimento</Label>
                <Input id="due_date" type="date" />
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
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="overdue">Em Atraso</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Observações sobre a despesa..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-red-500 to-pink-600">
                Cadastrar Despesa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Total Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalPaid.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <CheckCircle className="w-4 h-4" />
              {expenses.filter(e => e.status === 'paid').length} despesas
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              A Pagar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalPending.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <Clock className="w-4 h-4" />
              {expenses.filter(e => e.status === 'pending').length} pendentes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
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
              {expenses.filter(e => e.status === 'overdue').length} em atraso
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Total Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <TrendingDown className="w-4 h-4" />
              {expenses.length} despesas
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
          <CardDescription>
            Distribuição dos gastos por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(expensesByCategory).map(([category, amount]) => {
              const Icon = getCategoryIcon(category)
              return (
                <div key={category} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 rounded-full">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {getCategoryLabel(category)}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {expenses.filter(e => e.category === category).length} despesas
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-red-600">
                    R$ {amount.toLocaleString('pt-BR')}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Despesas</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as despesas cadastradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => {
                  const CategoryIcon = getCategoryIcon(expense.category)
                  return (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 rounded-full">
                            <CategoryIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {expense.description}
                            </div>
                            {expense.notes && (
                              <div className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                {expense.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getCategoryLabel(expense.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {expense.project ? (
                          <div className="text-sm">
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {expense.project.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">Despesa geral</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-red-600">
                        R$ {expense.amount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className={`text-sm ${
                            expense.status === 'overdue' 
                              ? 'text-red-600 font-medium' 
                              : 'text-slate-600 dark:text-slate-400'
                          }`}>
                            {new Date(expense.due_date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        {expense.status === 'overdue' && (
                          <div className="text-xs text-red-600 mt-1">
                            {getDaysOverdue(expense.due_date)} dias em atraso
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {expense.paid_date ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {new Date(expense.paid_date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        ) : (
                          <Badge variant="outline">
                            {getPaymentMethodLabel(expense.payment_method)}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(expense.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {expense.status !== 'paid' && (
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
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}