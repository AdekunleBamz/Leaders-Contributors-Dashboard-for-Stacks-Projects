import { useEffect, useState } from 'react';
import Head from 'next/head';
import ConnectWallet from '../src/components/ConnectWallet';
import Dashboard from '../src/components/Dashboard';

interface Contributor {
  login: string;
  commits: number;
  avatarUrl: string;
  profileUrl: string;
}

export default function ContributorsDashboard() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'contributors' | 'wallet'>('contributors');

  useEffect(() => {
    async function loadContributors() {
      try {
        const response = await fetch('/api/contributors');
        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }
        const data: Contributor[] = await response.json();
        setContributors(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadContributors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Stacks Contributors Dashboard</title>
        <meta name="description" content="Aggregated GitHub contributions and wallet analytics for Stacks projects" />
      </Head>

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-800">🚀 Stacks Project Leaders Dashboard</h1>
            <ConnectWallet />
          </div>

          {/* Tab Navigation */}
          <div className="mt-6 flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('contributors')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'contributors'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              GitHub Contributors
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'wallet'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Wallet Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'contributors' && (
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">GitHub Contributors</h2>
            <p className="mb-6 text-gray-600">Aggregated contributions across key Stacks Network repositories.</p>

            {isLoading && <div className="text-center py-8">Loading contributors...</div>}
            {error && <div className="text-center py-8 text-red-500">Error: {error}</div>}

            {!isLoading && !error && (
              <ul className="space-y-3">
                {contributors.map((contributor, index) => (
                  <li key={contributor.login} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-md shadow-sm transition duration-150 ease-in-out">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-gray-500 w-8 text-right">{index + 1}.</span>
                      <img src={contributor.avatarUrl} alt={contributor.login} className="w-10 h-10 rounded-full shadow" />
                      <a href={contributor.profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        @{contributor.login}
                      </a>
                    </div>
                    <span className="font-bold text-lg text-indigo-600">
                      {contributor.commits.toLocaleString()} commits
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'wallet' && <Dashboard />}
      </div>
    </div>
  );
}
