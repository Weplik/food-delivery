module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'clients_addresses',
      [
        {
          street: 'ул. Тестовая',
          house: 1,
          floor: 4,
          flat: 40,
          created_at: new Date(),
          updated_at: new Date(),
          is_private_house: true,
          is_enabled: true,
          client_id: 1,
        },
      ],
      {}
    );
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('clients_addresses', [
      {
        id: 1,
      },
    ]);
  },
};
