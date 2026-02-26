/**
 * Utility functions for formatting data in the Stacks Dashboard
 */

/**
 * Formats a STX amount for display
 * @param microStx - Amount in micro-STX
 * @returns Formatted STX string
 */
export function formatStxAmount(microStx: number): string {
  const stx = microStx / 1000000;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(stx);
}

/**
 * Truncates a Stacks address for display
 * @param address - Full Stacks address
 * @param prefixLength - Number of characters to show at start
 * @param suffixLength - Number of characters to show at end
 * @returns Truncated address string
 */
export function truncateAddress(
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4
): string {
  if (!address || address.length <= prefixLength + suffixLength) {
    return address;
  }
  return `${address.slice(0, prefixLength)}…${address.slice(-suffixLength)}`;
}

/**
 * Formats a timestamp to a relative time string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  return 'just now';
}

/**
 * Formats a number with ordinal suffix
 * @param n - Number to format
 * @returns Formatted string with ordinal (e.g., "1st", "2nd", "3rd")
 */
export function formatOrdinal(n: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  return `${n}${suffix}`;
}

/**
 * Validates a Stacks address format
 * @param address - Address to validate
 * @returns Whether the address is valid
 */
export function isValidStacksAddress(address: string): boolean {
  // Stacks addresses are either 20 bytes (mainnet) or 28 bytes (testnet)
  const mainnetRegex = /^SP[0-9A-HJ-NP-Za-km-z]{38}$/;
  const testnetRegex = /^ST[0-9A-HJ-NP-Za-km-z]{38}$/;
  
  return mainnetRegex.test(address) || testnetRegex.test(address);
}

/**
 * Calculates percentage change between two values
 * @param oldValue - Previous value
 * @param newValue - Current value
 * @returns Percentage change (positive or negative)
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) {
    return newValue > 0 ? 100 : 0;
  }
  return ((newValue - oldValue) / oldValue) * 100;
}
