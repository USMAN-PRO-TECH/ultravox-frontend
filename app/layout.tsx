import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/app/contexts/AuthContext'
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
                color: '#fff',
              },
            },
            error: {
              duration: 3000,
              style: {
                background: '#EF4444',
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
