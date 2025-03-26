import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  padding-top: ${isAndroid ? StatusBar.currentHeight : 0}px;
`;
