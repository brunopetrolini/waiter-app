import { FlatList } from 'react-native';

import { CartItem } from '../../types/cart-item';
import { Image, Item, ProductActions, ProductContainer } from './styles';

interface CartProps {
  items: CartItem[];
}

export function Cart({ items }: CartProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.product._id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Item>
          <ProductContainer>
            <Image source={{ uri: item.product.imagePath }} />
          </ProductContainer>
          <ProductActions></ProductActions>
        </Item>
      )}
    />
  );
}
