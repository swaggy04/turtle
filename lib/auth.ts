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
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset your Turtle password</h2>

          <p>Hello ${user.name ?? "there"},</p>

          <p>
            We received a request to reset your password.
            Click the button below to choose a new password.
          </p>

          <p style="margin: 32px 0;">
            <a
              href="${url}"
              style="
                background:#111827;
                color:white;
                padding:12px 20px;
                border-radius:8px;
                text-decoration:none;
                display:inline-block;
              "
            >
              Reset Password
            </a>
          </p>

          <p>
            If you didn't request this password reset, you can safely ignore this email.
          </p>

          <p>
            This link will expire automatically for your security.
          </p>

          <hr />

          <p style="font-size:12px;color:#6b7280;">
            Turtle AI App Builder
          </p>
        </div>
      `;

      try {
        await resend.emails.send({
          from: "Turtle <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset your Turtle password",
          html,
        });
      } catch (error) {
        console.error("Failed to send password reset email:", error);
        throw error;
      }
    },
  },

socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    prompt: "select_account",
  },
},

  secret: process.env.BETTER_AUTH_SECRET!,

  baseURL: process.env.BETTER_AUTH_URL!,

  trustedOrigins: ["http://localhost:3000"],
});
