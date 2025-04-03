import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { Main } from './pages/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'GeneralSans-400': require('./assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./assets/fonts/GeneralSans-Bold.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="auto" animated translucent />
      <Main />
    </>
  );
}
