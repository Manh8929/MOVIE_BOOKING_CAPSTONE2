// const translate = require("google-translate-api-x");
// const language = require("@google-cloud/language");
// const Fuse = require("fuse.js");
// const moment = require("moment");
// const Holidays = require("date-holidays");
// const { Showtime, Movie } = require("../models");
// const { Op } = require("sequelize");

// const client = new language.LanguageServiceClient();

// // 📅 Xác định ngày đặc biệt
// function isSpecialDay(date) {
//   const hd = new Holidays("VN");
//   const holiday = hd.isHoliday(date);
//   const weekday = moment(date).isoWeekday(); // 6 = T7, 7 = CN
//   const isWeekend = weekday >= 6;

//   return {
//     isWeekend,
//     isHoliday: Boolean(holiday),
//     holidayName: holiday ? holiday[0].name : null,
//     isSpecial: isWeekend || Boolean(holiday),
//   };
// }

// // 🎯 Gợi ý phim theo thể loại
// function suggestMoviesByGenre(showtimes, genre) {
//   const genreLower = genre.toLowerCase();
//   const matched = showtimes.filter(
//     (s) => s.Movie.genre && s.Movie.genre.toLowerCase().includes(genreLower)
//   );

//   if (matched.length === 0) return null;

//   const titles = [...new Set(matched.map((s) => s.Movie.title))];
//   return `📚 Gợi ý phim thể loại **${genre}**: ${titles.join(", ")}. Bạn muốn xem phim nào?`;
// }

// // 📚 Gợi ý các thể loại có trong dữ liệu
// function promptGenres(showtimes) {
//   const genres = [
//     ...new Set(
//       showtimes
//         .map((s) => s.Movie.genre)
//         .filter(Boolean)
//         .flatMap((g) => g.split(",").map((s) => s.trim()))
//     ),
//   ];
//   return `🎭 Bạn muốn xem phim thể loại nào? Các thể loại đang có gồm: ${genres.join(", ")}`;
// }

// // 💬 Sinh phản hồi từ chatbot
// function generateBotReply(entities, translatedText, showtimesToday = [], originalText = "") {
//   const text = translatedText.toLowerCase();
//   const original = originalText.toLowerCase();
//   const entityNames = entities.map((e) => e.name.toLowerCase());

//   const movieTitles = [...new Set(showtimesToday.map((s) => s.Movie.title))];

//   // 🎯 Fuzzy tìm tên phim bằng tiếng Việt (original) trước
//   const fuseOriginal = new Fuse(movieTitles, { threshold: 0.4 });
//   const fuzzyMatchOriginal = fuseOriginal.search(original);
//   if (fuzzyMatchOriginal.length > 0) {
//     const matchedTitle = fuzzyMatchOriginal[0].item;
//     const matchedMovie = showtimesToday.find((s) => s.Movie.title === matchedTitle);
//     if (matchedMovie) {
//     //   return `🎟️ Bạn muốn xem **${matchedTitle}**? Xem chi tiết & đặt vé tại: http://localhost:5173/detail-film/${matchedMovie.movie_id}`;
//     return `🎟️ Bạn muốn xem <strong>${matchedTitle}</strong>? Xem chi tiết & đặt vé tại: <a href="http://localhost:5173/detail-film/${matchedMovie.movie_id}" target="_blank">http://localhost:5173/detail-film/${matchedMovie.movie_id}</a>`;
//     }
//   }

//   // Nếu không match được, thử fuzzy theo bản dịch
//   const fuseTranslated = new Fuse(movieTitles, { threshold: 0.4 });
//   const fuzzyMatchTranslated = fuseTranslated.search(text);
//   if (fuzzyMatchTranslated.length > 0) {
//     const matchedTitle = fuzzyMatchTranslated[0].item;
//     const matchedMovie = showtimesToday.find((s) => s.Movie.title === matchedTitle);
//     if (matchedMovie) {
//     //   return `🎟️ Bạn muốn xem **${matchedTitle}**? Xem chi tiết & đặt vé tại: http://localhost:5173/detail-film/${matchedMovie.movie_id}`;
//     return `🎟️ Bạn muốn xem <strong>${matchedTitle}</strong>? Xem chi tiết & đặt vé tại: <a href="http://localhost:5173/detail-film/${matchedMovie.movie_id}" target="_blank">http://localhost:5173/detail-film/${matchedMovie.movie_id}</a>`;
//     }
//   }

