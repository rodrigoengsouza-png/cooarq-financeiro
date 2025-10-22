'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedClient, setSelectedClient] = useState('all')
  const [selectedProject, setSelectedProject] = useState('all')

  // Dados mockados para relatórios
  const revenueByProject = [
    { project: 'Residencial Santos', client: 'Maria Silva', revenue: 50000, costs: 18000, profit: 32000, margin: 64 },
    { project: 'Comercial ABC', client: 'Empresa XYZ', revenue: 80000, costs: 32000, profit: 48000, margin: 60 },
    { project: 'Reforma Escritório', client: 'João Santos', revenue: 25000, costs: 8000, profit: 17000, margin: 68 },
    { project: 'Corporativo Tech', client: 'TechCorp', revenue: 120000, costs: 45000, profit: 75000, margin: 62.5 }
  ]

  const revenueByClient = [
    { client: 'Maria Silva', projects: 2, revenue: 75000, avgTicket: 37500 },
    { client: 'Empresa XYZ', projects: 1, revenue: 80000, avgTicket: 80000 },
    { client: 'João Santos', projects: 3, revenue: 45000, avgTicket: 15000 },
    { client: 'TechCorp', projects: 1, revenue: 120000, avgTicket: 120000 }
  ]

  const monthlyPerformance = [
    { month: 'Jan', revenue: 45000, expenses: 18000, projects: 3, clients: 2 },
    { month: 'Fev', revenue: 52000, expenses: 22000, projects: 4, clients: 3 },
    { month: 'Mar', revenue: 38000, expenses: 19000, projects: 2, clients: 2 },
    { month: 'Abr', revenue: 65000, expenses: 25000, projects: 5, clients: 4 },
    { month: 'Mai', revenue: 58000, expenses: 21000, projects: 3, clients: 3 },
    { month: 'Jun', revenue: 72000, expenses: 28000, projects: 6, clients: 5 }
  ]

  const categoryBreakdown = [
    { category: 'Projetos Residenciais', value: 180000, percentage: 45, color: '#10b981' },
    { category: 'Projetos Comerciais', value: 120000, percentage: 30, color: '#3b82f6' },
    { category: 'Reformas', value: 60000, percentage: 15, color: '#8b5cf6' },
    { category: 'Consultorias', value: 40000, percentage: 10, color: '#f59e0b' }
  ]

  const kpiSummary = {
    totalRevenue: revenueByProject.reduce((sum, p) => sum + p.revenue, 0),
    totalProfit: revenueByProject.reduce((sum, p) => sum + p.profit, 0),
    averageMargin: revenueByProject.reduce((sum, p) => sum + p.margin, 0) / revenueByProject.length,
    totalProjects: revenueByProject.length,
    totalClients: new Set(revenueByProject.map(p => p.client)).size,
    averageTicket: revenueByProject.reduce((sum, p) => sum + p.revenue, 0) / revenueByProject.length
  }

  const exportReport = (type: string) => {
    // Simulação de exportação
    console.log(`Exportando relatório: ${type}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Relatórios e Análises
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Análises detalhadas de performance e rentabilidade
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filtros de Relatório
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os clientes</SelectItem>
                  <SelectItem value="maria">Maria Silva</SelectItem>
                  <SelectItem value="empresa">Empresa XYZ</SelectItem>
                  <SelectItem value="joao">João Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Projeto</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os projetos</SelectItem>
                  <SelectItem value="residencial">Residencial Santos</SelectItem>
                  <SelectItem value="comercial">Comercial ABC</SelectItem>
                  <SelectItem value="reforma">Reforma Escritório</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data Inicial</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 opacity-90" />
              <span className="text-xs font-medium opacity-90">Receita Total</span>
            </div>
            <div className="text-xl font-bold">
              R$ {kpiSummary.totalRevenue.toLocaleString('pt-BR')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 opacity-90" />
              <span className="text-xs font-medium opacity-90">Lucro Total</span>
            </div>
            <div className="text-xl font-bold">
              R$ {kpiSummary.totalProfit.toLocaleString('pt-BR')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 opacity-90" />
              <span className="text-xs font-medium opacity-90">Margem Média</span>
            </div>
            <div className="text-xl font-bold">
              {kpiSummary.averageMargin.toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 opacity-90" />
              <span className="text-xs font-medium opacity-90">Projetos</span>
            </div>
            <div className="text-xl font-bold">
              {kpiSummary.totalProjects}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 opacity-90" />
              <span className="text-xs font-medium opacity-90">Clientes</span>
            </div>
            <div className="text-xl font-bold">
              {kpiSummary.totalClients}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500 to-rose-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 opacity-90" />
              <span className="text-xs font-medium opacity-90">Ticket Médio</span>
            </div>
            <div className="text-xl font-bold">
              R$ {kpiSummary.averageTicket.toLocaleString('pt-BR')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm">
          <TabsTrigger value="projects">Por Projeto</TabsTrigger>
          <TabsTrigger value="clients">Por Cliente</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>

        {/* Projects Report */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Relatório de Rentabilidade por Projeto
              </CardTitle>
              <CardDescription>
                Análise detalhada de receita, custos e margem por projeto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Projeto</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Custos</TableHead>
                      <TableHead>Lucro</TableHead>
                      <TableHead>Margem</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueByProject.map((project, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                          {project.project}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">
                          {project.client}
                        </TableCell>
                        <TableCell className="font-medium text-emerald-600">
                          R$ {project.revenue.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-medium text-red-600">
                          R$ {project.costs.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-medium text-blue-600">
                          R$ {project.profit.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={project.margin > 60 ? 'default' : project.margin > 40 ? 'secondary' : 'destructive'}>
                            {project.margin}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Concluído
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients Report */}
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Relatório de Faturamento por Cliente
              </CardTitle>
              <CardDescription>
                Performance de faturamento e ticket médio por cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Projetos</TableHead>
                      <TableHead>Receita Total</TableHead>
                      <TableHead>Ticket Médio</TableHead>
                      <TableHead>Classificação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueByClient
                      .sort((a, b) => b.revenue - a.revenue)
                      .map((client, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                            {client.client}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {client.projects} projeto{client.projects > 1 ? 's' : ''}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-emerald-600">
                            R$ {client.revenue.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell className="font-medium text-blue-600">
                            R$ {client.avgTicket.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              client.revenue > 100000 ? 'default' : 
                              client.revenue > 50000 ? 'secondary' : 'outline'
                            }>
                              {client.revenue > 100000 ? 'Premium' : 
                               client.revenue > 50000 ? 'Gold' : 'Standard'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Report */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Performance Mensal
                </CardTitle>
                <CardDescription>
                  Evolução de receita e despesas ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="Receita"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        name="Despesas"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Projetos e Clientes
                </CardTitle>
                <CardDescription>
                  Quantidade de projetos e clientes por mês
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="projects" fill="#3b82f6" name="Projetos" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="clients" fill="#8b5cf6" name="Clientes" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Categories Report */}
        <TabsContent value="categories">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  Receita por Categoria
                </CardTitle>
                <CardDescription>
                  Distribuição da receita por tipo de projeto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento por Categoria</CardTitle>
                <CardDescription>
                  Valores e percentuais detalhados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryBreakdown.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            {category.category}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {category.percentage}% do total
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900 dark:text-slate-100">
                          R$ {category.value.toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}