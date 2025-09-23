import { Nav, NavItem, NavLink, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function BootstrapNavigation() {
  return (
    <>
      {/* NAV 1: Tabs - REQUIRED */}
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <Nav variant="tabs">
          <NavItem>
            <NavLink href="#/Labs/Lab2/Active">Active</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link1">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link2" disabled>Disabled</NavLink>
          </NavItem>
        </Nav>
      </div>
      
      {/* NAV 2: Pills - REQUIRED */}
      <div id="wd-css-navigating-with-pills" className="mt-3">
        <h2>Pills</h2>
        <Nav variant="pills">
          <NavItem>
            <NavLink active href="#/Labs/Lab2/Active">Active</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link1">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link2" disabled>Disabled</NavLink>
          </NavItem>
        </Nav>
      </div>
      
      {/* NAV 3: Cards - REQUIRED */}
      <div id="wd-css-navigating-with-cards" className="mt-4">
        <h2>Cards</h2>
        <Card style={{ width: "18rem" }}>
          <CardImg variant="top" src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
          <CardBody>
            <CardTitle>Stacking Starship</CardTitle>
            <CardText>
              Stacking the most powerful rocket in history. Mars or bust!
            </CardText>
            <Button variant="primary">Boldly Go</Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}