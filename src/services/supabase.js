import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://aexzaxwiuolrythxzjml.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFleHpheHdpdW9scnl0aHh6am1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTEwNDQsImV4cCI6MjA2Mjk2NzA0NH0.Sme3EoNLHXUqFYv3vOn24kb4rwLlQ1TIJusqnmkVmdY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
