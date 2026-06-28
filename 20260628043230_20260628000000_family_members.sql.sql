/*
# Create family_members table

1. New Tables
- `family_members`
  - `id` (uuid, primary key)
  - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users)
  - `name` (text, not null)
  - `relation` (text, not null - one of: father, mother, wife, husband, son, daughter, grandfather, grandmother, other)
  - `age` (integer, not null)
  - `gender` (text, not null)
  - `occupation` (text, nullable)
  - `annual_income` (numeric, default 0)
  - `education` (text, nullable)
  - `disability` (boolean, default false)
  - `farmer` (boolean, default false)
  - `student` (boolean, default false)
  - `widow` (boolean, default false)
  - `minority` (boolean, default false)
  - `bpl_status` (boolean, default false)
  - `caste` (text, nullable)
  - `state` (text, nullable)
  - `district` (text, nullable)
  - Documents flags: aadhaar, pan, ration_card, bank_account, disability_certificate, income_certificate, farmer_id (all boolean, default false)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `family_members`.
- Owner-scoped CRUD: each authenticated user can only access their own family members.
- user_id defaults to auth.uid() so inserts work without client passing it.

3. Indexes
- Index on user_id for efficient queries.

4. Important Notes
- CASCADE DELETE: when a user is deleted, all their family members are automatically removed.
- All document flags default to false and can be updated as users upload/verify documents.
*/

CREATE TABLE IF NOT EXISTS family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  relation text NOT NULL CHECK (relation IN ('father', 'mother', 'wife', 'husband', 'son', 'daughter', 'grandfather', 'grandmother', 'other')),
  age integer NOT NULL,
  gender text NOT NULL,
  occupation text,
  annual_income numeric DEFAULT 0,
  education text,
  disability boolean DEFAULT false,
  farmer boolean DEFAULT false,
  student boolean DEFAULT false,
  widow boolean DEFAULT false,
  minority boolean DEFAULT false,
  bpl_status boolean DEFAULT false,
  caste text,
  state text,
  district text,
  aadhaar boolean DEFAULT false,
  pan boolean DEFAULT false,
  ration_card boolean DEFAULT false,
  bank_account boolean DEFAULT false,
  disability_certificate boolean DEFAULT false,
  income_certificate boolean DEFAULT false,
  farmer_id boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- Create index for efficient user queries
CREATE INDEX IF NOT EXISTS idx_family_members_user_id ON family_members(user_id);

-- Drop existing policies if any (idempotent)
DROP POLICY IF EXISTS "select_own_family_members" ON family_members;
DROP POLICY IF EXISTS "insert_own_family_members" ON family_members;
DROP POLICY IF EXISTS "update_own_family_members" ON family_members;
DROP POLICY IF EXISTS "delete_own_family_members" ON family_members;

-- RLS Policies: owner-scoped CRUD
CREATE POLICY "select_own_family_members"
  ON family_members FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "insert_own_family_members"
  ON family_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_family_members"
  ON family_members FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_family_members"
  ON family_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_family_members_updated_at ON family_members;
CREATE TRIGGER update_family_members_updated_at
  BEFORE UPDATE ON family_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();