import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  padding-top: ${isAndroid ? StatusBar.currentHeight : 0}px;
  flex: 1;
  background: #fafafa;
`;

export const CategoriesContainer = styled.View`
  height: 72px;
  margin-top: 34px;
  border: 1px solid red;
`;

export const MenuContainer = styled.View`
  flex: 1;
  border: 1px solid blue;
`;

export const Footer = styled.View`
  min-height: 110px;
  border: 1px solid green;
  background: #fff;
`;

export const FooterContainer = styled.SafeAreaView``;
