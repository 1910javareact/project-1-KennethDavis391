import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export const NavbarComponent = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Dunder Mifflen</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Reimbursements
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Pending Reimbursements
                                </DropdownItem>
                                <DropdownItem>
                                    approved Reimbursements
                                </DropdownItem>
                                <DropdownItem>
                                    denied Reimbursements
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Make New Riembursement Request
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="text" id="search-users-nav" placeholder="Search by User Id" />
                            </FormGroup>
                        </Form>
                    </Nav>
                    <NavbarText>
                        <Nav>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                            </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to='/login'>Logout</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}
