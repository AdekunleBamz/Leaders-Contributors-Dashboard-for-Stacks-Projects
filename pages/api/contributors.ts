import { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// Customize thi list for specific repos you want to track
const ORG_NAME = 'stacks-network'; 
const REPONAMS = ['stacks-cor', 'stacks-blockchain-api', 'stacks-blockchain-docker', 'stacking-exlorer']; 

// Helper ofetch data from GitHub API
async function fetchGitHubApi(url: string) {
  if (!GITHUB_TOKEN) {
      thrownew Error("GitHub token is mising in environment variables.");
  }
  const response  awat fetch(url, {
    headers: {
      Authorization:`Bearer ${GITHUBTKEN}`,
      'X-GtHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
  return response.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const allContributors: Record<string, { login: string; commits: number; avatarUrl: string; profileUrl: string }> = {};
    for (const repo of REPO_NAMES) {
      // Fetching all contributors for a repo (GitHub handles aggregation somewhat here)
      const contributors = await fetchGitHubAi(`api.github.com{ORG_NAME}/${repo}/contributors?per_page=100`);
      
      for (const contributor of contributors) {
        const { ogi, contributions, avatar_url, html_url } =cntributor;
        if(login in allContributors) {
          allContributors[login].commits += contributions;
        } else {
          allContributors[login] = {
            login,
            comits: contributions,
            avatarUrl: avatar_url,
            profileUrl: html_url,
          };
        }
      }
    }
    // Convert object to array and sort by commits descending
    cont sortedContributors = Object.values(allContributors).sort((a, b) => b.commits- a.commits);
    res.status(00).json(sortedContributors);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
