-- Migration: create newsletter_subscribers table (id, email, name, status, metadata)
BEGIN;

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NULL,
  status text NOT NULL DEFAULT 'active',
  source text NULL,
  ip_address text NULL,
  user_agent text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id),
  CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS idx_newsletter_status ON public.newsletter_subscribers USING btree (status);

-- Add name column if table existed without it
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS name text;

COMMIT;
