import Image from "next/image";

export function TopBar() {
  return (
    <div className="flex items-center justify-between ">
      <span className="text-lg font-semibold text-gray-900">Account 1</span>
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 shadow-sm">
        <div className="flex items-center pr-2 border-r border-gray-200">
          <Image src="/Solana.png" alt="Solana" width={28} height={28} className="rounded-full" />
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium ml-2">
          A1
        </div>
        <button
          className="flex items-center pl-2 border-l border-gray-200 bg-transparent hover:bg-gray-100 rounded-r-full transition"
          aria-label="Copy"
          type="button"
        >
          <Image src="/copy.png" alt="Copy" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
