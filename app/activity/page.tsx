export default function ActivityPage() {
  const transactions = [
    {
      id: "1",
      type: "receive",
      token: "SOL",
      amount: "+2.5",
      value: "$572.50",
      from: "7xKX...AsU",
      timestamp: "2 hours ago",
      status: "completed"
    },
    {
      id: "2", 
      type: "send",
      token: "SOL",
      amount: "-1.0",
      value: "$229.00",
      to: "9mFR...kL3",
      timestamp: "1 day ago",
      status: "completed"
    },
    {
      id: "3",
      type: "swap",
      token: "ETH → SOL",
      amount: "0.1 → 0.5",
      value: "$115.00",
      timestamp: "3 days ago",
      status: "completed"
    }
  ];

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Transaction Activity
          </h1>
          <p className="text-slate-600">Track all your wallet transactions and history</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'Sent', 'Received', 'Swapped'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === 'All' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/60 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                    tx.type === 'receive' ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                    tx.type === 'send' ? 'bg-gradient-to-br from-red-500 to-pink-600' :
                    'bg-gradient-to-br from-blue-500 to-indigo-600'
                  }`}>
                    {tx.type === 'receive' ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    ) : tx.type === 'send' ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 capitalize">{tx.type} {tx.token}</h3>
                    <p className="text-sm text-slate-500">
                      {tx.from && `From: ${tx.from}`}
                      {tx.to && `To: ${tx.to}`}
                      {tx.type === 'swap' && 'Exchange Transaction'}
                    </p>
                    <p className="text-xs text-slate-400">{tx.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    tx.type === 'receive' ? 'text-emerald-600' : 
                    tx.type === 'send' ? 'text-red-500' : 'text-blue-600'
                  }`}>
                    {tx.amount} {tx.token}
                  </p>
                  <p className="text-sm text-slate-500">{tx.value}</p>
                  <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full mt-1">
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors">
            Load More Transactions
          </button>
        </div>
      </div>
  );
}
