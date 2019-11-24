module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      accessRights: {
        type: DataTypes.JSON,
      },
    },
    {
      tableName: 'roles',
      underscored: true,
    }
  );

  Role.associate = function(models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      sourceKey: 'id',
      as: 'role',
    });
  };

  return Role;
};
