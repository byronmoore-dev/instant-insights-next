export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      insights: {
        Row: {
          base_insight: string | null
          chart_type: string | null
          context: string | null
          created_at: number | null
          data: Json | null
          id: string
          title: string | null
          user_id: string | null
          view_id: string | null
        }
        Insert: {
          base_insight?: string | null
          chart_type?: string | null
          context?: string | null
          created_at?: number | null
          data?: Json | null
          id?: string
          title?: string | null
          user_id?: string | null
          view_id?: string | null
        }
        Update: {
          base_insight?: string | null
          chart_type?: string | null
          context?: string | null
          created_at?: number | null
          data?: Json | null
          id?: string
          title?: string | null
          user_id?: string | null
          view_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insights_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insights_view_id_fkey"
            columns: ["view_id"]
            referencedRelation: "view"
            referencedColumns: ["id"]
          }
        ]
      }
      message: {
        Row: {
          content: string | null
          id: string
          role: string | null
          sent_time: string
          user_id: string | null
          view_id: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          role?: string | null
          sent_time?: string
          user_id?: string | null
          view_id?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          role?: string | null
          sent_time?: string
          user_id?: string | null
          view_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_view_id_fkey"
            columns: ["view_id"]
            referencedRelation: "view"
            referencedColumns: ["id"]
          }
        ]
      }
      usage: {
        Row: {
          action: string | null
          completion_tokens: number | null
          id: string
          prompt_tokens: number | null
          total_tokens: number | null
          used_at: number | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          completion_tokens?: number | null
          id?: string
          prompt_tokens?: number | null
          total_tokens?: number | null
          used_at?: number | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          completion_tokens?: number | null
          id?: string
          prompt_tokens?: number | null
          total_tokens?: number | null
          used_at?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      view: {
        Row: {
          created_at: number | null
          id: string
          input_data_name: string | null
          input_data_url: string | null
          input_purpose: string | null
          input_summary: string | null
          insights: string[] | null
          subtitle: string | null
          title: string | null
          updated_at: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: number | null
          id?: string
          input_data_name?: string | null
          input_data_url?: string | null
          input_purpose?: string | null
          input_summary?: string | null
          insights?: string[] | null
          subtitle?: string | null
          title?: string | null
          updated_at?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: number | null
          id?: string
          input_data_name?: string | null
          input_data_url?: string | null
          input_purpose?: string | null
          input_summary?: string | null
          insights?: string[] | null
          subtitle?: string | null
          title?: string | null
          updated_at?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "view_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
