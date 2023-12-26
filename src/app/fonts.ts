import { Roboto, Noto_Serif, Noto_Nastaliq_Urdu } from 'next/font/google';
import localFont from 'next/font/local';


export const kalnia = localFont({
    src: '/fonts/Kalnia-VariableFont_wdth,wght.ttf',
    display: 'swap'
})

export const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

export const noto_serif = Noto_Serif({
    subsets: ['latin'],
    display: 'swap'
})

export const noto_nastaliq_urdu = Noto_Nastaliq_Urdu({
    subsets: ['latin'],
    display: 'swap'
})
