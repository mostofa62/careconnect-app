import './globals.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { AuthContextProvider } from '@/app/context/auth-context';
import { Toaster } from 'react-hot-toast';
import { RouteChangeListener } from './components/utils/RouteChangeListener';
import { AppContextProvider } from './context/app-context';
//import Favicon from '@/public/favicon.ico';
const inter = Work_Sans({ subsets: ['latin'] })
const app_name:any = process.env.NEXT_PUBLIC_APP_NAME;
export const metadata: Metadata = {
  title: app_name,
  description: 'Generated by Mostofa',
  //icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <Toaster/>
      <RouteChangeListener/>
      <AuthContextProvider>
      <AppContextProvider>   
        {children}
        </AppContextProvider>
      </AuthContextProvider>
      </body>
    </html>
  )
}
