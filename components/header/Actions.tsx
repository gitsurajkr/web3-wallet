import Image from "next/image";

export function Actions() {
  return (
    <div className="flex items-center justify-between mt-4 gap-2">
      <div className="flex flex-col items-center">
        <Image src="/bank.png" alt="Cash" width={48} height={48} />
        <span className="text-sm font-bold text-gray-500 uppercase mt-1">Cash</span>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/arrow.png" alt="Receive" width={48} height={48} />
        <span className="text-sm font-bold text-gray-500 uppercase mt-1">Receive</span>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/arrows.png" alt="Send" width={48} height={48} />
        <span className="text-sm font-bold text-gray-500 uppercase mt-1">Send</span>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/swap.png" alt="Swap" width={48} height={48} />
        <span className="text-sm font-bold text-gray-500 uppercase mt-1">Swap</span>
      </div>
    </div>
  );
}
