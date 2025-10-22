import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          company: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          company: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          company?: string
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          client_id: string
          status: string
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          client_id: string
          status: string
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          client_id?: string
          status?: string
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          project_id: string
          client_id: string
          total_value: number
          payment_method: string
          installments: number
          terms: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          client_id: string
          total_value: number
          payment_method: string
          installments: number
          terms: string
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          client_id?: string
          total_value?: number
          payment_method?: string
          installments?: number
          terms?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      contract_installments: {
        Row: {
          id: string
          contract_id: string
          installment_number: number
          percentage: number
          amount: number
          due_date: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          contract_id: string
          installment_number: number
          percentage: number
          amount: number
          due_date: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          contract_id?: string
          installment_number?: number
          percentage?: number
          amount?: number
          due_date?: string
          description?: string
          created_at?: string
        }
      }
      receivables: {
        Row: {
          id: string
          contract_id: string
          installment_id: string
          amount: number
          due_date: string
          received_date: string | null
          payment_method: string
          status: string
          notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contract_id: string
          installment_id: string
          amount: number
          due_date: string
          received_date?: string | null
          payment_method: string
          status: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contract_id?: string
          installment_id?: string
          amount?: number
          due_date?: string
          received_date?: string | null
          payment_method?: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          description: string
          amount: number
          category: string
          project_id: string | null
          due_date: string
          paid_date: string | null
          payment_method: string
          status: string
          notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          description: string
          amount: number
          category: string
          project_id?: string | null
          due_date: string
          paid_date?: string | null
          payment_method: string
          status: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          description?: string
          amount?: number
          category?: string
          project_id?: string | null
          due_date?: string
          paid_date?: string | null
          payment_method?: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}