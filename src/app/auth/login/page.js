"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import authStore from "@/app/zustand_auth_store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Login() {
    const { jwtLogin, isJwtLoggedIn} = authStore()
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(isJwtLoggedIn())
        if (isJwtLoggedIn()) {
            router.push('/');
        } else {
            setIsLoading(false); // 로그인 상태가 아니면 로딩 상태를 false로 설정
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중이면 로딩 UI를 표시
    }

    return (
        <div className="flex flex-col space-y-8 justify-center items-center w-full h-full">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const username = e.target.username.value
                const password = e.target.password.value
                const result = await jwtLogin(username, password)

                if(isJwtLoggedIn()) {
                    router.push('/')
                    return
                }

                setErrorMsg(result.msg)
            }}
            
            className="space-y-8 w-6/12">
                <Input type='text' name='username' placeholder='User ID (Length : min 5 ~ max 10)'></Input>
                <Input type='text' name='password' placeholder='Password (Length : min 5 ~ max 10)'></Input>
                <Button>Login</Button>
            </form>
            <div className="text-red-600 font-black">{errorMsg}</div>
        </div>
    )
}