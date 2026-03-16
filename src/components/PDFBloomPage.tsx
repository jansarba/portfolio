import { Page } from 'react-pdf';

interface PDFBloomPageProps {
  pageNumber: number;
  height?: number;
  width?: number;
}

export function PDFBloomPage({ pageNumber, height, width }: PDFBloomPageProps) {
  return (
    <div className="pdf-page-bloom">
      <Page
        pageNumber={pageNumber}
        height={height}
        width={width}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </div>
  );
}
