'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('News', [
      {
        category: 'general',
        movie_id: null,
        title: 'New Movie Releases for 2025',
        content: 'Check out the latest movies releasing in 2025, including exciting sequels and new stories.',
        published_at: new Date(),
        image_url: 'https://example.com/news/new_releases_2025.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'specific',
        movie_id: 1,
        title: 'Behind the Scenes of Avengers: Endgame',
        content: 'An exclusive look at the making of Avengers: Endgame, featuring interviews with the cast and crew.',
        published_at: new Date(),
        image_url: 'https://example.com/news/avengers_behind_scenes.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'general',
        movie_id: null,
        title: 'Upcoming Film Festivals in 2025',
        content: 'Get ready for the upcoming film festivals in 2025, showcasing independent films and new talent.',
        published_at: new Date(),
        image_url: 'https://example.com/news/film_festivals_2025.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'specific',
        movie_id: 2,
        title: 'Inception: A Masterpiece of Modern Cinema',
        content: 'Exploring the themes and cinematography of Christopher Nolan’s Inception, a film that changed the landscape of sci-fi.',
        published_at: new Date(),
        image_url: 'https://example.com/news/inception_masterpiece.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('News', null, {});
  },
};
