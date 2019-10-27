module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          title: 'Администратор',
          created_at: new Date(),
          updated_at: new Date(),
          access_rights: [],
        },
        {
          title: 'Оператор по приему заказов',
          created_at: new Date(),
          updated_at: new Date(),
          access_rights: [],
        },
      ],
      {}
    );
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('roles', [
      {
        title: 'Администратор',
      },
      {
        title: 'Оператор по приему заказов',
      },
    ]);
  },
};
