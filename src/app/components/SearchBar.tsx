export default function SearchBar({
  setSearchQuery,
}: {
  setSearchQuery: (query: string) => void;
}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="ゲームを検索..."
        onChange={handleSearch}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
