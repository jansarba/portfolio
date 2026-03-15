import { useState } from 'react';
import './config/pdf';
import { PDFViewer } from './components/PDFViewer';
import { usePageBackground } from './hooks/usePageBackground';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { background, foreground } = usePageBackground(currentPage);

  return (
    <div
      className="app"
      style={{ backgroundColor: background, color: foreground }}
    >
      <div id="pdf-bloom-portal" className="pdf-bloom-portal" />
      <div className="pdf-background-blur" />
      <PDFViewer onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;
