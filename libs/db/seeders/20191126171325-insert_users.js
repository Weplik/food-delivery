module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          username: 't.user',
          firstname: 'Тестовое имя',
          lastname: 'Тестовая фамилия',
          phone_number: '+7-771-194-52-71',
          enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
          password:
            '$2b$08$xU6DmiAYAXwdLM0m.6fWY.AxnJa0ROuyW4nmFzDY1TEfeOmPUtRfG',
          role_id: 1,
        },
      ],
      {}
    );
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', [
      {
        username: 't.user',
      },
    ]);
  },
};
