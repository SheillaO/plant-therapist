ALTER TABLE "subscribers" RENAME COLUMN "email" TO "email_address";--> statement-breakpoint
ALTER TABLE "subscribers" DROP CONSTRAINT "subscribers_email_unique";--> statement-breakpoint
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_email_address_unique" UNIQUE("email_address");