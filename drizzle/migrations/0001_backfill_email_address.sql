-- Custom SQL migration file, put your code below! --

-- Custom SQL migration file, put your code below! --
UPDATE "subscribers" SET "email_address" = "email" WHERE "email_address" IS NULL;