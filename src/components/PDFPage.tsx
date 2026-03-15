import { Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface PDFPageProps {
  pageNumber: number;
  height: number;
  onRenderSuccess?: () => void;
}

export function PDFPage({ pageNumber, height, onRenderSuccess }: PDFPageProps) {
  return (
    <Page
      pageNumber={pageNumber}
      height={height}
      renderAnnotationLayer={true}
      renderTextLayer={false}
      onRenderSuccess={onRenderSuccess}
    />
  );
}
