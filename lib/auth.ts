import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Turtle <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your Turtle password",
        html: `
    <h2>Reset your password</h2>

    <p>Click the link below to reset your password.</p>

    <a href="${url}">
      Reset Password
    </a>
  `,
      });
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,

  baseURL: process.env.BETTER_AUTH_URL!,

  trustedOrigins: ["http://localhost:3000"],
});
