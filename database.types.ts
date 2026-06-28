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
      schemes: {
        Row: {
          id: string;
          name: string;
          description: string;
          ministry: string;
          category: string;
          eligibility: string[];
          estimated_benefit: string;
          benefit_type: string;
          ai_score: number;
          success_probability: number | null;
          opening_date: string;
          closing_date: string;
          status: string;
          featured: boolean;
          apply_link: string;
          official_website: string;
          official_helpline: string | null;
          documents_required: string[];
          why_eligible: string | null;
          ai_tips: string[];
          common_mistakes: string[];
          processing_time: string | null;
          difficulty: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          ministry: string;
          category: string;
          eligibility?: string[];
          estimated_benefit: string;
          benefit_type: string;
          ai_score?: number;
          success_probability?: number | null;
          opening_date?: string;
          closing_date: string;
          status?: string;
          featured?: boolean;
          apply_link: string;
          official_website: string;
          official_helpline?: string | null;
          documents_required?: string[];
          why_eligible?: string | null;
          ai_tips?: string[];
          common_mistakes?: string[];
          processing_time?: string | null;
          difficulty?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          ministry?: string;
          category?: string;
          eligibility?: string[];
          estimated_benefit?: string;
          benefit_type?: string;
          ai_score?: number;
          success_probability?: number | null;
          opening_date?: string;
          closing_date?: string;
          status?: string;
          featured?: boolean;
          apply_link?: string;
          official_website?: string;
          official_helpline?: string | null;
          documents_required?: string[];
          why_eligible?: string | null;
          ai_tips?: string[];
          common_mistakes?: string[];
          processing_time?: string | null;
          difficulty?: string | null;
        };
      };
      success_stories: {
        Row: {
          id: string;
          scheme_id: string;
          name: string;
          city: string;
          photo: string | null;
          story: string;
          amount_received: string;
          rating: number;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          scheme_id: string;
          name: string;
          city: string;
          photo?: string | null;
          story: string;
          amount_received: string;
          rating?: number;
          verified?: boolean;
        };
        Update: {
          id?: string;
          scheme_id?: string;
          name?: string;
          city?: string;
          photo?: string | null;
          story?: string;
          amount_received?: string;
          rating?: number;
          verified?: boolean;
        };
      };
      user_schemes: {
        Row: {
          id: string;
          user_id: string;
          scheme_id: string;
          status: 'saved' | 'applied' | 'approved' | 'rejected';
          viewed_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          scheme_id: string;
          status?: 'saved' | 'applied' | 'approved' | 'rejected';
          viewed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          scheme_id?: string;
          status?: 'saved' | 'applied' | 'approved' | 'rejected';
          viewed_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'info' | 'warning' | 'success' | 'urgent';
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: 'info' | 'warning' | 'success' | 'urgent';
          read?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: 'info' | 'warning' | 'success' | 'urgent';
          read?: boolean;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          avatar_url: string | null;
          state: string;
          district: string;
          category: string;
          annual_income: number;
          occupation: string;
          education: string;
          age: number;
          gender: string;
          disability: boolean;
          farmer: boolean;
          student: boolean;
          startup_founder: boolean;
          ai_match_score: number;
          total_benefits: number;
          eligible_schemes: number;
          applied_schemes: number;
          pending_applications: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          email: string;
          avatar_url?: string | null;
          state: string;
          district: string;
          category: string;
          annual_income: number;
          occupation: string;
          education: string;
          age: number;
          gender: string;
          disability?: boolean;
          farmer?: boolean;
          student?: boolean;
          startup_founder?: boolean;
          ai_match_score?: number;
          total_benefits?: number;
          eligible_schemes?: number;
          applied_schemes?: number;
          pending_applications?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          state?: string;
          district?: string;
          category?: string;
          annual_income?: number;
          occupation?: string;
          education?: string;
          age?: number;
          gender?: string;
          disability?: boolean;
          farmer?: boolean;
          student?: boolean;
          startup_founder?: boolean;
          ai_match_score?: number;
          total_benefits?: number;
          eligible_schemes?: number;
          applied_schemes?: number;
          pending_applications?: number;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          pinned: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          pinned?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          pinned?: boolean;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: 'user' | 'assistant' | 'system';
          content?: string;
        };
      };
      family_members: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          relation: 'father' | 'mother' | 'wife' | 'husband' | 'son' | 'daughter' | 'grandfather' | 'grandmother' | 'other';
          age: number;
          gender: string;
          occupation: string | null;
          annual_income: number;
          education: string | null;
          disability: boolean;
          farmer: boolean;
          student: boolean;
          widow: boolean;
          minority: boolean;
          bpl_status: boolean;
          caste: string | null;
          state: string | null;
          district: string | null;
          aadhaar: boolean;
          pan: boolean;
          ration_card: boolean;
          bank_account: boolean;
          disability_certificate: boolean;
          income_certificate: boolean;
          farmer_id: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          name: string;
          relation: 'father' | 'mother' | 'wife' | 'husband' | 'son' | 'daughter' | 'grandfather' | 'grandmother' | 'other';
          age: number;
          gender: string;
          occupation?: string | null;
          annual_income?: number;
          education?: string | null;
          disability?: boolean;
          farmer?: boolean;
          student?: boolean;
          widow?: boolean;
          minority?: boolean;
          bpl_status?: boolean;
          caste?: string | null;
          state?: string | null;
          district?: string | null;
          aadhaar?: boolean;
          pan?: boolean;
          ration_card?: boolean;
          bank_account?: boolean;
          disability_certificate?: boolean;
          income_certificate?: boolean;
          farmer_id?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          relation?: 'father' | 'mother' | 'wife' | 'husband' | 'son' | 'daughter' | 'grandfather' | 'grandmother' | 'other';
          age?: number;
          gender?: string;
          occupation?: string | null;
          annual_income?: number;
          education?: string | null;
          disability?: boolean;
          farmer?: boolean;
          student?: boolean;
          widow?: boolean;
          minority?: boolean;
          bpl_status?: boolean;
          caste?: string | null;
          state?: string | null;
          district?: string | null;
          aadhaar?: boolean;
          pan?: boolean;
          ration_card?: boolean;
          bank_account?: boolean;
          disability_certificate?: boolean;
          income_certificate?: boolean;
          farmer_id?: boolean;
        };
      };
    };
  };
}

export type Scheme = Database['public']['Tables']['schemes']['Row'];
export type SuccessStory = Database['public']['Tables']['success_stories']['Row'];
export type UserScheme = Database['public']['Tables']['user_schemes']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type FamilyMember = Database['public']['Tables']['family_members']['Row'];
