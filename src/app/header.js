"use client"
 
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function Header() {
    const { theme, setTheme } = useTheme()
    const [ isDarkMode, setIsDarkmode] = useState()
    useEffect(() => {
        setIsDarkmode(theme == 'dark')
    }, [])
    return (
        <header className="flex item-center justify-between">
            <Link href='/' className="font-bold">To home</Link>
            <div className="flex items-center gap-x-4">
                <Button className="font-bold">Log in</Button>
                <Button className="font-bold">Register</Button>
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