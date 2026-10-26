CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(254) NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
