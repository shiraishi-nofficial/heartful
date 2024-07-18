import { Route, Routes } from 'react-router-dom';
import Broadcast from './page/Broadcast';
import Watch from './page/Watch';
import NotFound from './page/NotFound';
import Monitor from './page/mng/Monitor';
import Ended from './page/Ended';
import Result from './page/mng/Result';
import ChatTemplate from './page/mng/ChatTemplate';

const App = () => {
  return (
    <Routes>
      <Route path="/broadcast/:liveId" element={<Broadcast />} />
      <Route path="/watch/:liveId" element={<Watch />} />
      <Route path='/mng/monitor/:liveId' element={<Monitor />} />
      <Route path='/mng/result' element={<Result />} />
      <Route path='/mng/chat-template' element={<ChatTemplate />} />
      <Route path='/ended' element={<Ended />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
