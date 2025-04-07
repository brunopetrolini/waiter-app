import { useState } from 'react';

import { Button } from '../../components/Button';
import { Cart } from '../../components/Cart';
import { Categories } from '../../components/Categories';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { TableModal } from '../../components/TableModal';
import { CartItem } from '../../types/cart-item';
import { Product } from '../../types/product';
import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems] = useState<CartItem[]>([
    // { product: products[0], quantity: 1 },
    // { product: products[1], quantity: 4 },
  ]);

  function handleToggleTableModal() {
    setIsTableModalVisible(!isTableModalVisible);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleCancelOrder() {
    setSelectedTable('');
  }

  function handleAddItemToCart(product: Product) {
    // TODO: adds item to cart
    console.log(product);
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder} />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddItemToCart={handleAddItemToCart} />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && <Button onPress={handleToggleTableModal}>Novo Pedido</Button>}
          {selectedTable && <Cart items={cartItems} />}
        </FooterContainer>
      </Footer>

      <TableModal onSave={handleSaveTable} onClose={handleToggleTableModal} visible={isTableModalVisible} />
    </>
  );
}
