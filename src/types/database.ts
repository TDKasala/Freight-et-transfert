export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          created_at?: string;
        };
      };
      agencies: {
        Row: {
          id: string;
          name: string;
          currency: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          currency: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          currency?: string;
          created_at?: string;
        };
      };
      branches: {
        Row: {
          id: string;
          agency_id: string;
          name: string;
          city: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          agency_id: string;
          name: string;
          city: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          agency_id?: string;
          name?: string;
          city?: string;
          created_at?: string;
        };
      };
      roles: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role_id: string;
          agency_id: string | null;
          branch_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role_id: string;
          agency_id?: string | null;
          branch_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role_id?: string;
          agency_id?: string | null;
          branch_id?: string | null;
          created_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