//   // 🗓️ Hỏi về lịch chiếu hôm nay
//   if (
//     entityNames.includes("movie schedule") ||
//     text.includes("today") ||
//     text.includes("showtimes") ||
//     original.includes("lịch chiếu") ||
//     original.includes("hôm nay")
//   ) {
//     if (showtimesToday.length === 0) {
//       return "📭 Hôm nay không có lịch chiếu nào.";
//     }

//     const { isSpecial, isWeekend, isHoliday, holidayName } = isSpecialDay(new Date());
//     const movies = [...new Set(showtimesToday.map((s) => s.Movie.title))];

//     if (isSpecial) {
//       const label = isHoliday
//         ? `ngày lễ: ${holidayName} 🎉`
//         : "cuối tuần 🎊";
//       return `🎬 Hôm nay là ${label}. Gợi ý phim hot hôm nay: ${movies.join(", ")}. Bạn muốn xem phim nào?`;
//     } else {
//       return promptGenres(showtimesToday);
//     }
//   }

//   // ☎️ Yêu cầu hỗ trợ
//   if (
//     original.includes("hỗ trợ") ||
//     original.includes("liên hệ") ||
//     original.includes("tư vấn") ||
//     original.includes("hotline") ||
//     text.includes("help") ||
//     text.includes("support")
//   ) {
//     return "📞 Để được hỗ trợ bạn vui lòng gọi điện đến số hotline: 0385426052 để được tư vấn và hỗ trợ.";
//   }

//   // ⭐ Người dùng hỏi "gợi ý phim"
//   if (
//     original.includes("gợi ý phim") ||
//     text.includes("suggest movies") ||
//     entityNames.includes("movie suggestions")
//   ) {
//     if (showtimesToday.length === 0) {
//       return "📭 Hiện tại không có lịch chiếu phim để gợi ý.";
//     }

//     const allGenres = [
//       ...new Set(
//         showtimesToday
//           .map((s) => s.Movie.genre)
//           .filter(Boolean)
//           .flatMap((g) => g.split(",").map((s) => s.trim().toLowerCase()))
//       ),
//     ];

//     const mentionedGenre = allGenres.find((g) => text.includes(g) || original.includes(g));
//     if (mentionedGenre) {
//       const suggestion = suggestMoviesByGenre(showtimesToday, mentionedGenre);
//       return suggestion || `😢 Hiện không có phim nào thuộc thể loại "${mentionedGenre}" hôm nay.`;
//     } else {
//       return promptGenres(showtimesToday);
//     }
//   }

//   // 🧭 Nếu người dùng nhập tên thể loại nhưng không nói rõ "gợi ý phim"
//   const allGenres = [
//     ...new Set(
//       showtimesToday
//         .map((s) => s.Movie.genre)
//         .filter(Boolean)
//         .flatMap((g) => g.split(",").map((s) => s.trim().toLowerCase()))
//     ),
//   ];

//   const detectedGenre = allGenres.find((g) => text.includes(g) || original.includes(g));
//   if (detectedGenre) {
//     const suggestion = suggestMoviesByGenre(showtimesToday, detectedGenre);
//     return suggestion || `😢 Hiện không có phim nào thuộc thể loại "${detectedGenre}" hôm nay.`;
//   }

//   // ❓ Mặc định
//   return "🤖 Mình chưa hiểu câu hỏi. Bạn có thể hỏi về lịch chiếu, tên phim hoặc thể loại phim bạn thích nhé!";
// }

