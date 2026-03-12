import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'FoodShare — Reduce Food Waste, Share With Those In Need',
  description:
    'A food waste management and donation platform connecting donors with administrators to reduce food wastage and help communities.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
