import { useState } from 'react';
import { FlatList } from 'react-native';

import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/format-currency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { AddToCartButton, ProductContainer, ProductDetails, ProductImage, Separator } from './styles';

interface MenuProps {
  onAddItemToCart: (product: Product) => void;
  items: Product[];
}

export function Menu({ onAddItemToCart, items }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        product={selectedProduct}
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
        onAddToCart={onAddItemToCart}
      />

      <FlatList
        data={items}
        keyExtractor={(product) => product._id}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
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

            <AddToCartButton onPress={() => onAddItemToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}