// // 📆 Lấy lịch chiếu hôm nay
// async function getTodayShowtimes() {
//   const start = new Date();
//   start.setHours(0, 0, 0, 0);
//   const end = new Date();
//   end.setHours(23, 59, 59, 999);

//   return await Showtime.findAll({
//     where: {
//       show_time: {
//         [Op.between]: [start, end],
//       },
//       status: "scheduled",
//     },
//     include: [
//       {
//         model: Movie,
//         attributes: ["title", "movie_id", "genre"],
//       },
//     ],
//   });
// }

// // 🚀 Phân tích câu hỏi & tạo phản hồi
// async function analyzeUserMessage(message) {
//   try {
//     const translated = await translate(message, { to: "en" });
//     const translatedText = translated.text;

//     const [result] = await client.analyzeEntities({
//       document: {
//         content: translatedText,
//         type: "PLAIN_TEXT",
//         language: "en",
//       },
//     });

//     const entities = result.entities.map((e) => ({
//       name: e.name,
//       type: e.type,
//       salience: e.salience,
//     }));

//     const showtimesToday = await getTodayShowtimes();
//     const reply = generateBotReply(entities, translatedText, showtimesToday, message);

//     return {
//       original: message,
//       translated: translatedText,
//       entities,
//       reply,
//     };
//   } catch (err) {
//     console.error("Chatbot Error:", err);
//     throw new Error("Failed to process message.");
//   }
// }

// module.exports = {
//   analyzeUserMessage,
// };

/////////////////////////////////





const translate = require("google-translate-api-x");
const language = require("@google-cloud/language");
const Fuse = require("fuse.js");
const moment = require("moment");
const { Showtime, Movie } = require("../models");
const { Op } = require("sequelize");

const client = new language.LanguageServiceClient();
const userContext = {};

async function getTodayShowtimes() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return await Showtime.findAll({
    where: { show_time: { [Op.between]: [start, end] } },
    include: [{ model: Movie }],
  });
}

async function getShowtimesByDate(dateStr) {
  const date = moment(dateStr, "DD/MM/YYYY").toDate();
  const start = new Date(date.setHours(0, 0, 0, 0));
  const end = new Date(date.setHours(23, 59, 59, 999));
  return await Showtime.findAll({
    where: { show_time: { [Op.between]: [start, end] } },
    include: [{ model: Movie }],
  });
}

async function getAnyScheduledByTitle(title) {
  return await Showtime.findOne({
    where: { status: "scheduled" },
    include: [{
      model: Movie,
      where: { title: { [Op.like]: `%${title}%` } },
      required: true,
    }],
    order: [["show_time", "ASC"]],
  });
}

function suggestMoviesByGenre(showtimes, genre) {
  const genreLower = genre.toLowerCase();
  const matched = showtimes.filter(
    (s) => s.status === "scheduled" && s.Movie.genre?.toLowerCase().includes(genreLower)
  );
  if (matched.length === 0) return null;
  const titles = [...new Set(matched.map((s) => s.Movie.title))];
  return `📚 Gợi ý phim thể loại **${genre}**: ${titles.join(", ")}. Bạn muốn xem phim nào?`;
}

function promptGenres(showtimes) {
  const genres = [...new Set(
    showtimes
      .filter((s) => s.status === "scheduled")
      .map((s) => s.Movie.genre)
      .filter(Boolean)
      .flatMap((g) => g.split(",").map((s) => s.trim()))
  )];
  return `🎭 Bạn muốn xem phim thể loại nào? Các thể loại đang có gồm: ${genres.join(", ")}`;
}

