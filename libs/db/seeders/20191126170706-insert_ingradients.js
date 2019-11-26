module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'ingredients',
      [
        {
          title: 'Лосось',
          cost_per_kilo: 15000,
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Рис',
          cost_per_kilo: 800,
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Филадельфия',
          cost_per_kilo: 3000,
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('ingredients', [
      {
        title: 'Лосось',
      },
      {
        title: 'Рис',
      },
      {
        title: 'Филадельфия',
      },
    ]);
  },
};
