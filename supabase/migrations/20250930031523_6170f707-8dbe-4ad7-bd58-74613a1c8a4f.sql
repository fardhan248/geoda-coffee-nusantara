-- Add variant_id column to cart_items table
ALTER TABLE cart_items
ADD COLUMN variant_id uuid REFERENCES product_variants(id);

-- Update existing cart_items to use the first variant of each product (if any)
UPDATE cart_items
SET variant_id = (
  SELECT id FROM product_variants 
  WHERE product_variants.product_id = cart_items.product_id 
  LIMIT 1
)
WHERE variant_id IS NULL;