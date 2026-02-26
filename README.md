# Leaders Contributors Dashboard

A powerful Stacks ecosystem dashboard for tracking project leaders, contributors, engagement metrics, and on-chain activity.

## Overview

This dashboard provides real-time insights, contributor reputation data, and project growth analytics to support transparent, community-driven development on Stacks.

## Features

- **Leader Tracking**: Monitor and track project leaders in the Stacks ecosystem
- **Contributor Analytics**: View detailed contributor metrics and engagement data
- **On-Chain Metrics**: Real-time blockchain activity and transaction data
- **Project Growth**: Track growth metrics across multiple Stacks projects

## Tech Stack

- **Frontend**: React, Next.js
- **Styling**: Tailwind CSS
- **Blockchain**: Stacks (Bitcoin L2)
- **Testing**: Jest

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Stacks wallet (Hiro Wallet recommended)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_STACKS_NETWORK=testnet
NEXT_PUBLIC_API_URL=your_api_url
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   └── lib/           # Utility functions
├── pages/             # Next.js pages
├── utils/             # Helper functions
├── types.ts           # TypeScript type definitions
└── constants.ts       # Application constants
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT
