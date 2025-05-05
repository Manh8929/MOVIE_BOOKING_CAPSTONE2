const MovieDetailModal = ({ movie, onClose }) => {
    if (!movie) return null;
  
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN");
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-[80%] max-h-[90vh] overflow-y-auto p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-600 text-lg font-bold"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Thể loại:</strong> {movie.genre}</div>
            <div><strong>Đạo diễn:</strong> {movie.director}</div>
            <div><strong>Diễn viên:</strong> {movie.actors}</div>
            <div><strong>Thời lượng:</strong> {movie.duration} phút</div>
            <div><strong>Ngày phát hành:</strong> {formatDate(movie.release_date)}</div>
            <div><strong>Trạng thái:</strong> {movie.status}</div>
            <div><strong>Ngôn ngữ:</strong> {movie.language}</div>
            <div><strong>Đánh giá:</strong> {movie.rating}/10</div>
            <div className="col-span-2"><strong>Mô tả:</strong> {movie.description}</div>
            <div className="col-span-2"><strong>Mô tả chi tiết:</strong> {movie.detailed_description}</div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {["banner_url", "poster_url", "avatar_url"].map((key) => (
              <div key={key}>
                <h4 className="font-semibold mb-1 capitalize">{key.replace("_url", "").replace("_", " ")}</h4>
                {movie[key] && <img src={movie[key]} alt={key} className="w-full h-auto rounded shadow" />}
              </div>
            ))}
          </div>
          {movie.trailer_url && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Trailer</h4>
              <iframe
                src={movie.trailer_url}
                className="w-full aspect-video rounded"
                allowFullScreen
                title="Trailer"
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default MovieDetailModal;
  