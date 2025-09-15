"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "홈" },
    { href: "/game", label: "게임" },
    { href: "/reviews", label: "리뷰" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">🎯</div>
          <span className="text-xl font-bold text-foreground">행맨 미니</span>
        </Link>

        <nav className="flex items-center space-x-2">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant={pathname === item.href ? "default" : "ghost"} size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}
