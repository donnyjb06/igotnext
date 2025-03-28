export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      usesEmailCredentials?: boolean;
    },
    
  }
}
