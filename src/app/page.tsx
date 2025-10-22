'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  CreditCard, 
  PiggyBank,
  BarChart3,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Filter,
  Download,
  Eye
} from 'lucide-react'
import { ContractsSection } from '@/components/financial/contracts-section'
import { ReceivablesSection } from '@/components/financial/receivables-section'
import { ExpensesSection } from '@/components/financial/expenses-section'
import { CashFlowSection } from '@/components/financial/cash-flow-section'
import { ReportsSection } from '@/components/financial/reports-section'
import { FinancialDashboard } from '@/components/financial/dashboard'

export default function FinancialModule() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Dados mockados para demonstração
  const kpis = {
    totalRevenue: 125000,
    totalExpenses: 45000,
    netProfit: 80000,
    profitMargin: 64,
    averageTicket: 25000,
    overdueRate: 8.5,
    monthlyGrowth: 12.3,
    activeContracts: 8
  }

  const recentTransactions = [
    {
      id: '1',
      type: 'income' as const,
      description: 'Pagamento - Projeto Residencial Santos',
      amount: 15000,
      date: '2024-01-15',
      status: 'confirmed' as const
    },
    {
      id: '2',
      type: 'expense' as const,
      description: 'Aluguel do escritório',
      amount: 3500,
      date: '2024-01-10',
      status: 'confirmed' as const
    },
    {
      id: '3',
      type: 'income' as const,
      description: 'Entrada - Projeto Comercial ABC',
      amount: 8000,
      date: '2024-01-08',
      status: 'confirmed' as const
    }
  ]

  const upcomingPayments = [
    {
      id: '1',
      description: 'Projeto Residencial - 2ª Parcela',
      amount: 12000,
      dueDate: '2024-01-25',
      status: 'pending' as const,
      client: 'Maria Silva'
    },
    {
      id: '2',
      description: 'Projeto Comercial - Aprovação',
      amount: 18000,
      dueDate: '2024-01-30',
      status: 'pending' as const,
      client: 'Empresa XYZ'
    }
  ]

  const overduePayments = [
    {
      id: '1',
      description: 'Projeto Reforma - Final',
      amount: 5000,
      dueDate: '2024-01-05',
      status: 'overdue' as const,
      client: 'João Santos',
      daysOverdue: 10
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                Módulo Financeiro
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Gestão financeira completa para escritórios de arquitetura
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Contratos</span>
            </TabsTrigger>
            <TabsTrigger value="receivables" className="flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Recebimentos</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span className="hidden sm:inline">Despesas</span>
            </TabsTrigger>
            <TabsTrigger value="cashflow" className="flex items-center gap-2 text-sm">
              <PiggyBank className="w-4 h-4" />
              <span className="hidden sm:inline">Fluxo de Caixa</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Relatórios</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <FinancialDashboard kpis={kpis} />
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">Receita Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {kpis.totalRevenue.toLocaleString('pt-BR')}</div>
                  <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +{kpis.monthlyGrowth}% este mês
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">Lucro Líquido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {kpis.netProfit.toLocaleString('pt-BR')}</div>
                  <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    {kpis.profitMargin}% margem
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {kpis.averageTicket.toLocaleString('pt-BR')}</div>
                  <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                    <FileText className="w-4 h-4" />
                    {kpis.activeContracts} contratos ativos
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">Taxa de Inadimplência</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.overdueRate}%</div>
                  <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                    <AlertTriangle className="w-4 h-4" />
                    {overduePayments.length} pagamentos em atraso
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Transações Recentes
                  </CardTitle>
                  <CardDescription>Últimas movimentações financeiras</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'income' 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400' 
                            : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                        }`}>
                          {transaction.type === 'income' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Payments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Próximos Recebimentos
                  </CardTitle>
                  <CardDescription>Pagamentos programados para os próximos dias</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 rounded-full">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {payment.description}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {payment.client} • Vence em {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">
                          R$ {payment.amount.toLocaleString('pt-BR')}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Pendente
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {overduePayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 rounded-full">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {payment.description}
                          </p>
                          <p className="text-sm text-red-600 dark:text-red-400">
                            {payment.client} • {payment.daysOverdue} dias em atraso
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">
                          R$ {payment.amount.toLocaleString('pt-BR')}
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          Em Atraso
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="contracts">
            <ContractsSection />
          </TabsContent>

          <TabsContent value="receivables">
            <ReceivablesSection />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpensesSection />
          </TabsContent>

          <TabsContent value="cashflow">
            <CashFlowSection />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}