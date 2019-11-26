module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'couriers',
      [
        {
          imei: '1111',
          firstname: 'Тестовое имя #1',
          lastname: 'Тестовая фамилия #1',
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          imei: '2222',
          firstname: 'Тестовое имя #2',
          lastname: 'Тестовая фамилия #2',
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('couriers', [
      {
        imei: '1111',
      },
      {
        imei: '2222',
      },
    ]);
  },
};
