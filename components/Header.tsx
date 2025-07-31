import Image from "next/image";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export function Header() {

    

const items = [
  {
    title: "Account 1",
    url: "#",
    icon: { src: "/Solana.png", alt: "Solana", width: 28, height: 28 },
  },
];
    return (
        <header className="w-full  min-h-screen">
            <div className="flex h-full min-h-screen">
                <SidebarProvider>
                    <Sidebar className="w-56 h-full min-h-screen border-r border-gray-100 bg-white">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>
                                    Application
                                </SidebarGroupLabel>
                            </SidebarGroup>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url} className="flex items-center gap-2 px-2 py-1">
                                                <Image
                                                    src={item.icon.src}
                                                    alt={item.icon.alt}
                                                    width={item.icon.width}
                                                    height={item.icon.height}
                                                />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarContent>
                    </Sidebar>
                <div className="flex-1 flex justify-center h-full min-h-screen pr-5">
                    <div className="w-full max-w-3xl flex flex-col gap-6 py-10 px-6 bg-white rounded-xl shadow-md mt-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between ">
                    <span className="text-lg font-semibold text-gray-900">Account 1</span>
                    <div className="flex items-center gap-2  rounded-full px-3 py-1 shadow-sm">
                        <div className="flex items-center pr-2 ">
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

                <nav className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mt-2">
                    {['Tokens', 'Collectibles', 'Defi', 'Activity'].map((tab) => (
                        <button
                            key={tab}
                            className="px-3 py-1 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition focus:outline-none"
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

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

                {/* Actions */}
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

                {/* Token Card */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mt-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <Image src="/Solana.png" alt="Solana" width={36} height={36} className="rounded-full" />
                        <div>
                            <div className="text-base font-semibold text-gray-900">Solana</div>
                            <div className="text-sm text-gray-500">0 SOL</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-base font-semibold text-gray-900">$ 1.71</span>
                        <span className="text-xs text-gray-400">$ 0.00</span>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mt-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <Image src="/ethereum.webp" alt="Solana" width={50} height={50} className="rounded-full" />
                        <div>
                            <div className="text-base font-semibold text-gray-900">Ethereum</div>
                            <div className="text-sm text-gray-500">0 ETH</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                        <span className="text-base font-semibold text-gray-900">$ 0.45</span>
                        <span className="text-xs text-gray-400">$ 0.00</span>
                    </div>
                </div>
                    </div>
                </div>
                </SidebarProvider>

            </div>

        </header>
    )
}


