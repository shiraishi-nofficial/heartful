import { Route, Routes } from 'react-router-dom';
import Broadcast from './page/Broadcast';
import Watch from './page/Watch';

const App = () => {
  return (
    <Routes>
      <Route path="/broadcast/:liveId/:passCode" element={<Broadcast />} />
      <Route path="/watch/:liveId/:passCode" element={<Watch />} />
    </Routes>
  );
};

export default App;
