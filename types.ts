/**
 * Type definitions for the Stacks Leaders/Contributors Dashboard
 */

import { UserRole } from './constants';

/**
 * Represents a user in the Stacks ecosystem
 */
export interface StacksUser {
  /** The Stacks wallet address */
  address: string;
  
  /** Display name or username */
  username?: string;
  
  /** User role - leader or contributor */
  role: UserRole;
  
  /** Number of contributions made */
  contributions: number;
  
  /** Total STX earned through contributions */
  earned: number;
  
  /** Timestamp of last activity */
  lastActive: number;
  
  /** Profile avatar URL */
  avatarUrl?: string;
}

/**
 * Pagination metadata for API responses
 */
export interface PaginationMeta {
  /** Current page number */
  page: number;
  
  /** Number of items per page */
  perPage: number;
  
  /** Total number of items */
  total: number;
  
  /** Total number of pages */
  totalPages: number;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  
  /** Pagination metadata */
  pagination?: PaginationMeta;
  
  /** Error message if any */
  error?: string;
  
  /** Whether the request was successful */
  success: boolean;
}

/**
 * Dashboard statistics summary
 */
export interface DashboardStats {
  /** Total number of leaders */
  totalLeaders: number;
  
  /** Total number of contributors */
  totalContributors: number;
  
  /** Total STX distributed */
  totalStxDistributed: number;
  
  /** Number of active projects */
  activeProjects: number;
  
  /** Average contribution value */
  averageContribution: number;
}

/**
 * On-chain activity metrics for a user
 */
export interface OnChainMetrics {
  /** Number of transactions */
  txCount: number;
  
  /** Total STX transferred in */
  totalReceived: number;
  
  /** Total STX transferred out */
  totalSent: number;
  
  /** Number of smart contracts interacted with */
  contractInteractions: number;
  
  /** Last block height updated */
  lastBlockHeight: number;
}

/**
 * Repository information
 */
export interface ProjectRepository {
  /** Repository name */
  name: string;
  
  /** Repository owner */
  owner: string;
  
  /** Number of stars */
  stars: number;
  
  /** Number of forks */
  forks: number;
  
  /** Primary language */
  language: string;
  
  /** Last updated timestamp */
  updatedAt: number;
}
