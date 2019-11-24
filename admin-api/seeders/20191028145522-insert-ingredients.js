module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'ingredients',
      [
        {
          title: 'Лосось',
          created_at: new Date(),
          updated_at: new Date(),
          cost_per_kilo: 15000,
        },
        {
          title: 'Рис',
          created_at: new Date(),
          updated_at: new Date(),
          cost_per_kilo: 1000,
        },
        {
          title: 'Филадельфия',
          created_at: new Date(),
          updated_at: new Date(),
          cost_per_kilo: 4000,
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
