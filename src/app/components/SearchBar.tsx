import { useState } from "react";

export default function SearchBar({
  setSearchQuery,
}: {
  setSearchQuery: (query: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  let searchTimeout: NodeJS.Timeout | null = null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // デバウンス (500ms後に検索クエリを設定)
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchQuery(value);
    }, 500);
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return (
    <div className="mb-4 flex items-center space-x-2">
      <input
        type="text"
        value={inputValue}
        placeholder="ゲームを検索..."
        onChange={handleSearch}
        className="flex-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
      />
      {inputValue && (
        <button
          onClick={clearSearch}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          クリア
        </button>
      )}
    </div>
  );
}