async function generateBotReply(entities, translatedText, showtimesToday = [], originalText = "", userId = "default") {
  const text = translatedText.toLowerCase();
  const original = originalText.toLowerCase();
  const entityNames = entities.map((e) => e.name.toLowerCase());

  const scheduledShowtimes = showtimesToday.filter(s => s.status === "scheduled");
  const canceledShowtimes = showtimesToday.filter(s => s.status === "canceled");
  const movieTitles = [...new Set(scheduledShowtimes.map((s) => s.Movie.title))];

  if (/^(hi|hello|chào|xin chào|hey)/.test(original)) {
    return "👋 Xin chào! Mình có thể giúp bạn tra lịch chiếu, gợi ý phim hoặc đặt vé. Hãy nhập câu hỏi nhé!";
  }

  if (original.includes("đã xem") || original.includes("xem hôm trước")) {
    return "📽️ Hiện mình chưa lưu lịch sử phim bạn đã xem. Bạn có thể hỏi về lịch chiếu hôm nay hoặc một ngày cụ thể.";
  }

  if (original.trim() === "lịch chiếu phim" || original.trim() === "lịch chiếu") {
    userContext[userId] = { awaitingDate: true };
    return "📅 Bạn muốn xem lịch chiếu phim vào ngày nào? (ví dụ: hôm nay, ngày mai hoặc 27/05)";
  }

  if (
    original.includes("hôm nay") && (original.includes("phim") || original.includes("lịch") || original.includes("chiếu")) ||
    text.includes("today showtimes") || entityNames.includes("movie schedule")
  ) {
    if (scheduledShowtimes.length === 0) return "📍 Hôm nay chưa có lịch chiếu nào.";
    const movies = [...new Set(scheduledShowtimes.map((s) => s.Movie.title))];
    return `🎮 Hôm nay có các phim: ${movies.join(", ")}. Bạn muốn xem phim nào?`;
  }

  if (original.includes("bị hủy") || text.includes("canceled")) {
    if (canceledShowtimes.length === 0) return "✅ Hôm nay không có suất chiếu nào bị hủy.";
    const list = canceledShowtimes.map(s => `${s.Movie.title} lúc ${moment(s.show_time).format("HH:mm")}`);
    return `❌ Các suất bị hủy hôm nay: ${list.join(", ")}`;
  }

  if (original.includes("đặt vé")) {
    return `📟 Hướng dẫn đặt vé:
1. Truy cập: http://localhost:5173
2. Chọn phim, suất chiếu, ghế
3. Thanh toán và nhận vé.`;
  }

  if (original.includes("giá vé")) {
    return `💺 Giá vé:
- Thường: 70.000đ
- VIP: 100.000đ
- Ghế đôi: 130.000đ`;
  }

  if (original.includes("liên hệ") || text.includes("support") || original.includes("hotline")) {
    return "📞 Để được hỗ trợ, bạn vui lòng gọi hotline: 0385426052.";
  }

  if (original.includes("gợi ý phim") || text.includes("suggest movies") || original.includes("thể loại")) {
    if (scheduledShowtimes.length === 0) return "📅 Hiện không có phim để gợi ý.";
    return promptGenres(scheduledShowtimes);
  }

  if (!original.match(/\d{1,2}\/\d{1,2}/) && !original.includes("ngày")) {
    const genreMatch = original.match(/phim (.+?) (không|\?|$)/);
    if (genreMatch) {
      const genre = genreMatch[1].trim();
      const suggestion = suggestMoviesByGenre(scheduledShowtimes, genre);
      return suggestion || `📅 Không tìm thấy phim thể loại "${genre}" hôm nay.`;
    }
  }

  const knownGenres = promptGenres(scheduledShowtimes)
    .match(/gồm: (.+)/)?.[1]
    ?.split(",")
    .map(g => g.trim().toLowerCase());

  if (knownGenres?.includes(original.trim())) {
    const suggestion = suggestMoviesByGenre(scheduledShowtimes, original.trim());
    return suggestion || `📅 Không tìm thấy phim thể loại "${original}" hôm nay.`;
  }

  const fuse = new Fuse(movieTitles, { threshold: 0.4 });
  const match = fuse.search(original)[0] || fuse.search(text)[0];
  if (match) {
    const matchedMovie = scheduledShowtimes.find(s => s.Movie.title === match.item);
    if (matchedMovie) {
      return `🎣 Bạn muốn xem <strong>${match.item}</strong>? <a href="http://localhost:5173/detail-film/${matchedMovie.Movie.movie_id}" target="_blank">Đặt vé ngay</a>`;
    }
  }

  const rawTitle = original
    .replace(/\?$/, "")
    .replace(/(có chiếu không|phim|phải không|đang chiếu|hôm nay|không)/gi, "")
    .trim();

  if (rawTitle.length > 1) {
    const movieByTitle = await getAnyScheduledByTitle(rawTitle);
    if (movieByTitle) {
      return `🎬 Phim **${movieByTitle.Movie.title}** sẽ chiếu vào lúc ${moment(movieByTitle.show_time).format("HH:mm DD/MM")}. <a href="http://localhost:5173/detail-film/${movieByTitle.Movie.movie_id}" target="_blank">Đặt vé</a>`;
    }
  }

  if (/\d{1,2}\/\d{1,2}/.test(originalText)) {
    if (scheduledShowtimes.length > 0) {
      const movies = [...new Set(scheduledShowtimes.map((s) => s.Movie.title))];
      return `🎮 Lịch chiếu phim ngày bạn chọn: ${movies.join(", ")}. Bạn muốn xem phim nào?`;
    } else {
      return "📅 Ngày bạn chọn hiện chưa có lịch chiếu.";
    }
  }

  return "🧠 Mình chưa hiểu câu hỏi. Bạn có thể hỏi về lịch chiếu, phim hoặc thể loại nhé!";
}

