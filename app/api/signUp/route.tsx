import { signUpSchema } from "@/app/formSchema";
import { NextResponse } from "next/server";
import { object } from "zod";

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  const result = signUpSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }
  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? {
          success: false,
          errors: zodErrors,
        }
      : {
          success: true,
        }
  );
}
