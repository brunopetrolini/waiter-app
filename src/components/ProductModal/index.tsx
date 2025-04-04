import React from 'react';
import { FlatList, Modal } from 'react-native';

import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import {
  CloseButton,
  Footer,
  FooterContainer,
  Header,
  Image,
  Ingredient,
  IngredientsContainer,
  ModalBody,
  PriceContainer,
} from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <Image source={{ uri: product.imagePath }}>
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>

            <FlatList
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Ingredient>
                  <Text style={{ marginBottom: 8 }}>{item.icon}</Text>
                  <Text size={14} color="#666">
                    {item.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>

          <Button onPress={() => {}}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
