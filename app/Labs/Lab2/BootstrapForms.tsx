import { Form, FormGroup, FormLabel, FormControl, FormSelect, Col, Row, Button } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <>
      {/* FORM 1: Basic Forms - REQUIRED */}
      <div id="wd-css-styling-forms">
        <h2>Forms</h2>
        <FormGroup className="mb-3" controlId="wd-email">
          <FormLabel>Email address</FormLabel>
          <FormControl type="email" placeholder="name@example.com" />
        </FormGroup>
        <FormGroup className="mb-3" controlId="wd-textarea">
          <FormLabel>Example textarea</FormLabel>
          <FormControl as="textarea" rows={3} />
        </FormGroup>
      </div>
      
      {/* FORM 2: Dropdowns - REQUIRED */}
      <div id="wd-css-styling-dropdowns">
        <h3>Dropdowns</h3>
        <FormSelect>
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect>
      </div>
      
      {/* FORM 3: Switches - REQUIRED */}
      <div id="wd-css-styling-switches" className="mt-3">
        <h3>Switches</h3>
        <Form.Check type="switch" label="Unchecked switch checkbox input"/>
        <Form.Check type="switch" checked label="Checked switch checkbox input" readOnly/>
        <Form.Check type="switch" label="Unchecked disabled switch checkbox input" disabled/>
        <Form.Check type="switch" checked label="Checked disabled switch checkbox input" disabled readOnly/>
      </div>
      
      {/* FORM 4: Sliders - REQUIRED */}
      <div id="wd-css-styling-sliders" className="mt-3">
        <h3>Sliders</h3>
        <FormLabel>Example Range</FormLabel>
        <Form.Range />
      </div>
      
      {/* FORM 5: Responsive Forms 1 - REQUIRED */}
      <div id="wd-css-responsive-forms-1" className="mt-4">
        <h3>Responsive forms</h3>
        <Form.Group as={Row} className="mb-3" controlId="email1">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="email" defaultValue="email@example.com" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="password1">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control type="password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Form.Label column sm={2}>Bio</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" style={{height: "100px"}}/>
          </Col>
        </Form.Group>
      </div>
      
      {/* FORM 6: Responsive Forms 2 - REQUIRED */}
      <div id="wd-css-responsive-forms-2" className="mt-4">
        <h3>Responsive forms</h3>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Email</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Password</Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>Radios</Form.Label>
              <Col sm={10}>
                <Form.Check type="radio" label="first radio" name="formHorizontalRadios" defaultChecked/>
                <Form.Check type="radio" label="second radio" name="formHorizontalRadios"/>
                <Form.Check type="radio" label="third radio" name="formHorizontalRadios"/>
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}