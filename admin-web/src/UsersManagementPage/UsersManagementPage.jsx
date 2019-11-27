import React, { useState } from 'react';
import { Container, Tabs, Tab } from '@material-ui/core';
import { RolesPage } from './Roles';
import { UsersPage } from './Users/UsersPage';

export const UsersManagementPage = () => {
  const [currentTab, setTab] = useState('roles');

  const tabs = [
    {
      value: 'roles',
      title: 'Управление ролями',
    },
    { value: 'users', title: 'Управление пользователями' },
  ];

  const handleChange = (_, newTab) => {
    setTab(newTab);
  };

  return (
    <Container maxWidth={false}>
      <Tabs value={currentTab} onChange={handleChange}>
        {tabs.map(tab => (
          <Tab key={tab.value} value={tab.value} label={tab.title} />
        ))}
      </Tabs>
      {currentTab === 'roles' && <RolesPage />}
      {currentTab === 'users' && <UsersPage />}
    </Container>
  );
};
