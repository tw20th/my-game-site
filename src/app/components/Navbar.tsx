import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">My Game Site</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/popular" className="hover:text-blue-400">
              人気ゲーム
            </Link>
          </li>
          <li>
            <Link href="/new" className="hover:text-blue-400">
              新作ゲーム
            </Link>
          </li>
          <li>
            <Link href="/recommend" className="hover:text-blue-400">
              おすすめ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
