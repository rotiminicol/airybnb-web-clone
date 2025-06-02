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
      bookings: {
        Row: {
          booking_date: string | null
          check_in: string | null
          check_out: string | null
          created_at: string | null
          experience_id: string | null
          guest_id: string
          guests: number
          id: string
          property_id: string | null
          service_id: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at: string | null
        }
        Insert: {
          booking_date?: string | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          experience_id?: string | null
          guest_id: string
          guests?: number
          id?: string
          property_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at?: string | null
        }
        Update: {
          booking_date?: string | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          experience_id?: string | null
          guest_id?: string
          guests?: number
          id?: string
          property_id?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          category: Database["public"]["Enums"]["experience_category"]
          city: string
          country: string
          created_at: string | null
          description: string | null
          duration_hours: number
          host_id: string
          id: string
          images: string[] | null
          is_active: boolean | null
          location: string
          max_participants: number
          price_per_person: number
          rating: number | null
          review_count: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["experience_category"]
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          duration_hours: number
          host_id: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location: string
          max_participants?: number
          price_per_person: number
          rating?: number | null
          review_count?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["experience_category"]
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          duration_hours?: number
          host_id?: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location?: string
          max_participants?: number
          price_per_person?: number
          rating?: number | null
          review_count?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          experience_id: string | null
          id: string
          property_id: string | null
          service_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          property_id?: string | null
          service_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          property_id?: string | null
          service_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_numbers: {
        Row: {
          country: string
          created_at: string
          expires_at: string
          id: string
          number: string
        }
        Insert: {
          country: string
          created_at?: string
          expires_at: string
          id?: string
          number: string
        }
        Update: {
          country?: string
          created_at?: string
          expires_at?: string
          id?: string
          number?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          is_host: boolean | null
          last_name: string | null
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          is_host?: boolean | null
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_host?: boolean | null
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[] | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          country: string
          created_at: string | null
          description: string | null
          host_id: string
          id: string
          images: string[] | null
          is_active: boolean | null
          is_guest_favorite: boolean | null
          location: string
          max_guests: number
          price_per_night: number
          property_type: Database["public"]["Enums"]["property_type"]
          rating: number | null
          review_count: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          host_id: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_guest_favorite?: boolean | null
          location: string
          max_guests?: number
          price_per_night: number
          property_type: Database["public"]["Enums"]["property_type"]
          rating?: number | null
          review_count?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          host_id?: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_guest_favorite?: boolean | null
          location?: string
          max_guests?: number
          price_per_night?: number
          property_type?: Database["public"]["Enums"]["property_type"]
          rating?: number | null
          review_count?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string | null
          experience_id: string | null
          id: string
          property_id: string | null
          rating: number
          reviewer_id: string
          service_id: string | null
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string | null
          experience_id?: string | null
          id?: string
          property_id?: string | null
          rating: number
          reviewer_id: string
          service_id?: string | null
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string | null
          experience_id?: string | null
          id?: string
          property_id?: string | null
          rating?: number
          reviewer_id?: string
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: Database["public"]["Enums"]["service_category"]
          city: string
          country: string
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          location: string
          price: number
          provider_id: string
          rating: number | null
          review_count: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["service_category"]
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location: string
          price: number
          provider_id: string
          rating?: number | null
          review_count?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["service_category"]
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location?: string
          price?: number
          provider_id?: string
          rating?: number | null
          review_count?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_messages: {
        Row: {
          content: string
          from_number: string
          id: string
          phone_number_id: string | null
          received_at: string
        }
        Insert: {
          content: string
          from_number: string
          id?: string
          phone_number_id?: string | null
          received_at?: string
        }
        Update: {
          content?: string
          from_number?: string
          id?: string
          phone_number_id?: string | null
          received_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_messages_phone_number_id_fkey"
            columns: ["phone_number_id"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_numbers: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      experience_category:
        | "adventure"
        | "food"
        | "culture"
        | "wellness"
        | "sports"
      property_type: "apartment" | "house" | "room" | "condo" | "villa"
      service_category:
        | "photography"
        | "training"
        | "food"
        | "wellness"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      experience_category: [
        "adventure",
        "food",
        "culture",
        "wellness",
        "sports",
      ],
      property_type: ["apartment", "house", "room", "condo", "villa"],
      service_category: [
        "photography",
        "training",
        "food",
        "wellness",
        "other",
      ],
    },
  },
} as const
