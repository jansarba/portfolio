import { Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface PDFPageProps {
  pageNumber: number;
  height?: number;
  width?: number;
  onRenderSuccess?: () => void;
}

export function PDFPage({ pageNumber, height, width, onRenderSuccess }: PDFPageProps) {
  return (
    <Page
      pageNumber={pageNumber}
      height={height}
      width={width}
      renderAnnotationLayer={true}
      renderTextLayer={false}
      onRenderSuccess={onRenderSuccess}
    />
  );
}
