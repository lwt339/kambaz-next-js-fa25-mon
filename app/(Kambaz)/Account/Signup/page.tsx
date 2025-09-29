import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Signup() {
    return (
        <div id="wd-signup-screen" className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <h1 className="mb-4">Sign up</h1>

                    <Form>
                        <div className="mb-3">
                            <Form.Control
                                id="wd-username"
                                type="text"
                                placeholder="username"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Control
                                id="wd-password"
                                type="password"
                                placeholder="password"
                                className="form-control"
                            />
                        </div>


                        <Link
                            id="wd-signup-btn"
                            href="/Account/Profile"
                            className="btn btn-primary w-100 mb-3"
                        >
                            Sign up
                        </Link>

                        <div>
                            <Link
                                id="wd-signin-link"
                                href="/Account/Signin"
                            >
                                Sign in
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}