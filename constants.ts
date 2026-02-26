/**
 * User role types for the Stacks Leaders/Contributors Dashboard
 */
export enum UserRole {
  LEADER = 'leader',
  CONTRIBUTOR = 'contributor'
}

/**
 * Configuration constants for the dashboard
 */
export const CONFIG = {
  /**
   * Maximum number of contributors to display per page
   */
  CONTRIBUTORS_PER_PAGE: 20,
  
  /**
   * Maximum number of leaders to display per page
   */
  LEADERS_PER_PAGE: 10,
  
  /**
   * API request timeout in milliseconds
   */
  API_TIMEOUT: 30000,
  
  /**
   * Cache duration in seconds
   */
  CACHE_DURATION: 300
} as const;

/**
 * Network configuration for Stacks
 */
export const NETWORK_CONFIG = {
  mainnet: {
    url: 'https://stacks-node-api.mainnet.stacks.co',
    chainId: 1
  },
  testnet: {
    url: 'https://stacks-node-api.testnet.stacks.co',
    chainId: 2147483648
  }
} as const;

export type NetworkName = keyof typeof NETWORK_CONFIG;
