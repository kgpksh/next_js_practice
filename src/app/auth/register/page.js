"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import authStore from "@/app/zustand_auth_store"

export default function Register() {
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter()
    const {isJwtLoggedIn} = authStore()
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
    function validate(username, nickname, password) {
        if(!(5 <= username.length && username.length <= 10)) return {isSuccess : false, msg: 'username의 길이는 5 이상 10 이하여야 합니다.'}
        if(!(5 <= nickname.length && nickname.length <= 10)) return {isSuccess : false, msg: 'nickname의 길이는 5 이상 10 이하여야 합니다.'}
        if(!(5 <= password.length && password.length <= 10)) return {isSuccess : false, msg: 'password의 길이는 5 이상 10 이하여야 합니다.'}

        return {isSuccess : true, msg: ''}
    }

    return (
        <div className="flex flex-col space-y-8 justify-center items-center w-full h-full">
            <form onSubmit={(e) => {
                e.preventDefault();
                const username = e.target.username.value
                const nickname = e.target.nickname.value
                const password = e.target.password.value
                const isValidated = validate(username, nickname, password)
                if(!(isValidated.isSuccess)) {
                    setErrorMsg(isValidated.msg)
                    return
                }

                const url = process.env.NEXT_PUBLIC_BASE_URL+'member/register'
                axios.post(
                    url,
                    {
                        username:username,
                        nickname:nickname,
                        password:password
                    }
                ).then((result) => {
                    if(result.status == 200) {
                        const data = result.data
                        if(data.resultCode.startsWith('S-')) {
                            router.push('/')
                        } else {
                            setErrorMsg(data.msg)
                        }
                    } else {
                        throw Error
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