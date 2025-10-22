'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  Download,
  PiggyBank,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { CashFlowItem } from '@/lib/types'

export function CashFlowSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedYear, setSelectedYear] = useState('2024')

  // Dados mockados para demonstração
  const monthlyData = [
    { month: 'Jan', income: 45000, expenses: 18000, net: 27000 },
    { month: 'Fev', income: 52000, expenses: 22000, net: 30000 },
    { month: 'Mar', income: 38000, expenses: 19000, net: 19000 },
    { month: 'Abr', income: 65000, expenses: 25000, net: 40000 },
    { month: 'Mai', income: 58000, expenses: 21000, net: 37000 },
    { month: 'Jun', income: 72000, expenses: 28000, net: 44000 },
    { month: 'Jul', income: 48000, expenses: 23000, net: 25000 },
    { month: 'Ago', income: 61000, expenses: 26000, net: 35000 },
    { month: 'Set', income: 55000, expenses: 24000, net: 31000 },
    { month: 'Out', income: 69000, expenses: 27000, net: 42000 },
    { month: 'Nov', income: 63000, expenses: 25000, net: 38000 },
    { month: 'Dez', income: 75000, expenses: 30000, net: 45000 }
  ]

  const weeklyData = [
    { week: 'Sem 1', income: 12000, expenses: 5000, net: 7000 },
    { week: 'Sem 2', income: 15000, expenses: 6500, net: 8500 },
    { week: 'Sem 3', income: 18000, expenses: 7200, net: 10800 },
    { week: 'Sem 4', income: 14000, expenses: 5800, net: 8200 }
  ]

  const dailyData = [
    { day: '01', income: 2500, expenses: 800, net: 1700 },
    { day: '02', income: 0, expenses: 1200, net: -1200 },
    { day: '03', income: 8000, expenses: 600, net: 7400 },
    { day: '04', income: 0, expenses: 900, net: -900 },
    { day: '05', income: 15000, expenses: 2000, net: 13000 },
    { day: '06', income: 0, expenses: 400, net: -400 },
    { day: '07', income: 0, expenses: 300, net: -300 }
  ]

  const categoryData = [
    { name: 'Projetos Residenciais', value: 180000, color: '#10b981' },
    { name: 'Projetos Comerciais', value: 120000, color: '#3b82f6' },
    { name: 'Consultorias', value: 45000, color: '#8b5cf6' },
    { name: 'Reformas', value: 35000, color: '#f59e0b' }
  ]

  const expenseCategories = [
    { name: 'Aluguel', value: 42000, color: '#ef4444' },
    { name: 'Salários', value: 54000, color: '#f97316' },
    { name: 'Software', value: 14400, color: '#eab308' },
    { name: 'Suprimentos', value: 8500, color: '#84cc16' },
    { name: 'Consultoria', value: 16800, color: '#06b6d4' },
    { name: 'Outros', value: 12300, color: '#8b5cf6' }
  ]

  const upcomingCashFlow = [
    {
      id: '1',
      date: '2024-01-25',
      description: 'Recebimento - Projeto Santos (2ª parcela)',
      amount: 20000,
      type: 'income' as const,
      status: 'projected' as const
    },
    {
      id: '2',
      date: '2024-01-28',
      description: 'Pagamento - Aluguel escritório',
      amount: 3500,
      type: 'expense' as const,
      status: 'projected' as const
    },
    {
      id: '3',
      date: '2024-01-30',
      description: 'Recebimento - Projeto ABC (entrada)',
      amount: 32000,
      type: 'income' as const,
      status: 'projected' as const
    },
    {
      id: '4',
      date: '2024-02-05',
      description: 'Pagamento - Salários',
      amount: 18000,
      type: 'expense' as const,
      status: 'projected' as const
    }
  ]

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'daily':
        return dailyData
      case 'weekly':
        return weeklyData
      case 'monthly':
      default:
        return monthlyData
    }
  }

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0)
  const netProfit = totalIncome - totalExpenses
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1)

  const projectedIncome = upcomingCashFlow
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)

  const projectedExpenses = upcomingCashFlow
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Fluxo de Caixa
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Acompanhe entradas, saídas e projeções financeiras
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Total de Entradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalIncome.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <TrendingUp className="w-4 h-4" />
              +12.5% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Total de Saídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalExpenses.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <TrendingDown className="w-4 h-4" />
              +8.3% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Lucro Líquido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {netProfit.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <PiggyBank className="w-4 h-4" />
              {profitMargin}% margem
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Projeção 30 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(projectedIncome - projectedExpenses).toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <Calendar className="w-4 h-4" />
              Próximos 30 dias
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Fluxo de Caixa - {selectedPeriod === 'daily' ? 'Diário' : selectedPeriod === 'weekly' ? 'Semanal' : 'Mensal'}
            </CardTitle>
            <CardDescription>
              Comparativo entre entradas, saídas e lucro líquido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey={selectedPeriod === 'daily' ? 'day' : selectedPeriod === 'weekly' ? 'week' : 'month'} 
                    className="text-xs"
                  />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                    labelFormatter={(label) => `Período: ${label}`}
                  />
                  <Bar dataKey="income" fill="#10b981" name="Entradas" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#ef4444" name="Saídas" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="net" fill="#3b82f6" name="Lucro Líquido" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Income by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-emerald-600" />
              Receitas por Categoria
            </CardTitle>
            <CardDescription>
              Distribuição das receitas por tipo de projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    R$ {item.value.toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expenses by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Despesas por Categoria
            </CardTitle>
            <CardDescription>
              Distribuição dos gastos operacionais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {expenseCategories.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    R$ {item.value.toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Cash Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Projeções dos Próximos 30 Dias
          </CardTitle>
          <CardDescription>
            Movimentações financeiras programadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingCashFlow.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    item.type === 'income' 
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                  }`}>
                    {item.type === 'income' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {item.description}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(item.date).toLocaleDateString('pt-BR')} • 
                      <Badge variant="outline" className="ml-2 text-xs">
                        Projetado
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className={`font-bold text-lg ${
                  item.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {item.type === 'income' ? '+' : '-'}R$ {item.amount.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  Saldo Projetado (30 dias)
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Baseado nas movimentações programadas
                </p>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                R$ {(projectedIncome - projectedExpenses).toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}