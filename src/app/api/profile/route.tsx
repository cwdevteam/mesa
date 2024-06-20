import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { log } from "console";

export const runtime = "edge";

interface User {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     // const { user }: { user: User } = body;
//     const { user } = body;
//     console.log("==================>", user);
//     const supabase = createServerClient(cookies());
//     console.log("==================>", 1);

//     // Check if the user already exists in the database
//     const { data: existingUser, error: fetchError } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id)
//       .single();
//     console.log("==================>", error);

//     let response;
//     if (existingUser) {
//       console.log("==================>", 3);

//       // Update existing user
//       response = await supabase
//         .from("profiles")
//         .update({
//           username: user.username,
//           full_name: user.full_name,
//           avatar_url: user.avatar_url,
//           website: user.website,
//         })
//         .eq("id", user.id);
//       console.log("==================>", 4);
//     } else {
//       // Insert new user
//       response = await supabase.from("profiles").insert([
//         {
//           id: user.id,
//           username: user.username,
//           full_name: user.full_name,
//           avatar_url: user.avatar_url,
//           website: user.website,
//         },
//       ]);
//     }

//     if (response.error) {
//       console.error(response.error);
//       return NextResponse.json(
//         { error: response.error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ data: response.data }, { status: 200 });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest) {
//   try {
//     const { user }: { user: User } = await req.json();
//     const supabase = createServerClient(cookies());

//     const { error: updateError } = await supabase
//       .from("profiles")
//       .update({ avatar_url: null })
//       .eq("id", user.id);

//     if (updateError) {
//       console.error("Failed to update avatar:", updateError.message);
//       return NextResponse.json(
//         { error: "Failed to update avatar" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Avatar URL set to null successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Failed to remove avatar:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// Assuming TypeScript and a User interface defined

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "super-secret-jwt-token-with-at-least-32-characters-long";

export async function POST(req: NextRequest) {
  try {
    const { user }: { user: User } = await req.json();

    // Implement user authentication logic (e.g., verify JWT token)

    const supabase = createServerClient(cookies());

    const { data: existingUser, error: existingUserError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingUserError && existingUserError.code !== "PGRST116") {
      console.error("Error fetching user:", existingUserError.message);
      return handleError(existingUserError.message, 500);
    }

    console.log(existingUser);

    let response = { data: null };
    if (existingUser) {
      // Update existing user with allowed fields
      const allowedFields = ["username", "full_name", "website"];
      const updateData = Object.fromEntries(
        Object.entries(user).filter(([key]) => allowedFields.includes(key))
      );

      const currentTimeMillis = Date.now();
      const updatedDateString = new Date(currentTimeMillis).toISOString();

      const updatedUserData = await supabase
        .from("profiles")
        .update({
          username: "zxczcs",
          full_name: "zxcs",
          website: "zxczcxsss",
          avatar_url: "",
          updated_at: updatedDateString,
        })
        .eq("id", user.id);

      const updateDataResponse = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("============updatedUserData", updatedUserData);

      // if (updatedUserDataError) {
      //   console.error(updatedUserDataError);
      //   return handleError(updatedUserDataError.message, 500);
      // }

      response.data = updateDataResponse.data;
    } else {
      // Insert new user
      const { data: insertedUserData, error: insertedUserDataError } =
        await supabase.from("profiles").insert([{ ...user, id: user.id }]);

      console.log("============insertedUserData", insertedUserData);
      console.log(
        "---------------------------------insertedUserDataError",
        insertedUserDataError
      );
      if (insertedUserDataError) {
        console.error(insertedUserDataError);
        return handleError(insertedUserDataError.message, 500);
      }

      response.data = insertedUserData;
    }

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleError(error.message, 500);
  }
}

// Similar improvements for DELETE function

function handleError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
