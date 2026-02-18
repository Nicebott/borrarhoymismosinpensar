/*
  # Create notifications table

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `title` (text)
      - `message` (text)
      - `created_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
      - `status` (text: 'active' or 'archived')

  2. Security
    - Enable RLS on `notifications` table
    - All authenticated users can read notifications
    - Only superadmins can create notifications
    - Only the creator or superadmin can delete notifications
*/

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'archived'))
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can read active notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Superadmins can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM superadmins
      WHERE superadmins.user_id = auth.uid()
    )
  );

CREATE POLICY "Superadmins can update their own notifications or any notification"
  ON notifications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM superadmins
      WHERE superadmins.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM superadmins
      WHERE superadmins.user_id = auth.uid()
    )
  );

CREATE POLICY "Superadmins can delete notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM superadmins
      WHERE superadmins.user_id = auth.uid()
    )
  );
