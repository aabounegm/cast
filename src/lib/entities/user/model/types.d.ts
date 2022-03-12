import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  user_metadata: {
    user_name: string;
    preferred_username: string;
    avatar_url: string;
    email: string;
    email_verified: boolean;
    iss: string;
    provider_id: number;
    sub: number;
  };
}
