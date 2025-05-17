import db from "../models";
exports.getUserProfile = async (userId) => {
  try {
    const user = await db.User.findByPk(userId);

    if (!user) {
      return null;
    }

    // Lấy thông tin role của người dùng
    const role = await db.Role.findByPk(user.role_id);

    return {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role_id: user.role_id,
      role_name: role ? role.role_name : "No role",
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
      phone_number: user.phone_number,
      address: user.address,
      dob: user.dob,
      gender: user.gender,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching user profile");
  }
};


exports.updateUserProfile = async (userId, updateData) => {
  try {
    const user = await db.User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }
    delete updateData.email;
    delete updateData.password;
    delete updateData.role_id;

    await user.update(updateData);
    const role = await db.Role.findByPk(user.role_id);

    return {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role_id: user.role_id,
      role_name: role ? role.role_name : "No role",
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
      phone_number: user.phone_number,
      address: user.address,
      dob: user.dob,
      gender: user.gender,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Error updating user profile");
  }
};

//News
// Các phương thức cho News
exports.getAllNews = async () => {
  try {
    const news = await db.News.findAll();  // Truy vấn tất cả tin tức
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Error fetching news');
  }
};

exports.getNewsById = async (id) => {
  try {
    const newsItem = await db.News.findByPk(id);  // Truy vấn tin tức theo ID
    return newsItem;
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    throw new Error('Error fetching news by ID');
  }
};

// exports.createNews = async (newsData) => {
//   try {
//     const newNews = await db.News.create(newsData);  // Tạo mới tin tức
//     return newNews;
//   } catch (error) {
//     console.error('Error creating news:', error);
//     throw new Error('Error creating news');
//   }
// };
exports.createNews = async (newsData) => {
  try {
    // Kiểm tra nếu thiếu category, gán giá trị mặc định
    if (!newsData.category) {
      throw new Error("Category is required");
    }

    // Nếu có category hợp lệ, tiến hành tạo tin tức mới
    const newNews = await db.News.create(newsData);
    return newNews;
  } catch (error) {
    console.error('Error creating news:', error);
    throw new Error('Error creating news: ' + error.message); // In lỗi chi tiết
  }
};

exports.updateNews = async (id, updateData) => {
  try {
    const newsItem = await db.News.findByPk(id);
    if (!newsItem) {
      return null;
    }
    // Cập nhật thông tin tin tức
    newsItem.title = updateData.title || newsItem.title;
    newsItem.content = updateData.content || newsItem.content;
    newsItem.image_url = updateData.image_url || newsItem.image_url;
    await newsItem.save();
    return newsItem;
  } catch (error) {
    console.error('Error updating news:', error);
    throw new Error('Error updating news');
  }
};

exports.deleteNews = async (id) => {
  try {
    const newsItem = await db.News.findByPk(id);
    if (!newsItem) {
      return null;
    }
    await newsItem.destroy();  // Xóa tin tức
    return newsItem;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw new Error('Error deleting news');
  }
};


// threaters
export const getAllTheaters = async () => {
  return await db.Theater.findAll({
    include: [
      {
        model: db.Screen,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [
          db.Sequelize.fn("COUNT", db.Sequelize.col("Screens.screen_id")),
          "total_screens",
        ],
      ],
    },
    group: ["Theater.theater_id"],
  });
};

// screen
export const getAllScreens = async () => {
  return await db.Screen.findAll({
    include: [{ model: db.Theater, attributes: ["name", "location"] }],
    order: [["createdAt", "DESC"]],
  });
};

// review
export const getReviewsByMovieId = async (movieId) => {
  try {
    const reviews = await db.Review.findAll({
      where: { movie_id: movieId },
      include: [
        {
          model: db.User,
          attributes: ["user_id", "full_name", "avatar"],
        },
      ],
      order: [["review_time", "DESC"]],
    });
    return reviews;
  } catch (err) {
    console.error("Error fetching reviews:", err);
    throw new Error("Error fetching reviews");
  }
};

// Tạo một review mới
export const createReview = async (reviewData) => {
  try {
    const user = await db.User.findByPk(reviewData.user_id);
    if (!user) throw new Error("User not found");

    const movie = await db.Movie.findByPk(reviewData.movie_id);
    if (!movie) throw new Error("Movie not found");

    const newReview = await db.Review.create(reviewData);
    return newReview;
  } catch (err) {
    console.error("Error creating review:", err);
    throw err;
  }
};

export const deleteReviewByUser = async (reviewId, userId) => {
  try {
    const review = await db.Review.findByPk(reviewId);

    if (!review) throw new Error("Không tìm thấy review");

    // Kiểm tra quyền sở hữu
    if (review.user_id !== userId) {
      return false; // Không cho xoá nếu không phải chủ sở hữu
    }

    await review.destroy();
    return true;
  } catch (err) {
    console.error("Error deleting review:", err);
    throw err;
  }
};

// khuyến mãi
export const getAllPromotions = async () => {
  return await db.Promotion.findAll();
};