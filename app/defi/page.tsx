import Image from "next/image";

export default function DefiPage() {
  const protocols = [
    {
      id: "1",
      name: "Jupiter",
      description: "Best-in-class swap aggregator",
      tvl: "$1.2B",
      apy: "12.5%",
      icon: "/swap.png",
      category: "DEX"
    },
    {
      id: "2", 
      name: "Marinade",
      description: "Liquid staking for Solana",
      tvl: "$850M",
      apy: "7.8%",
      icon: "/Solana.png",
      category: "Staking"
    },
    {
      id: "3",
      name: "Orca",
      description: "User-friendly DEX on Solana", 
      tvl: "$450M",
      apy: "18.2%",
      icon: "/dollar.png",
      category: "DEX"
    }
  ];

  const pools = [
    {
      id: "1",
      pair: "SOL/USDC",
      apy: "24.5%",
      liquidity: "$125M",
      volume24h: "$45M",
      reward: "JUP + ORCA"
    },
    {
      id: "2",
      pair: "mSOL/SOL", 
      apy: "8.2%",
      liquidity: "$89M",
      volume24h: "$12M",
      reward: "MNDE"
    },
    {
      id: "3",
      pair: "RAY/USDC",
      apy: "35.7%", 
      liquidity: "$67M",
      volume24h: "$8M",
      reward: "RAY"
    }
  ];

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            DeFi Protocols
          </h1>
          <p className="text-slate-600">Earn yield and participate in decentralized finance</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">$2,456</p>
                <p className="text-sm text-slate-600">Total Staked</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">15.7%</p>
                <p className="text-sm text-slate-600">Avg APY</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">$187</p>
                <p className="text-sm text-slate-600">Rewards Earned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Categories */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'DEX', 'Lending', 'Staking', 'Yield Farming'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                category === 'All' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Protocols */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Featured Protocols</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocols.map((protocol) => (
              <div key={protocol.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Image src={protocol.icon} alt={protocol.name} width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{protocol.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {protocol.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">{protocol.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-400">TVL</p>
                    <p className="font-bold text-slate-800">{protocol.tvl}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">APY</p>
                    <p className="font-bold text-emerald-600">{protocol.apy}</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors">
                  Enter Protocol
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top Liquidity Pools */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Top Liquidity Pools</h2>
          <div className="space-y-4">
            {pools.map((pool) => (
              <div key={pool.id} className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/60 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{pool.pair.split('/')[0]}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{pool.pair.split('/')[1]}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{pool.pair}</h3>
                      <p className="text-sm text-slate-500">Rewards: {pool.reward}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-right">
                    <div>
                      <p className="text-xs text-slate-400">APY</p>
                      <p className="font-bold text-emerald-600">{pool.apy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Liquidity</p>
                      <p className="font-bold text-slate-800">{pool.liquidity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">24h Volume</p>
                      <p className="font-bold text-slate-800">{pool.volume24h}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Swap", icon: "↔️", color: "from-blue-500 to-indigo-600" },
            { name: "Add Liquidity", icon: "💧", color: "from-emerald-500 to-green-600" },
            { name: "Stake", icon: "🔒", color: "from-purple-500 to-pink-600" },
            { name: "Farm", icon: "🌾", color: "from-orange-500 to-red-600" },
          ].map((action) => (
            <button
              key={action.name}
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200/60"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </div>
              <p className="text-sm font-semibold text-slate-700">{action.name}</p>
            </button>
          ))}
        </div>
      </div>
  );
}
