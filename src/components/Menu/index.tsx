import React from 'react';
import { FlatList } from 'react-native';

import { products } from '../../../mocks/products';
import { formatCurrency } from '../../utils/format-currency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { AddToCartButton, Product, ProductDetails, ProductImage, Separator } from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product._id}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <Product>
          <ProductImage source={{ uri: product.imagePath }} />
          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text size={14} color="#666" style={{ marginVertical: 8 }}>
              {product.description}
            </Text>

            <Text size={14} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    />
  );
}
