type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages?: number; // オプションで総ページ数を受け取る
};

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex justify-center mt-8">
      {/* 前へボタン */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        disabled={page === 1}
        aria-label="前のページへ"
      >
        前へ
      </button>

      {/* 現在のページ */}
      <span className="px-4 py-2" aria-label={`現在のページ: ${page}`}>
        {page}
      </span>

      {/* 次へボタン */}
      <button
        onClick={() =>
          setPage((prev) =>
            totalPages ? Math.min(prev + 1, totalPages) : prev + 1
          )
        }
        className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        disabled={totalPages ? page >= totalPages : false}
        aria-label="次のページへ"
      >
        次へ
      </button>
    </div>
  );
}
