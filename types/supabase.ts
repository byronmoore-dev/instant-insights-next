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
      view: {
        Row: {
          id: string
          input_data: string | null
          input_data_type: string | null
          input_summary: string | null
          insights: string | null
          title: string | null
          user_id: string | null
          viz_1: Json | null
          viz_2: Json | null
        }
        Insert: {
          id?: string
          input_data?: string | null
          input_data_type?: string | null
          input_summary?: string | null
          insights?: string | null
          title?: string | null
          user_id?: string | null
          viz_1?: Json | null
          viz_2?: Json | null
        }
        Update: {
          id?: string
          input_data?: string | null
          input_data_type?: string | null
          input_summary?: string | null
          insights?: string | null
          title?: string | null
          user_id?: string | null
          viz_1?: Json | null
          viz_2?: Json | null
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
