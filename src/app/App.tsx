import { Route, Routes } from 'react-router-dom';

import '@styles/theme.css';
import '@styles/typography.css';
import '@styles/globals.css';
import Page from '@views/page';
import Template from '@views/template';

const App = (): React.ReactNode => (
  <Template>
    <Routes>
      <Route path="*" element={<Page />} />
    </Routes>
  </Template>
);

export default App;
