"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	SidebarProvider,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarHeader,
	SidebarFooter,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AccountManager } from "@/components/AccountManager"
// import { CreateAccountFAB } from "@/components/CreateAccountFAB"
import { ReactNode } from "react";

interface HeaderProps {
	children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
	const pathname = usePathname();

	const navigationItems = [
		
		{
			title: "Tokens",
			url: "/tokens",
			icon: { src: "/Solana.png", alt: "Tokens", width: 24, height: 24 },
		},
		{
			title: "DeFi",
			url: "/defi",
			icon: { src: "/swap.png", alt: "DeFi", width: 24, height: 24 },
		},
		{
			title: "Activity",
			url: "/activity",
			icon: { src: "/arrows.png", alt: "Activity", width: 24, height: 24 },
		},
		{
			title: "Settings",
			url: "/settings",
			icon: { src: "/window.svg", alt: "Settings", width: 24, height: 24 },
		},
	];

	return (
		<div className="min-h-screen">
			<SidebarProvider defaultOpen={true}>
				<Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-xl w-64">
						<SidebarHeader className="p-6 border-b border-slate-200/60">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
									<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
									</svg>
								</div>
								<div>
									<h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
										Web3 Wallet
									</h1>
									<p className="text-sm text-slate-500">Secure & Modern</p>
								</div>
							</div>
						</SidebarHeader>

						<SidebarContent className="p-4">
							<SidebarGroup>
								<SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
									Navigation
								</SidebarGroupLabel>
								<SidebarMenu className="space-y-1">
									{navigationItems.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												asChild
												className={`transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 rounded-xl ${pathname === item.url
													? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 shadow-sm'
													: 'text-slate-700 hover:text-blue-700'
													}`}
											>
												<Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
													<Image
														src={item.icon.src}
														alt={item.icon.alt}
														width={item.icon.width}
														height={item.icon.height}
														className="rounded-md opacity-80"
													/>
													<span className="font-medium">{item.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroup>
						</SidebarContent>

						<SidebarFooter className="p-6 border-t border-slate-200/60">
							<AccountManager />
						</SidebarFooter>
					</Sidebar>

					<SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
						<header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<h2 className="text-lg font-semibold text-slate-700">Portfolio Dashboard</h2>
						</header>
						<div className="flex-1 overflow-auto p-6">
							{children}
						</div>
						{/* <CreateAccountFAB /> */}
					</SidebarInset>
			</SidebarProvider>
		</div>
	);
}




