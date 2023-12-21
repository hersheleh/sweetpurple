import type { Metadata } from 'next'
import './globals.css'
import { kalnia } from './fonts'

export const metadata: Metadata = {
    title: 'sweetpurple',
    description: 'it\'s not magenta',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={kalnia.className}>{children} </body>
        </html>
    )
}
