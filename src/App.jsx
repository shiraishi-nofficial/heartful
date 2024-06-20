import { Route, Routes } from 'react-router-dom';
import Broadcast from './page/Broadcast';

const App = () => {
  return (
    <Routes>
      <Route path="/broadcast/:liveId/:passCode" element={<Broadcast />} />
    </Routes>
  );
};

export default App;
