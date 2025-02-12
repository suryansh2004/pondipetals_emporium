import styles from '~/styles/globals.css?url';
import siteConfig from '~/site.config';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { CartSheet } from './components/cart';
import { Toaster } from '~/components/ui/sonner';
import { Button } from './components/ui/button';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{siteConfig.name}</title>
      </head>
      <body className="flex flex-col min-h-screen w-full">
        <Toaster />
        <nav className="fixed w-full top-0 flex justify-between items-center p-4 h-16 backdrop-blur-sm bg-white z-50 px-8 border-b">
          <Link to="/" className="text-2xl font-bold">
            Pondipetals Emporium
          </Link>

          {/* cart */}
          <CartSheet />
        </nav>
        <Outlet />
        <footer className="py-6 sm:py-16 pb-10 px-4 max-w-2xl text-center mx-auto">
          <p className="flex font-medium flex-col gap-0 justify-center sm:flex-row sm:gap-4 sm:mb-16 text-gray-400 items-center">
            <Button
              variant="link"
              onClick={() => {
                document.body.scrollIntoView({
                  behavior: 'smooth',
                });
              }}>
              Back to Home
            </Button>
          </p>
          <p className="flex justify-center items-center text-md mb-4">
            <Button asChild variant="link" className="px-2">
              <Link to="/">Atelier Rit</Link>
            </Button>
            <span>-</span>
            <Button
              asChild
              variant="link"
              className="bg-orange-500 ml-2 px-3 py-0 rounded-lg">
              <a
                href="https://instagram.com/atelier.rit"
                target="_blank"
                rel="noreferrer">
                <span className="hidden sm:inline">@atelier.rit</span>
                <span className="inline sm:hidden">Pondipetals Emporium</span>
              </a>
            </Button>
          </p>
          <div className="my-4 flex justify-center items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100063997484035"
              target="_blank"
              rel="noopener noreferrer">
              <Facebook className="size-6" />
            </a>
            <a
              href="https://instagram.com/atelier.rit"
              target="_blank"
              rel="noopener noreferrer">
              <Instagram className="size-6" />
            </a>
          </div>
          <div className="container mx-auto">
            Atelier Rit, founded by Ritima Singh in Pondicherry, is a testament
            to passion turned business. Inspired by Pondicherry's florals, they
            hand-paint diverse surfaces, weaving stories of beauty. Join their
            journey where art meets passion in crafting dreams.
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
