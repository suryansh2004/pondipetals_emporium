import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qtizrxnxiwmkysmvjvlb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aXpyeG54aXdta3lzbXZqdmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTE4NzUsImV4cCI6MjAyNDYyNzg3NX0.1RcGMFAv520stCER-Z5Hp3vAWRaGYKKAfTl6D3-XoPc'
export const supabase = createClient(supabaseUrl, supabaseKey)