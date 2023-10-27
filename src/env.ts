import { z } from 'zod'

// Define the schema for your OAuth providers
const SupabaseOAuthProvider = z.enum([
  'apple',
  'azure',
  'bitbucket',
  'discord',
  'facebook',
  'figma',
  'github',
  'gitlab',
  'google',
  'kakao',
  'keycloak',
  'linkedin',
  // 'linkedin_oidc',
  'notion',
  'slack',
  'spotify',
  'twitch',
  'twitter',
  'workos',
  'zoom',
  'fly'
])

const ProviderArray = z.array(SupabaseOAuthProvider)

// Define the schema for your environment variables
const envSchema = z.object({
  NEXT_PUBLIC_OAUTH_PROVIDERS: z.string()
    .transform(val => val.split(/[, ]+/).filter(Boolean))
    .transform(val => val.length > 0 ? val : undefined)
    .refine(value => {
      try {
        ProviderArray.optional().parse(value)
        return true
      } catch {
        return false
      }
    }, {
      message: "Invalid provider array",
    }).optional()
})

// Parse and validate the environment variables
const parsed = envSchema.safeParse({
  NEXT_PUBLIC_OAUTH_PROVIDERS: process.env.NEXT_PUBLIC_OAUTH_PROVIDERS
})

if (!parsed.success) {
  const count = parsed.error.errors.length > 1 ? 's' : ''
  const message = [
    `Missing or invalid environment variable${count}:`,
    ...(parsed.error.errors.map(error => `  ${error.path}: ${error.message}`))
  ].join('\n') 

  // Node
  if ('exit' in process) {
    console.error(message)
    process.exit(1)
  }
}

export const env = Object.freeze(
  parsed.success ? 
  parsed.data : 
  {}
)

export default env