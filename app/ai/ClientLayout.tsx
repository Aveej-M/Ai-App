'use client';

import { usePathname } from 'next/navigation';
import Spark from '../compenents/Spark';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showSpark = pathname !== '/ai';

  return (
    <div className="flex w-full flex-col">
      {showSpark && <Spark />}
      {children}
    </div>
  );
}
