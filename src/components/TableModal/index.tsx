import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Input, ModalBody, ModalForm, ModalHeader, Overlay } from './styles';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: number) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState(0);

  return (
    <Modal statusBarTranslucent transparent visible={visible} animationType="fade">
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <ModalHeader>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </ModalHeader>

          <ModalForm>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
              value={table}
            />
            <Button onPress={() => onSave(table)} disabled={!table}>
              Salvar
            </Button>
          </ModalForm>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
