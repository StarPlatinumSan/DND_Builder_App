import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/* 
-- 1) Enable Row-Level Security
ALTER TABLE your_table_name 
ENABLE ROW LEVEL SECURITY;

-- 2) Create a SELECT policy allowing all users to read rows
CREATE POLICY "Allow select for all"
ON your_table_name
FOR SELECT
TO public
USING (true);
*/
