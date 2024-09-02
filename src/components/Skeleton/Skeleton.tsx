import React from "react";


const SkeletonSearchCard = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-900 p-9 py-8 rounded-lg mb-8">
        <div className="w-full h-10 bg-gray-300 dark:bg-slate-800 rounded-lg"></div>
      </div>
    </div>
  );
}

const SkeletonJobCard = () => {
  return (
    <div className="animate-pulse">
    <div className="bg-gray-50 dark:bg-slate-900 p-9 py-6 rounded-lg mb-8">
      <div className="flex space-x-4">
        <div className="w-20 h-20 mt-4 bg-gray-300 dark:bg-slate-800 rounded-lg"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 bg-gray-300 dark:bg-slate-800 rounded w-40"></div>
          <div className="h-4 bg-gray-300 dark:bg-slate-800 rounded w-1/5"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-slate-800 rounded w-2/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-slate-800 rounded w-1/6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

const SkeletonJobCards = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonJobCard key={index} />
      ))}
    </>
  );
};

export { SkeletonJobCards, SkeletonSearchCard };
