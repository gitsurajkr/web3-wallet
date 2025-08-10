import Image from "next/image";

export function TokenCard() {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mt-4 border border-gray-100">
      <div className="flex items-center gap-3">
        <Image src="/Solana.png" alt="Solana" width={36} height={36} className="rounded-full" />
        <div>
          <div className="text-base font-semibold text-gray-900">Solana</div>
          <div className="text-sm text-gray-500">0 SOL</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-base font-semibold text-gray-900">$0.00</span>
        <span className="text-xs text-gray-400">$0.00</span>
      </div>
    </div>
  );
}
