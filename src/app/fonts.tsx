import { Roboto, Noto_Sans } from 'next/font/google'
import localFont from 'next/font/local'


export const kalnia = localFont({
  src: './font/Kalnia-VariableFont_wdth,wght.ttf',
  display: 'swap'
})

// export const inter = Inter({ subsets: ['latin'] })
export const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export const noto_sans = Noto_Sans({
  weight: '700',
  subsets: ['latin'],
  display: 'swap'
})
