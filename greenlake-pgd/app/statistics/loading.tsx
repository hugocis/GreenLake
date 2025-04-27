import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#10B981]"></div>
      <h2 className="mt-4 text-xl font-semibold text-[#065F46]">Cargando estadísticas...</h2>
    </div>
  );
}
