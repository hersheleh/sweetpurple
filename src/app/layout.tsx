'use client';

// import type { Metadata } from 'next'
import './globals.css'
import { kalnia, roboto, noto_serif } from './fonts'
import { purple } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from '@mui/material/styles/ThemeProvider';

const theme = createTheme({
    palette: {
        primary: purple,
        background: {
            paper: '#fff',
        }
    },
    typography: {
        fontFamily: noto_serif.style.fontFamily
    }
});


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body // className={kalnia.className}
            >
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
                </body>
        </html>
    )
}
