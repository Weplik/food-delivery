module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          firstname: 'Тестовое имя',
          lastname: 'Тестовая фамилия',
          phone_number: '+7-771-194-52-71',
          created_at: new Date(),
          updated_at: new Date(),
          password:
            '$2b$08$xU6DmiAYAXwdLM0m.6fWY.AxnJa0ROuyW4nmFzDY1TEfeOmPUtRfG',
          email: 'test.test@gmail.com',
        },
      ],
      {}
    );
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('clients', [
      {
        email: 'test.test@gmail.com',
      },
    ]);
  },
};
