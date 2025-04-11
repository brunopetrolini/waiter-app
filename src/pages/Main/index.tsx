import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Button } from '../../components/Button';
import { Cart } from '../../components/Cart';
import { Categories } from '../../components/Categories';
import { Header } from '../../components/Header';
import { Empty } from '../../components/Icons/Empty';
import { Menu } from '../../components/Menu';
import { TableModal } from '../../components/TableModal';
import { Text } from '../../components/Text';
import { CartItem } from '../../types/cart-item';
import { Category } from '../../types/category';
import { Product } from '../../types/product';
import { api } from '../../utils/api';
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const categoriesPromise = api.get<Category[]>('/categories');
        const productsPromise = api.get<Product[]>('/products');

        const [categoriesResponse, productsResponse] = await Promise.all([categoriesPromise, productsPromise]);

        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais.', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = categoryId ? `/categories/${categoryId}/products` : '/products';
    try {
      setIsProductsLoading(true);
      const response = await api.get<Product[]>(route);
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos da categoria.', error);
    } finally {
      setIsProductsLoading(false);
    }
  }

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

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories categories={categories} onCategorySelect={handleSelectCategory} />
            </CategoriesContainer>

            {isProductsLoading ? (
              <CenteredContainer>
                <ActivityIndicator size="large" color="#D73035" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddItemToCart={handleAddItemToCart} items={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator size="large" color="#D73035" />
            <Text color="#666">Aguarde um momento...</Text>
          </CenteredContainer>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={handleToggleTableModal} disabled={isLoading}>
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              items={cartItems}
              selectedTable={selectedTable}
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
