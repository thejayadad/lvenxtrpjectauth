
'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function SignInWithGoogleButton(){
    const [loading, setLoading] = useState(false)
    const onLogin = async () => {
        try {
            setLoading(true)
            await authClient.signIn.social({provider: "google"})
        } catch (error) {
            console.log("Error signing In " + error)
            setLoading(false)
        }
    }
    return (
        <button
        onClick={onLogin}
        disabled={loading}
        className="px-4 py-2 bg-neutral-600 rounded-lg font-medium disabled:opacity-50 hover:bg-neutral-700 text-white"
        >
            {loading ? "one moment..." : "LogIn With Google"}
        </button>
    )
}

export function SignOutButton (){
    const [loading, setLoading ] = useState(false)
    const router = useRouter()
    const onLogout = async () => {
        try {
            setLoading(true)
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/")
                        router.refresh()
                    }
                }
            })
        } catch (error) {
            console.log("Error logging out " + error)
            setLoading(false)
        }
    }
    return (
        <button
        onClick={onLogout}
        disabled={loading}
        className="bg-neutral-600 px-4 py-2 rounded-lg font-medium text-white disabled:opacity-50"
        >
            {loading ? "logging out..." : "LogOut"}
        </button>
    )
}