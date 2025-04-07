import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { CartItem } from '../../types/cart-item';
import { formatCurrency } from '../../utils/format-currency';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { Image, Item, ProductActions, ProductContainer, ProductDetails, QuantityContainer } from './styles';

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

            <QuantityContainer>
              <Text size={14} color="#666">
                {item.quantity}x
              </Text>
            </QuantityContainer>

            <ProductDetails>
              <Text size={14} weight="600">
                {item.product.name}
              </Text>
              <Text size={14} color="#666" style={{ marginTop: 4 }}>
                {formatCurrency(item.product.price)}
              </Text>
            </ProductDetails>
          </ProductContainer>

          <ProductActions>
            <TouchableOpacity>
              <PlusCircle />
            </TouchableOpacity>

            <TouchableOpacity>
              <MinusCircle />
            </TouchableOpacity>
          </ProductActions>
        </Item>
      )}
    />
  );
}
