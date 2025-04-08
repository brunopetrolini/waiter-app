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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleToggleTableModal() {
    setIsTableModalVisible(!isTableModalVisible);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddItemToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex((cartItem) => cartItem.product._id === product._id);
      if (itemIndex > -1) {
        const newCartItems = [...prevState];
        newCartItems[itemIndex].quantity += 1;
        return newCartItems;
      }
      return [...prevState, { quantity: 1, product }];
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const newCartItems = [...prevState];
      const itemIndex = newCartItems.findIndex((cartItem) => cartItem.product._id === product._id);
      const item = newCartItems[itemIndex];
      if (item.quantity > 1) {
        newCartItems[itemIndex].quantity -= 1;
        return newCartItems;
      }
      newCartItems.splice(itemIndex, 1);
      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />

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
          {selectedTable && (
            <Cart
              items={cartItems}
              onAdd={handleAddItemToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal onSave={handleSaveTable} onClose={handleToggleTableModal} visible={isTableModalVisible} />
    </>
  );
}
