import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Document } from 'react-pdf';
import { PDFPage } from './PDFPage';
import { PDFBloomPage } from './PDFBloomPage';
import { PDFNavigation } from './PDFNavigation';
import { PDF_FILE } from '../config/pdf';

const FADE_OUT_DURATION = 80;

interface PDFViewerProps {
  onPageChange: (page: number) => void;
}

export function PDFViewer({ onPageChange }: PDFViewerProps) {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight - 80);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const [pageOpacity, setPageOpacity] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRenderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const PORTRAIT_RATIO = 1.414;
  const availableWidth = containerWidth - 24;
  const isWidthBound = availableWidth * PORTRAIT_RATIO < containerHeight;
  const pageDimension = isWidthBound
    ? { width: availableWidth }
    : { height: containerHeight };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      setContainerHeight(entries[0].contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimer.current !== null) clearTimeout(transitionTimer.current);
      if (firstRenderTimer.current !== null) clearTimeout(firstRenderTimer.current);
    };
  }, []);

  const handleLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
  }, []);

  const handleRenderSuccess = useCallback(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      firstRenderTimer.current = setTimeout(() => {
        setLoaded(true);
        setPageOpacity(1);
      }, 1000);
    } else {
      setPageOpacity(1);
    }
  }, []);

  const goTo = useCallback((page: number) => {
    if (transitionTimer.current !== null) {
      clearTimeout(transitionTimer.current);
    }
    setPageOpacity(0);
    transitionTimer.current = setTimeout(() => {
      setCurrentPage(page);
      onPageChange(page);
    }, FADE_OUT_DURATION);
  }, [onPageChange]);

  const goToPrev = useCallback(() => {
    if (currentPage <= 1) return;
    goTo(currentPage - 1);
  }, [currentPage, goTo]);

  const goToNext = useCallback(() => {
    if (currentPage >= totalPages) return;
    goTo(currentPage + 1);
  }, [currentPage, totalPages, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goToPrev, goToNext]);

  const bloomPortal = document.getElementById('pdf-bloom-portal');

  return (
    <>
      {bloomPortal && createPortal(
        <div style={{ opacity: pageOpacity, transition: 'opacity 0.1s ease' }} aria-hidden="true">
          <Document file={PDF_FILE}>
            <PDFBloomPage pageNumber={currentPage} {...pageDimension} />
          </Document>
        </div>,
        bloomPortal
      )}
      <div className="pdf-viewer">
        <div className="pdf-document-container" ref={containerRef}>
          <div className="pdf-document-wrapper" style={{ opacity: pageOpacity, transition: 'opacity 0.1s ease' }}>
            <Document file={PDF_FILE} onLoadSuccess={handleLoadSuccess}>
              <PDFPage
                pageNumber={currentPage}
                {...pageDimension}
                onRenderSuccess={handleRenderSuccess}
              />
            </Document>
          </div>
          <div className="pdf-load-cover" style={{ opacity: loaded ? 0 : 1 }} />
        </div>
        <PDFNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={goToPrev}
          onNext={goToNext}
          loaded={loaded}
        />
      </div>
    </>
  );
}
