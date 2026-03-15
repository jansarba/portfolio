import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PDF_FILE =
  `${import.meta.env.BASE_URL}Portfolio_JanSarba_Fullsize.pdf`;