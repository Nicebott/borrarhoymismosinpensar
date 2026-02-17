-- Fix review column constraints to match original Firebase data (0-10 range)
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_rating_check;
ALTER TABLE reviews ADD CONSTRAINT reviews_rating_check CHECK (rating BETWEEN 0 AND 10);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_clarity_check;
ALTER TABLE reviews ADD CONSTRAINT reviews_clarity_check CHECK (clarity BETWEEN 0 AND 10);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_fairness_check;
ALTER TABLE reviews ADD CONSTRAINT reviews_fairness_check CHECK (fairness BETWEEN 0 AND 10);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_punctuality_check;
ALTER TABLE reviews ADD CONSTRAINT reviews_punctuality_check CHECK (punctuality BETWEEN 0 AND 10);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_would_take_again_check;
ALTER TABLE reviews ADD CONSTRAINT reviews_would_take_again_check CHECK (would_take_again BETWEEN 0 AND 10);
