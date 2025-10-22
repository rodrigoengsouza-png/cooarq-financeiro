export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description: string
  client_id: string
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled'
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
  client?: Client
}

export interface Contract {
  id: string
  project_id: string
  client_id: string
  total_value: number
  payment_method: 'pix' | 'ted' | 'boleto' | 'cartao' | 'dinheiro'
  installments: number
  terms: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  project?: Project
  client?: Client
  contract_installments?: ContractInstallment[]
}

export interface ContractInstallment {
  id: string
  contract_id: string
  installment_number: number
  percentage: number
  amount: number
  due_date: string
  description: string
  created_at: string
}

export interface Receivable {
  id: string
  contract_id: string
  installment_id: string
  amount: number
  due_date: string
  received_date: string | null
  payment_method: 'pix' | 'ted' | 'boleto' | 'cartao' | 'dinheiro'
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  notes: string
  created_at: string
  updated_at: string
  contract?: Contract
  installment?: ContractInstallment
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: 'rent' | 'software' | 'supplies' | 'salary' | 'taxes' | 'equipment' | 'travel' | 'consulting' | 'other'
  project_id: string | null
  due_date: string
  paid_date: string | null
  payment_method: 'pix' | 'ted' | 'boleto' | 'cartao' | 'dinheiro'
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  notes: string
  created_at: string
  updated_at: string
  project?: Project
}

export interface CashFlowItem {
  id: string
  date: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  project_id?: string
  status: 'confirmed' | 'projected'
}

export interface FinancialKPI {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  averageTicket: number
  overdueRate: number
  monthlyGrowth: number
  activeContracts: number
}

export interface ReportFilter {
  startDate: string
  endDate: string
  clientId?: string
  projectId?: string
  status?: string
  category?: string
}