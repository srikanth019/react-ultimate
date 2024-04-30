
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nilgnfrnejugawcslpeh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbGduZnJuZWp1Z2F3Y3NscGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODIyOTAsImV4cCI6MjAyOTk1ODI5MH0.bxmr5tJrrSYKNFvMxXDc9iX3sjDjYkpqTrx3rC3HeEQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;