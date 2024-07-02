import { z } from 'zod'

const isNode = new Function("try {return this===global;}catch(e){return false;}")()

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

const privateEnvSchema = {
  THIRDWEB_SECRET_KEY: z.string().min(32),
  SERVER_SECRET_KEY: z.string().min(32),
}

// Define the schema for your environment variables
const envSchema = z.object({
  ...(isNode && privateEnvSchema),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(32), // min(208)
  NEXT_PUBLIC_TOS_URL: z.string().url().optional(),
  NEXT_PUBLIC_PP_URL: z.string().url().optional(),
  NEXT_PUBLIC_ACCESS_FORM_URL: z.string().url().optional(),
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
    }).optional(),
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string().min(32),
  NEXT_PUBLIC_SITE_TITLE: z.string().min(3),
  NEXT_PUBLIC_SITE_DESCRIPTION: z.string().min(4),
})

// Parse and validate env variables.  Without explicit mapping, the bundler may
// replace process.env with {} and all values will be undefined.
const parsed = envSchema.safeParse({
  // Private schema
  ...(isNode && process.env),

  // Public Schema
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_OAUTH_PROVIDERS: process.env.NEXT_PUBLIC_OAUTH_PROVIDERS,
  NEXT_PUBLIC_TOS_URL: process.env.NEXT_PUBLIC_TOS_URL,
  NEXT_PUBLIC_PP_URL: process.env.NEXT_PUBLIC_PP_URL,
  NEXT_PUBLIC_ACCESS_FORM_URL: process.env.NEXT_PUBLIC_ACCESS_FORM_URL,
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
})

if (!parsed.success) {
  const count = parsed.error.errors.length > 1 ? 's' : ''
  const message = [
    `Missing or invalid environment variable${count}:`,
    ...(parsed.error.errors.map(error => `  ${error.path}: ${error.message}`))
  ].join('\n') 
  
  // Always log errors
  console.error(`\n${message}\n`)

  // Node
  if ('exit' in process) {
    process.exit(1)
  }
}

export type EnvType = z.infer<typeof envSchema>;

export const env: Readonly<EnvType> = Object.freeze(parsed.success ? parsed.data : {})

export default env