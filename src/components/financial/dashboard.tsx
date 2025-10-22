'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  AlertTriangle,
  Target,
  Calendar
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FinancialKPI } from '@/lib/types'

interface FinancialDashboardProps {
  kpis: FinancialKPI
}

export function FinancialDashboard({ kpis }: FinancialDashboardProps) {
  // Dados mockados para gráficos
  const monthlyTrend = [
    { month: 'Jan', revenue: 45000, expenses: 18000, profit: 27000 },
    { month: 'Fev', revenue: 52000, expenses: 22000, profit: 30000 },
    { month: 'Mar', revenue: 38000, expenses: 19000, profit: 19000 },
    { month: 'Abr', revenue: 65000, expenses: 25000, profit: 40000 },
    { month: 'Mai', revenue: 58000, expenses: 21000, profit: 37000 },
    { month: 'Jun', revenue: 72000, expenses: 28000, profit: 44000 }
  ]

  const projectPerformance = [
    { project: 'Residencial A', budget: 50000, actual: 48000, margin: 36 },
    { project: 'Comercial B', budget: 80000, actual: 85000, margin: 42 },
    { project: 'Reforma C', budget: 25000, actual: 22000, margin: 28 },
    { project: 'Corporativo D', budget: 120000, actual: 115000, margin: 38 }
  ]

  const clientDistribution = [
    { segment: 'Residencial', value: 45, color: '#10b981' },
    { segment: 'Comercial', value: 30, color: '#3b82f6' },
    { segment: 'Corporativo', value: 20, color: '#8b5cf6' },
    { segment: 'Reforma', value: 5, color: '#f59e0b' }
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Receita Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {kpis.totalRevenue.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <TrendingUp className="w-4 h-4" />
              +{kpis.monthlyGrowth}% este mês
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Margem de Lucro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpis.profitMargin}%
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <BarChart3 className="w-4 h-4" />
              R$ {kpis.netProfit.toLocaleString('pt-BR')} líquido
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Ticket Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {kpis.averageTicket.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <Users className="w-4 h-4" />
              {kpis.activeContracts} contratos ativos
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Taxa de Inadimplência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpis.overdueRate}%
            </div>
            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
              <Calendar className="w-4 h-4" />
              Pagamentos em atraso
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Evolução Financeira (6 meses)
            </CardTitle>
            <CardDescription>
              Comparativo entre receitas, despesas e lucro líquido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="Receita"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                    name="Despesas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Lucro"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Performance por Projeto
            </CardTitle>
            <CardDescription>
              Orçado vs Realizado e margem de lucro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectPerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="project" type="category" className="text-xs" width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                  />
                  <Bar dataKey="budget" fill="#94a3b8" name="Orçado" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="actual" fill="#3b82f6" name="Realizado" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Client Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Distribuição por Segmento
            </CardTitle>
            <CardDescription>
              Percentual de receita por tipo de cliente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientDistribution.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{segment.segment}</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{segment.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${segment.value}%`, 
                        backgroundColor: segment.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Segmento mais rentável
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: clientDistribution[0].color }}
                />
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {clientDistribution[0].segment} ({clientDistribution[0].value}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              💡 Insight Positivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Crescimento de <strong>12.3%</strong> na receita mensal. 
              Projetos residenciais estão performando acima da média.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">
              📊 Análise de Tendência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Margem de lucro estável em <strong>64%</strong>. 
              Controle de custos eficiente nos últimos 3 meses.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">
              ⚠️ Ponto de Atenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Taxa de inadimplência em <strong>8.5%</strong>. 
              Considere revisar política de cobrança.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}