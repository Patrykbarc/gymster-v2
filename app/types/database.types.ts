export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercise_logs: {
        Row: {
          created_at: string
          duration_seconds: number | null
          exercise_id: string | null
          id: string
          notes: string | null
          reps_completed: number | null
          sets_completed: number | null
          updated_at: string
          weight_kg: number | null
          workout_log_id: string | null
        }
        Insert: {
          created_at?: string
          duration_seconds?: number | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          reps_completed?: number | null
          sets_completed?: number | null
          updated_at?: string
          weight_kg?: number | null
          workout_log_id?: string | null
        }
        Update: {
          created_at?: string
          duration_seconds?: number | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          reps_completed?: number | null
          sets_completed?: number | null
          updated_at?: string
          weight_kg?: number | null
          workout_log_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'exercise_logs_exercise_id_fkey'
            columns: ['exercise_id']
            isOneToOne: false
            referencedRelation: 'exercises'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'exercise_logs_workout_log_id_fkey'
            columns: ['workout_log_id']
            isOneToOne: false
            referencedRelation: 'workout_logs'
            referencedColumns: ['id']
          }
        ]
      }
      exercises: {
        Row: {
          created_at: string
          description: string | null
          difficulty: Database['public']['Enums']['difficulty_level']
          equipment: string[] | null
          id: string
          image_url: string | null
          instructions: string[] | null
          is_public: boolean | null
          muscle_group: string[] | null
          name: string
          updated_at: string
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty: Database['public']['Enums']['difficulty_level']
          equipment?: string[] | null
          id?: string
          image_url?: string | null
          instructions?: string[] | null
          is_public?: boolean | null
          muscle_group?: string[] | null
          name: string
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: Database['public']['Enums']['difficulty_level']
          equipment?: string[] | null
          id?: string
          image_url?: string | null
          instructions?: string[] | null
          is_public?: boolean | null
          muscle_group?: string[] | null
          name?: string
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: Database['public']['Enums']['user_role'] | null
          subscription_status:
            | Database['public']['Enums']['subscription_status']
            | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: Database['public']['Enums']['user_role'] | null
          subscription_status?:
            | Database['public']['Enums']['subscription_status']
            | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: Database['public']['Enums']['user_role'] | null
          subscription_status?:
            | Database['public']['Enums']['subscription_status']
            | null
          updated_at?: string
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string
          exercise_id: string | null
          id: string
          notes: string | null
          order_position: number
          reps: number | null
          sets: number | null
          updated_at: string
          user_id: string | null
          weight: number | null
          workout_id: string | null
        }
        Insert: {
          created_at?: string
          exercise_id?: string | null
          id?: string
          notes?: string | null
          order_position: number
          reps?: number | null
          sets?: number | null
          updated_at?: string
          user_id?: string | null
          weight?: number | null
          workout_id?: string | null
        }
        Update: {
          created_at?: string
          exercise_id?: string | null
          id?: string
          notes?: string | null
          order_position?: number
          reps?: number | null
          sets?: number | null
          updated_at?: string
          user_id?: string | null
          weight?: number | null
          workout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'workout_exercises_exercise_id_fkey'
            columns: ['exercise_id']
            isOneToOne: false
            referencedRelation: 'exercises'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'workout_exercises_workout_id_fkey'
            columns: ['workout_id']
            isOneToOne: false
            referencedRelation: 'workouts'
            referencedColumns: ['id']
          }
        ]
      }
      workout_logs: {
        Row: {
          completed: boolean | null
          created_at: string
          end_time: string | null
          id: string
          notes: string | null
          start_time: string
          updated_at: string
          user_id: string | null
          workout_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time: string
          updated_at?: string
          user_id?: string | null
          workout_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time?: string
          updated_at?: string
          user_id?: string | null
          workout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'workout_logs_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'workout_logs_workout_id_fkey'
            columns: ['workout_id']
            isOneToOne: false
            referencedRelation: 'workouts'
            referencedColumns: ['id']
          }
        ]
      }
      workouts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
      subscription_status: 'active' | 'inactive' | 'pending'
      user_role: 'admin' | 'user' | 'trainer'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      difficulty_level: ['beginner', 'intermediate', 'advanced', 'expert'],
      subscription_status: ['active', 'inactive', 'pending'],
      user_role: ['admin', 'user', 'trainer']
    }
  }
} as const
