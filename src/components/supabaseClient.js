import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ombxdtljhgrhoyvilyjt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYnhkdGxqaGdyaG95dmlseWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NDU0MDgsImV4cCI6MjA1MTAyMTQwOH0.JokQmNR9PLTPkGf0OQkd3lA2lxH26pkxBwpN-MhA6Ws';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
