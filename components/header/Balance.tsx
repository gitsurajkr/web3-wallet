import Image from "next/image";

export function Balance() {
  return (
    <div className="flex flex-col items-center mt-2 gap-1">
      <div className="flex items-center space-x-2">
        <Image src="/dollar.png" alt="Dollar" width={36} height={36} />
        <span className="text-4xl font-bold text-gray-800">5.23</span>
      </div>
      <div className="flex items-center space-x-2">
        <Image src="/dollar.png" alt="Dollar small" width={16} height={16} />
        <span className="text-lg text-gray-500">0.00</span>
      </div>
    </div>
  );
}
