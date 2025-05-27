import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="w-full bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo/logo.png" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-primary">Attendo</h1>
        </Link>
        <Link href="/about" className="text-lg text-primary hover:text-primary/80 transition">
          About
        </Link>
      </div>
    </nav>
  );
}
