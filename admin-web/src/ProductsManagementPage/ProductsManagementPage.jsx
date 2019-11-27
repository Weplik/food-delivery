import React, { useState } from 'react';
import { Container, Tabs, Tab } from '@material-ui/core';
import { IngredientsPage} from "./Ingredients";

export const ProductsManagementPage = () => {
  const [currentTab, setTab] = useState('ingredients');

  const tabs = [
    {
      value: 'ingredients',
      title: 'Управление ингредиентами',
    },
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
      {currentTab === 'ingredients' && <IngredientsPage />}
    </Container>
  );
};
