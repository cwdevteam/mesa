import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

interface User {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const { user }: { user: User } = await req.json();
    const supabase = createServerClient(cookies());

    // Check if the user already exists in the database
    const { data: existingUser, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 indicates no rows found
      console.error(fetchError.message);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    let response;
    if (existingUser) {
      // Update existing user
      response = await supabase
        .from('profiles')
        .update({
          username: user.username,
          full_name: user.full_name,
          avatar_url: user.avatar_url,
          website: user.website,
        })
        .eq('id', user.id);
    } else {
      // Insert new user
      response = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
            website: user.website,
          }
        ]);
    }

    if (response.error) {
      console.error(response.error);
      return NextResponse.json({ error: response.error.message }, { status: 500 });
    }

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { user }: { user: User } = await req.json();
    const supabase = createServerClient(cookies());

    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id);

    if (deleteError) {
      console.error('Failed to delete avatar:', deleteError.message);
      return NextResponse.json({ error: 'Failed to delete avatar' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Avatar deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to remove avatar:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
