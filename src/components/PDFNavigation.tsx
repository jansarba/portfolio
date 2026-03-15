interface PDFNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  loaded: boolean;
}

export function PDFNavigation({ currentPage, totalPages, onPrev, onNext, loaded }: PDFNavigationProps) {
  return (
    <div className={`pdf-navigation${loaded ? ' is-loaded' : ''}`}>
      <button
        className="pdf-nav-btn"
        onClick={onPrev}
        disabled={currentPage <= 1}
      >
        ←
      </button>
      <span className="pdf-nav-counter">{currentPage} / {totalPages}</span>
      <button
        className="pdf-nav-btn"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        →
      </button>
    </div>
  );
}
