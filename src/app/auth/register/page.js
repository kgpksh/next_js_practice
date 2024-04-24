"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Register() {
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter()
    return (
        <div className="flex flex-col space-y-8 justify-center items-center w-full h-full">
            <form onSubmit={(e) => {
                e.preventDefault();
                const username = e.target.username.value
                const nickname = e.target.nickname.value
                const password = e.target.password.value
                const url = process.env.NEXT_PUBLIC_BASE_URL+'member/register'
        
                console.log(url)
                axios.post(
                    url,
                    {
                        username:username,
                        nickname:nickname,
                        password:password
                    }
                ).then((result) => {
                    const data = result.data
                    if(data.resultCode.startsWith('S-')) {
                        router.push('/')
                    } else {
                        setErrorMsg(data.msg)
                    }
                }).catch(error => {
                    setErrorMsg(error.msg)
                })
            }}
            className="space-y-8 w-6/12">
                <Input type='text' name='username' placeholder='User ID (Length : min 5 ~ max 10)'></Input>
                <Input type='text' name='nickname' placeholder='Nickname (Length : min 5 ~ max 10)'></Input>
                <Input type='text' name='password' placeholder='Password (Length : min 5 ~ max 10)'></Input>
                <Button>Register</Button>
            </form>
            <div className="text-red-600 font-black">{errorMsg}</div>
        </div>
    )
}