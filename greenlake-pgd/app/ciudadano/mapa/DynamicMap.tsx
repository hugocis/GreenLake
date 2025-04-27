'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
  () => import('./MapComponent').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

export default DynamicMap;
