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
      view: {
        Row: {
          id: string
          input_data_name: string | null
          input_data_url: string | null
          input_purpose: string | null
          input_summary: string | null
          insights: string[] | null
          subtitle: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          input_data_name?: string | null
          input_data_url?: string | null
          input_purpose?: string | null
          input_summary?: string | null
          insights?: string[] | null
          subtitle?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          input_data_name?: string | null
          input_data_url?: string | null
          input_purpose?: string | null
          input_summary?: string | null
          insights?: string[] | null
          subtitle?: string | null
          title?: string | null
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
