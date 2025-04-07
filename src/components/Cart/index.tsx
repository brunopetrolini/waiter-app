import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { CartItem } from '../../types/cart-item';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
  Image,
  Item,
  ProductActions,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';

interface CartProps {
  items: CartItem[];
}

export function Cart({ items }: CartProps) {
  return (
    <>
      {items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 200 }}
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
      )}

      <Summary>
        <TotalContainer>
          {items.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(120)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button disabled={items.length === 0} onPress={() => {}}>
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
