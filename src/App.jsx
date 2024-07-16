import { Route, Routes } from 'react-router-dom';
import Broadcast from './page/Broadcast';
import Watch from './page/Watch';
import NotFound from './page/NotFound';
import Monitor from './page/mng/Monitor';
import Ended from './page/Ended';

const App = () => {
  return (
    <Routes>
      <Route path="/broadcast/:liveId" element={<Broadcast />} />
      <Route path="/watch/:liveId" element={<Watch />} />
      <Route path='/mng/monitor/:liveId' element={<Monitor />} />
      <Route path='/ended' element={<Ended />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