async function analyzeUserMessage(message, userId = "default") {
  try {
    if (userContext[userId]?.awaitingDate) {
      message = `lịch chiếu ${message}`;
      userContext[userId] = {};
    }

    const translated = await translate(message, { to: "en" });
    const translatedText = translated.text;

    const [result] = await client.analyzeEntities({
      document: {
        content: translatedText,
        type: "PLAIN_TEXT",
        language: "en",
      },
    });

    const entities = result.entities.map((e) => ({
      name: e.name,
      type: e.type,
      salience: e.salience,
    }));

    const original = message.toLowerCase();
    let showtimes = [];

    const fullDate = original.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    const shortDate = original.match(/(\d{1,2})\/(\d{1,2})/);
    const dayOnly = original.match(/ngày\s?(\d{1,2})/) || original.match(/^\s?(\d{1,2})\s?$/);

    if (fullDate) {
      const dateStr = `${fullDate[1].padStart(2, "0")}/${fullDate[2].padStart(2, "0")}/${fullDate[3]}`;
      showtimes = await getShowtimesByDate(dateStr);
    } else if (shortDate) {
      const year = new Date().getFullYear();
      const dateStr = `${shortDate[1].padStart(2, "0")}/${shortDate[2].padStart(2, "0")}/${year}`;
      showtimes = await getShowtimesByDate(dateStr);
    } else if (original.includes("ngày mai") || translatedText.toLowerCase().includes("tomorrow")) {
      const tomorrow = moment().add(1, "day").format("DD/MM/YYYY");
      showtimes = await getShowtimesByDate(tomorrow);
    } else if (dayOnly) {
      const now = moment();
      const day = parseInt(dayOnly[1]);
      const dateStr = `${day.toString().padStart(2, "0")}/${(now.month() + 1).toString().padStart(2, "0")}/${now.year()}`;
      showtimes = await getShowtimesByDate(dateStr);
    } else {
      showtimes = await getTodayShowtimes();
    }

    const reply = await generateBotReply(entities, translatedText, showtimes, message, userId);
    return { original: message, translated: translatedText, entities, reply };
  } catch (err) {
    console.error("Chatbot Error:", err);
    throw new Error("Failed to process message.");
  }
}

module.exports = {
  analyzeUserMessage,
  getShowtimesByDate,
  getTodayShowtimes,
};
