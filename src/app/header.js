"use client"
 
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import authStore from "./zustand_auth_store"

export default function Header() {
    const {jwtLogout, isJwtLoggedIn} = authStore()
    const { theme, setTheme } = useTheme()
    const [ isDarkMode, setIsDarkmode] = useState()
    const [isLoggedIn, setIsloggedIn] = useState()

    useEffect(() => {
        setIsDarkmode(theme == 'dark')
        setIsloggedIn(isJwtLoggedIn())
    }, [isJwtLoggedIn()])
    return (
        <header className="flex w-full item-center justify-between">
            <Link href='/' className="font-bold">To home</Link>
            <div className="flex items-center gap-x-4">
                <div className={`flex items-center gap-x-4 ${isLoggedIn ? 'hidden' : true}`}>
                    <Button className="font-bold"><Link href='/auth/login'>Log in</Link></Button>
                    <Button className="font-bold"><Link href='/auth/register'>Register</Link></Button>
                </div>
                <Button className={`font-bold ${!isLoggedIn ? 'hidden' : true}`} onClick={() => jwtLogout()}>Log out</Button>
                
                
                {isDarkMode ? <Moon/> : <Sun/>}
                <Switch
                    checked = {isDarkMode}
                    onCheckedChange={() => {
                        if(isDarkMode) {
                            setTheme('light')
                            setIsDarkmode(false)
                        } else {
                            setTheme('dark')
                            setIsDarkmode(true)
                        }
                    }}
                />
            </div>
            
        </header>
    )
}