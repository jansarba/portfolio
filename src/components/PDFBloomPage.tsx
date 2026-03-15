import { Page } from 'react-pdf';

interface PDFBloomPageProps {
  pageNumber: number;
  height: number;
}

export function PDFBloomPage({ pageNumber, height }: PDFBloomPageProps) {
  return (
    <div className="pdf-page-bloom">
      <Page
        pageNumber={pageNumber}
        height={height}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </div>
  );
}
