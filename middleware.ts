import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  async afterAuth(auth, req, evt) {
    console.log("Starting login");
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Redirect logged in users to organization selection page if they are not active in an organization
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== "/org-selection"
    ) {
      const orgSelection = new URL("/org-selection", req.url);
      return NextResponse.redirect(orgSelection);
    }
    console.log(auth);
    // Register users to Upsolve
    if (auth.userId && auth.orgId) {
      console.log("Starting tenant registration");
      // Add Upsolve tenant registration
      const upsolvePayload = {
        displayName: auth.orgSlug,
        key: auth.orgId,
        // TODO to deploy: Add whatever prefilters you need here
        prefilters: {
          // store_id: Math.random() > 0.5 ? "1" : "2",
          // organization_id: auth.orgSlug,
        },
        apiKey: process.env.UPSOLVE_API_KEY,
      };
      console.log(JSON.stringify(upsolvePayload));
      const upsolveToken = await fetch(
        `https://api.upsolve.ai/v1/api/tenant/register-tenant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(upsolvePayload),
        }
      )
        .then((res) => res.json())
        .then((data) => data?.["data"]?.["token"]);
      await clerkClient.users.updateUser(auth.userId, {
        publicMetadata: { upsolveToken },
      });
      console.log(`Upsolve registration done`);
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
