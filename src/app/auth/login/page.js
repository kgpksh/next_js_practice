"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login() {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
        }}
        className="space-y-8 w-6/12">
            <Input type='text' name='username' placeholder='User ID (Length : min 5 ~ max 10)'></Input>
            <Input type='text' name='password' placeholder='Password (Length : min 5 ~ max 10)'></Input>
            <Button>Login</Button>
        </form>
    )
}