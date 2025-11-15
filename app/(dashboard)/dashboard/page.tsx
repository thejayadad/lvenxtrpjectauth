
import { createPost } from "@/lib/actions/post"
import prisma from "@/lib/prisma"
import {auth} from "@/lib/auth"

export default async function Dashboard(){
    return (
        <div>
            DashboardPage
        </div>
    )
}