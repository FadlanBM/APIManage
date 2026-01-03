import { registerAs } from '@nestjs/config';

export default registerAs('supabase', () => {
  const url = process.env.NEST_PUBLIC_SUPABASE_URL;
  const key = process.env.NEST_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error(
      'NEST_PUBLIC_SUPABASE_URL is not defined in environment variables',
    );
  }

  if (!key) {
    throw new Error(
      'NEST_PUBLIC_SUPABASE_ANON_KEY is not defined in environment variables',
    );
  }

  return {
    url,
    key,
  };
});
