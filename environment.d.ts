declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string,
        CLERK_SECRET_KEY: string,
        UPSOLVE_KEY: string,
        UPSOLVE_PASSWORD: string,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: string,
      }
    }
  }
  
  export {};
  