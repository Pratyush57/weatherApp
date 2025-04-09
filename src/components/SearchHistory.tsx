import React from 'react';
import { SearchHistory as SearchHistoryType } from '../types/weather';
import { History } from 'lucide-react';

interface SearchHistoryProps {
  history: SearchHistoryType[];
  onSelect: (city: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-700">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <button
            key={`${item.city}-${index}`}
            onClick={() => onSelect(item.city)}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300"
          >
            {item.city}
          </button>
        ))}
      </div>
    </div>
  );
};