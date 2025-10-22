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
  FileText, 
  Edit, 
  Eye, 
  Trash2, 
  Calendar,
  DollarSign,
  User,
  Building
} from 'lucide-react'
import { Contract } from '@/lib/types'

export function ContractsSection() {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      project_id: '1',
      client_id: '1',
      total_value: 50000,
      payment_method: 'pix',
      installments: 3,
      terms: 'Pagamento em 3 parcelas: 30% na assinatura, 40% na aprovação do layout, 30% na entrega final',
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
    },
    {
      id: '2',
      project_id: '2',
      client_id: '2',
      total_value: 80000,
      payment_method: 'ted',
      installments: 4,
      terms: 'Pagamento em 4 parcelas mensais de R$ 20.000',
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
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Rascunho', variant: 'secondary' as const },
      active: { label: 'Ativo', variant: 'default' as const },
      completed: { label: 'Concluído', variant: 'secondary' as const },
      cancelled: { label: 'Cancelado', variant: 'destructive' as const }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return <Badge variant={config.variant}>{config.label}</Badge>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Gestão de Contratos
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie contratos, propostas e condições comerciais
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Contrato
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Contrato</DialogTitle>
              <DialogDescription>
                Preencha as informações do contrato e defina as condições de pagamento
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project">Projeto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Projeto Residencial Santos</SelectItem>
                    <SelectItem value="2">Projeto Comercial ABC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Maria Silva</SelectItem>
                    <SelectItem value="2">João Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="total_value">Valor Total</Label>
                <Input id="total_value" placeholder="R$ 0,00" />
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
                <Label htmlFor="installments">Número de Parcelas</Label>
                <Input id="installments" type="number" placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="terms">Condições Comerciais</Label>
                <Textarea 
                  id="terms" 
                  placeholder="Descreva as condições de pagamento, prazos e outras cláusulas importantes..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                Criar Contrato
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Contratos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {contracts.filter(c => c.status === 'active').length}
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald-600 mt-1">
              <FileText className="w-4 h-4" />
              Em andamento
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Valor Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              R$ {contracts.reduce((sum, c) => sum + c.total_value, 0).toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
              <DollarSign className="w-4 h-4" />
              Valor contratado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Ticket Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              R$ {(contracts.reduce((sum, c) => sum + c.total_value, 0) / contracts.length).toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-sm text-purple-600 mt-1">
              <Building className="w-4 h-4" />
              Por contrato
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Clientes Únicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {new Set(contracts.map(c => c.client_id)).size}
            </div>
            <div className="flex items-center gap-1 text-sm text-orange-600 mt-1">
              <User className="w-4 h-4" />
              Clientes ativos
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os contratos cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Parcelas</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {contract.project?.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {contract.project?.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {contract.client?.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {contract.client?.company}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-emerald-600">
                      R$ {contract.total_value.toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {contract.installments}x
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getPaymentMethodLabel(contract.payment_method)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(contract.status)}
                    </TableCell>
                    <TableCell className="text-slate-500 dark:text-slate-400">
                      {new Date(contract.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
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