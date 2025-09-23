export default function GridLayout() {
  return (
    <div id="wd-css-grid-layout">
      <h2>Grid layout</h2>
      
      {/* Row 1: Two halves */}
      <div className="wd-grid-row">
        <div className="wd-grid-col-half-page wd-bg-color-yellow">
          <h3>Left half</h3>
        </div>
        <div className="wd-grid-col-half-page wd-bg-color-blue wd-fg-color-white">
          <h3>Right half</h3>
        </div>
      </div>
      
      {/* Row 2: One third and two thirds */}
      <div className="wd-grid-row">
        <div className="wd-grid-col-third-page wd-bg-color-green wd-fg-color-white">
          <h3>Left third</h3>
        </div>
        <div className="wd-grid-col-two-thirds-page wd-bg-color-red wd-fg-color-white">
          <h3>Right two thirds</h3>
        </div>
      </div>
      
      {/* Row 3: Sidebar - Main - Sidebar */}
      <div className="wd-grid-row">
        <div className="wd-grid-col-left-sidebar wd-bg-color-yellow">
          <h3>Side bar</h3>
          <p>This is the left sidebar</p>
        </div>
        <div className="wd-grid-col-main-content wd-bg-color-blue wd-fg-color-white">
          <h3>Main content</h3>
          <p>This is the main content. This is the main content. This is the main content.</p>
        </div>
        <div className="wd-grid-col-right-sidebar wd-bg-color-green wd-fg-color-white">
          <h3>Side bar</h3>
          <p>This is the right sidebar</p>
        </div>
      </div>
    </div>
  );
}