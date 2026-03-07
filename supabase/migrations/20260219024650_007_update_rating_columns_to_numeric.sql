/*
  # Update rating columns to support decimal values

  1. Changes
    - Convert `rating`, `clarity`, `fairness`, `punctuality`, and `would_take_again` columns from INTEGER to NUMERIC to support fractional ratings
    - This allows ratings like 6.3/10 to be stored accurately

  2. Rationale
    - The new rating system calculates averages with one decimal place (e.g., 6.3)
    - INTEGER type was rejecting decimal values
    - NUMERIC type supports precise decimal values while maintaining range validation through CHECK constraints
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'rating' AND data_type = 'integer'
  ) THEN
    ALTER TABLE reviews ALTER COLUMN rating TYPE numeric(4,1) USING rating::numeric;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'clarity' AND data_type = 'integer'
  ) THEN
    ALTER TABLE reviews ALTER COLUMN clarity TYPE numeric(4,1) USING clarity::numeric;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'fairness' AND data_type = 'integer'
  ) THEN
    ALTER TABLE reviews ALTER COLUMN fairness TYPE numeric(4,1) USING fairness::numeric;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'punctuality' AND data_type = 'integer'
  ) THEN
    ALTER TABLE reviews ALTER COLUMN punctuality TYPE numeric(4,1) USING punctuality::numeric;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'would_take_again' AND data_type = 'integer'
  ) THEN
    ALTER TABLE reviews ALTER COLUMN would_take_again TYPE numeric(4,1) USING would_take_again::numeric;
  END IF;
END $$;