'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded transition ${
      pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-blue-600">
          Meu Futebol
        </h1>

        <div className="flex gap-2">
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
        </div>
      </nav>
    </header>
  );
}
