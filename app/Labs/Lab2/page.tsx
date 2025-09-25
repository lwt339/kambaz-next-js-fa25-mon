"use client";
import "./index.css";
import { Container } from "react-bootstrap";

// Import all CSS components
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";

// Import React Icons component
import ReactIconsSampler from "./ReactIcons";

// Import Bootstrap components
import BootstrapGrids from "./BootstrapGrids";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

// Import screen size label
import ScreenSizeLabel from "./ScreenSizeLabel";

export default function Lab2() {
    return (
        <Container>
            {/* Screen Size Indicator - REQUIRED for responsive testing */}
            <ScreenSizeLabel />

            <h2>Lab 2 1- Cascading Style Sheets</h2>

            {/* SECTION 1: Inline Styles */}
            <h3>Styling with the STYLE attribute</h3>
            <p style={{ backgroundColor: "yellow", color: "red" }}>
                Style attribute allows configuring look and feel
                right on the element. Although it&apos;s very convenient
                it is considered bad practice and you should avoid
                using the style attribute

            </p>

            {/* SECTION 2: ID Selectors*/}
            <div id="wd-css-id-selectors">
                <h3>ID selectors</h3>
                <p id="wd-id-selector-1">
                    Instead of changing the look and feel of all the
                    elements of the same name, e.g., P, we can refer to a specific element by its ID
                </p>
                <p id="wd-id-selector-2">
                    Here&apos;s another paragraph using a different ID and a different
                    look and feel
                </p>
            </div>

            {/* SECTION 3: Class Selectors */}
            <div id="wd-css-class-selectors">
                <h3>Class selectors</h3>
                <p className="wd-class-selector">
                    Instead of using IDs to refer to elements, you can use an element&apos;s CLASS attribute
                </p>
                <h4 className="wd-class-selector">
                    This heading has same style as paragraph above
                </h4>
            </div>

            {/* SECTION 4: Document Structure Selectors */}
            <div id="wd-css-document-structure">
                <div className="wd-selector-1">
                    <h3>Document structure selectors</h3>
                    <div className="wd-selector-2">
                        Selectors can be combined to refer elements in particular
                        places in the document
                        <p className="wd-selector-3">
                            This paragraph&apos;s red background is referenced as
                            <br />
                            .selector-2 .selector3<br />
                            meaning the descendant of some ancestor.<br />
                            <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span><br />
                            You can combine these relationships to create specific
                            styles depending on the document structure
                        </p>
                    </div>
                </div>
            </div>

            {/* Import all CSS example components */}
            <ForegroundColors />
            <BackgroundColors />
            <Borders />
            <Padding />
            <Margins />
            <Corners />
            <Dimensions />
            <Positions />
            <Zindex />
            <Float />
            <GridLayout />
            <Flex />
            <ReactIconsSampler />

            {/* Bootstrap Section - ALL REQUIRED */}
            <h2>Bootstrap</h2>
            <BootstrapGrids />
            <BootstrapTables />
            <BootstrapLists />
            <BootstrapForms />
            <BootstrapNavigation />
        </Container>
    );
}
