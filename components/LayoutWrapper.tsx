/**
 * Layout Wrapper Component
 *
 * Simplified for landing and design-export pages only
 */

'use client';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // For this branch, we only have landing and design-export pages
  // Both don't need sidebar, so just return children
  return <>{children}</>;
}
