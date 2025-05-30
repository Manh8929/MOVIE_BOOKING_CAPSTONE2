'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('movies', [
      {
        title: 'Tội Đồ',
        genre: 'Horror, Thriller',
        description: 'Cố gắng bỏ lại cuộc sống đầy rắc rối của mình, hai anh em sinh đôi trở về quê hương để bắt đầu lại, chỉ để phát hiện ra rằng một cái ác thậm chí còn lớn hơn đang chờ đợi để chào đón họ trở lại.',
        duration: 120,
        release_date: new Date('2025-04-16'),
        status: 'now_showing',
        poster_url: 'https://image.tmdb.org/t/p/w500/nAxGnGHOsfzufThz20zgmRwKur3.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/nAxGnGHOsfzufThz20zgmRwKur3.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/x3KxN6LUDbIdNwcsjrgizt7nTZU.jpg',
        detailed_description: 'Một câu chuyện đầy kịch tính và hồi hộp.',
        rating: 7.599,
        average_rating: 7.5,
        director: 'John Doe',
        actors: 'Actor 1, Actor 2',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Van Gogh by Vincent',
        genre: 'Documentary',
        description: 'Khám phá cuộc đời và sự nghiệp của họa sĩ Vincent Van Gogh.',
        duration: 120,
        release_date: new Date('2025-03-26'),
        status: 'now_showing',
        poster_url: 'https://image.tmdb.org/t/p/w500/z73X4WKZghBh5fri31o8P6vBEB2.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/z73X4WKZghBh5fri31o8P6vBEB2.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar2.jpg',
        detailed_description: 'Một bộ phim tài liệu đầy cảm hứng.',
        rating: 6.4,
        average_rating: 6.0,
        director: 'Jane Smith',
        actors: 'Actor A, Actor B',
        language: 'French',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Tiếng Vọng Kinh Hoàng',
        genre: 'Horror, Comedy',
        description: 'Tất cả đều chết. Hết sức tan hoang.',
        duration: 120,
        release_date: new Date('2025-02-14'),
        status: 'upcoming',
        poster_url: 'https://image.tmdb.org/t/p/w500/A35vkuUU5bIFvFhGtIQNueEO0gb.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/A35vkuUU5bIFvFhGtIQNueEO0gb.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar3.jpg',
        detailed_description: 'Một bộ phim hài kinh dị đầy bất ngờ.',
        rating: 5.9,
        average_rating: 5.5,
        director: 'Mark Johnson',
        actors: 'Actor X, Actor Y',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Hành Trình Của Moana 2',
        genre: 'Animation, Adventure, Comedy',
        description: '“Hành Trình của Moana 2” là màn tái hợp của Moana và Maui sau 3 năm, trở lại trong chuyến phiêu lưu cùng với những thành viên mới.',
        duration: 120,
        release_date: new Date('2024-11-21'),
        status: 'now_showing',
        poster_url: 'https://image.tmdb.org/t/p/w500/g8ikn2lfi4R04U7BtXvHmYvnUTV.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/g8ikn2lfi4R04U7BtXvHmYvnUTV.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar4.jpg',
        detailed_description: 'Một cuộc phiêu lưu thú vị đầy màu sắc.',
        rating: 7.077,
        average_rating: 7.0,
        director: 'Emily Brown',
        actors: 'Actor M, Actor N',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Siêu Nhí Karate: Những Huyền Thoại',
        genre: 'Action, Adventure, Drama',
        description: 'Một câu chuyện về những đứa trẻ học karate và những cuộc phiêu lưu của chúng.',
        duration: 120,
        release_date: new Date('2025-05-08'),
        status: 'now_showing',
        poster_url: 'https://image.tmdb.org/t/p/w500/ckI6bmQDvvGy20FPTIW1kfGKGRK.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/ckI6bmQDvvGy20FPTIW1kfGKGRK.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar5.jpg',
        detailed_description: 'Một bộ phim hành động đầy cảm hứng cho trẻ em.',
        rating: 7.469,
        average_rating: 7.2,
        director: 'Robert Green',
        actors: 'Actor K, Actor L',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Nhà hàng của các bà',
        genre: 'Comedy',
        description: 'Sau khi mất đi người mẹ thân yêu, người đàn ông nọ mạo hiểm mọi thứ để tôn vinh bà bằng cách mở một nhà hàng Ý với đội đầu bếp là những người bà thực thụ.',
        duration: 120,
        release_date: new Date('2025-05-01'),
        status: 'now_showing',
        poster_url: 'https://image.tmdb.org/t/p/w500/vE15XYl5QyCdMKjJIb33iE7SwYf.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/vE15XYl5QyCdMKjJIb33iE7SwYf.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar6.jpg',
        detailed_description: 'Một bộ phim hài ấm áp và đầy cảm xúc.',
        rating: 6.7,
        average_rating: 6.5,
        director: 'Anna White',
        actors: 'Actor P, Actor Q',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Cá Mập Siêu Bạo Chúa',
        genre: 'Action, Science Fiction, Horror',
        description: 'Một chiếc tàu ngầm dưới lòng biển sâu bị tấn công bởi một sinh vật khổng lồ và đầy nguy hiểm được cho là đã tuyệt chủng từ lâu.',
        duration: 120,
        release_date: new Date('2018-08-09'),
        status: 'now_showing',
        poster_url: 'https://image.tmdb.org/t/p/w500/xNVLc2ZoKVaXOPWG4zKoTb5nPI0.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/xNVLc2ZoKVaXOPWG4zKoTb5nPI0.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar7.jpg',
        detailed_description: 'Một bộ phim hành động đầy kịch tính.',
        rating: 6.248,
        average_rating: 6.0,
        director: 'Chris Black',
        actors: 'Actor R, Actor S',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Trốn Thoát',
        genre: 'Mystery, Horror',
        description: 'Chris và bạn gái của anh, Rose, lên vùng nông thôn để thăm bố mẹ cô vào cuối tuần.',
        duration: 120,
        release_date: new Date('2017-02-24'),
        status: 'ended',
        poster_url: 'https://image.tmdb.org/t/p/w500/A1nsaaR2rneUakmFwcSXe2MV2KT.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/A1nsaaR2rneUakmFwcSXe2MV2KT.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar8.jpg',
        detailed_description: 'Một bộ phim kinh dị đầy hồi hộp.',
        rating: 7.619,
        average_rating: 7.5,
        director: 'David Lee',
        actors: 'Actor T, Actor U',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Wonder Woman 1984: Nữ Thần Chiến Binh',
        genre: 'Action, Adventure, Fantasy',
        description: 'Lấy bối cảnh năm 1984, Wonder Woman tái hợp với người yêu tưởng chừng đã qua đời.',
        duration: 120,
        release_date: new Date('2020-12-16'),
        status: 'ended',
        poster_url: 'https://image.tmdb.org/t/p/w500/sNsIt30NRa350w9AhobibBaAmlt.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U',
        banner_url: 'https://image.tmdb.org/t/p/w500/sNsIt30NRa350w9AhobibBaAmlt.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar9.jpg',
        detailed_description: 'Một câu chuyện siêu anh hùng đầy cảm xúc.',
        rating: 6.412,
        average_rating: 6.0,
        director: 'Patty Jenkins',
        actors: 'Actor V, Actor W',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Liên Minh Công Lý',
        genre: 'Action, Adventure, Fantasy',
        description: 'Justice League hay còn được biết đến với cái tên Liên Minh Công Lý.',
        duration: 120,
        release_date: new Date('2017-11-15'),
        status: 'ended',
        poster_url: 'https://image.tmdb.org/t/p/w500/e07xT5FHOSfaRSjW0J6G18tDviN.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U0',
        banner_url: 'https://image.tmdb.org/t/p/w500/e07xT5FHOSfaRSjW0J6G18tDviN.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar10.jpg',
        detailed_description: 'Một bộ phim siêu anh hùng đầy hành động.',
        rating: 6.075,
        average_rating: 6.0,
        director: 'Zack Snyder',
        actors: 'Actor X1, Actor X2',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Đại Chiến Hành Tinh Khỉ',
        genre: 'Action, Drama, Science Fiction',
        description: 'War for Planet of the Apes, phần phim thứ 3 và cũng là cuối cùng của trilogy Planet of the Apes.',
        duration: 120,
        release_date: new Date('2017-07-11'),
        status: 'ended',
        poster_url: 'https://image.tmdb.org/t/p/w500/irKFi76XZOpUg0QdEfhUd3u3Jcl.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4UZOpUg0QdEfhUd3u3Jcl.jpg',
        banner_url: 'https://image.tmdb.org/t/p/w500/banner11.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar11.jpg',
        detailed_description: 'Một bộ phim khoa học viễn tưởng đầy kịch tính.',
        rating: 7.207,
        average_rating: 7.0,
        director: 'Matt Reeves',
        actors: 'Actor Y1, Actor Y2',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Nàng Bạch Tuyết',
        genre: 'Family, Fantasy',
        description: 'Câu chuyện của Nàng Bạch Tuyết ban đầu cũng giống như cổ tích.',
        duration: 120,
        release_date: new Date('2025-03-12'),
        status: 'upcoming',
        poster_url: 'https://image.tmdb.org/t/p/w500/24vmIaNTaXPXKdveylQ2C3hcWaD.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U2',
        banner_url: 'https://image.tmdb.org/t/p/w500/24vmIaNTaXPXKdveylQ2C3hcWaD.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/24vmIaNTaXPXKdveylQ2C3hcWaD.jpg',
        detailed_description: 'Một câu chuyện cổ tích đầy màu sắc.',
        rating: 4.469,
        average_rating: 4.5,
        director: 'Director A',
        actors: 'Actor Z, Actor AA',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Mật Nghị Vatican',
        genre: 'Drama, Thriller, Mystery',
        description: 'Khi Hồng y Lawrence được giao nhiệm vụ lãnh đạo một trong những sự kiện bí mật và lâu đời nhất thế giới.',
        duration: 120,
        release_date: new Date('2024-10-25'),
        status: 'upcoming',
        poster_url: 'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2024/12/19/conclave-quad-poster-scaled-read-only-1734576827020246766420.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U3',
        banner_url: 'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2024/12/19/conclave-quad-poster-scaled-read-only-1734576827020246766420.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar13.jpg',
        detailed_description: 'Một bộ phim đầy bí ẩn và kịch tính.',
        rating: 7.2,
        average_rating: 7.0,
        director: 'Director B',
        actors: 'Actor BB, Actor CC',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Chuyến tàu viên đạn kinh hoàng',
        genre: 'Action, Thriller',
        description: 'Các nhà chức trách phải chạy đua với thời gian để cứu hành khách đang hoảng loạn trên con tàu cao tốc hướng đến Tokyo.',
        duration: 120,
        release_date: new Date('2025-04-23'),
        status: 'upcoming',
        poster_url: 'https://image.tmdb.org/t/p/w500/2tYBZqzHmnQenBtowLh55oIWsOY.jpg',
        trailer_url: 'https://www.youtube.com/embed/HXWRTGbhb4U4',
        banner_url: 'https://image.tmdb.org/t/p/w500/2tYBZqzHmnQenBtowLh55oIWsOY.jpg',
        avatar_url: 'https://image.tmdb.org/t/p/w500/avatar14.jpg',
        detailed_description: 'Một bộ phim hành động hồi hộp.',
        rating: 6.887,
        average_rating: 6.5,
        director: 'Director C',
        actors: 'Actor DD, Actor EE',
        language: 'English',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
