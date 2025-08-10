import Link from "next/link";

export function NavTabs() {
  return (
    <nav className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mt-2">
      <Link href="/tokens" className="px-3 py-1 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none">Tokens</Link>
      <Link href="/collectibles" className="px-3 py-1 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none">Collectibles</Link>
      <Link href="/defi" className="px-3 py-1 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none">Defi</Link>
      <Link href="/activity" className="px-3 py-1 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none">Activity</Link>
      <Link href="/settings" className="px-3 py-1 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none">Settings</Link>
    </nav>
  );
}
