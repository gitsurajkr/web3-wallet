import Image from "next/image";

export default function CollectiblesPage() {
  const nfts = [
    {
      id: "1",
      name: "Solana Monkey #1234",
      collection: "Solana Monkey Business",
      image: "/ethereum.webp",
      price: "2.5 SOL",
      rarity: "Rare"
    },
    {
      id: "2",
      name: "DeGods #5678", 
      collection: "DeGods",
      image: "/Solana.png",
      price: "15.0 SOL",
      rarity: "Legendary"
    },
    {
      id: "3",
      name: "Okay Bears #9012",
      collection: "Okay Bears",
      image: "/ethereum.webp", 
      price: "8.2 SOL",
      rarity: "Uncommon"
    }
  ];

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            NFT Collection
          </h1>
          <p className="text-slate-600">Discover and manage your digital collectibles</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">3</p>
                <p className="text-sm text-slate-600">Total NFTs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">25.7 SOL</p>
                <p className="text-sm text-slate-600">Total Value</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">2</p>
                <p className="text-sm text-slate-600">Collections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'Art', 'Gaming', 'Music', 'Photography'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === 'All' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={nft.image} 
                  alt={nft.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    nft.rarity === 'Legendary' ? 'bg-yellow-100 text-yellow-800' :
                    nft.rarity === 'Rare' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {nft.rarity}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-800 mb-1">{nft.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{nft.collection}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Floor Price</p>
                    <p className="font-bold text-slate-800">{nft.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for no NFTs */}
        {nfts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No NFTs Found</h3>
            <p className="text-slate-500 mb-6">Start building your collection by purchasing NFTs</p>
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors">
              Explore Marketplace
            </button>
          </div>
        )}
      </div>
  );
}
