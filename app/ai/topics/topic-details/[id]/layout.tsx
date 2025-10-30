'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

// app/ai/actions/custom-action/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
    

  const pathName = usePathname();
  const isActive = pathName.startsWith('/ai/topics/topic-details');
  const isAction = '';
  return (
    <div>
      {/* <div className="h-[60px] w-full shadow px-10 flex items-center gap-5 fixed bg-white z-1">
        <Link href="">
          <p
            className={`flex items-center text-1xl lg:mx-3 mx-1 h-full lg:px-2 px:2 transition-all ${
              isActive
                ? 'border-b-2 border-green-500 text-green-500 font-semibold'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            Topic Configuration
          </p>
        </Link>

        <Link href="">
          <p
            className={`flex items-center text-1xl lg:mx-3 mx-1 h-full lg:px-2 px:2 transition-all ${
              isAction
                ? 'border-b-2 border-green-500 text-green-500 font-semibold'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            Topic Actions
          </p>
        </Link>
      </div> */}
      {children}
    </div>
  );
}
