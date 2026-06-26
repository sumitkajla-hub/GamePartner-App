import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'GamePartner - Find Local Sports & Indoor Game Partners',
  description: 'Connect with nearby players for indoor and outdoor games like chess, carrom, badminton, table tennis, cricket, and more. Build your local sports community today!',
  keywords: 'sports partner, game partner, indoor games, outdoor games, chess, badminton, cricket, community sports, local players',
  openGraph: {
    title: 'GamePartner - Find Local Sports & Indoor Game Partners',
    description: 'Connect with nearby players for indoor and outdoor games. Build your local sports community today!',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
