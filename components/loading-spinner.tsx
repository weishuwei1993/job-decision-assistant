import React from "react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
    </div>
  );
}