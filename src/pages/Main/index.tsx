import { useState } from 'react';

import { Button } from '../../components/Button';
import { Categories } from '../../components/Categories';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { TableModal } from '../../components/TableModal';
import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);

  function handleToggleTableModal() {
    setIsTableModalVisible(!isTableModalVisible);
  }

  function handleSaveTable(table: number) {
    alert(table);
  }

  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          <Button onPress={handleToggleTableModal}>Novo Pedido</Button>
        </FooterContainer>
      </Footer>

      <TableModal onSave={handleSaveTable} onClose={handleToggleTableModal} visible={isTableModalVisible} />
    </>
  );
}
