
'use server'
import {z} from "zod"
import prisma from "../prisma"
import {auth} from "../auth"
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const Input = z.object({
    title: z.string().trim().min(1).max(100),
    content: z.string().trim().max(10_000).optional()
})

export async function createPost(formData: FormData){
  const session = await auth.api.getSession({headers: await headers()})
  const user = session?.user
  if(!user){
    throw new Error("Unathorized")
  }
  const parsed = Input.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })
  if(!parsed.success){
    throw new Error("Invalid Input")
  }
  await prisma.post.create({
    data: {
        title: parsed.data.title,
        content: parsed.data.content,
        authorId: user.id,
    }
  })
  revalidatePath("/")
  redirect("/")
}