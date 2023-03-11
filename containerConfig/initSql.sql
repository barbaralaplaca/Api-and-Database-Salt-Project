DROP TABLE IF EXISTS public.salt_products;

CREATE TABLE public.salt_products
(
    product_id uuid NOT NULL PRIMARY KEY,
    product_name text COLLATE pg_catalog."default" NOT NULL,
    product_description text COLLATE pg_catalog."default" NOT NULL,
    product_price numeric NOT NULL DEFAULT 0
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.salt_products
    OWNER to postgres;


INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('3828a6db-f6da-41ae-9452-11c60dceb3a0', 'The Clean Coder', 'Where we learn to not only clean our code, but also our hands', 19.99);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('b10c88ac-d34c-4f01-9830-7ae26263fe6b', 'The Bungsu Story', 'For all those time you want to read about Indonesia AND agile.', 9.99);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('aa90db4b-0329-4083-a39c-a2d01a670302', 'Harry Potter', 'I am a hufflepuff - what are you?', 28.89);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('a564ebc9-54b7-4b67-b4cf-630eb8c3ac2f', 'Keychain Phone Charger', 'This keychain lightning charger comes with a plug so you’ll be able to charge anywhere with an outlet. Great for the traveller on the go who always needs their phone.', 2.89);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('f3c183f5-ab80-4341-b14a-d2ef40748bba', 'Coffee Mug - White', 'Classic white coffee mug.', 11.80);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('79c0c2d2-7f88-4966-8ec5-27338b1a8e7f', 'Coffee Mug - Red', 'Classic red coffee mug.', 11.90);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('5f17847c-def9-4f17-8c99-be0829296390', 'Heat Sensitive Coffee Mug', 'This cool coffee will flow with color as you pour warm coffee into it.', 12.80);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('591bd47d-0b0d-4024-9141-a4bab78c69c0', 'Heart Shaped Tea Mug', 'These glass mugs are perfect for romantic tea in the mornings.', 18.55);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('a10c9cf4-b67d-4db5-9678-7fdaa96f31d0', 'Tiny Zip Knife', 'These glass mugs are perfect for romantic tea in the mornings.', 21.65);
INSERT INTO public.salt_products(product_id, product_name, product_description, product_price) VALUES ('d3511601-db9a-45ee-b1b7-65a6b3d9e13e', 'Outdoor coffee brewer', 'When the wind is blowing but you still want coffee - this is what you need.', 19.99);



