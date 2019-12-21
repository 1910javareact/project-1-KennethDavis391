import React, { SyntheticEvent } from 'react';
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

interface INavBarComponentProps {
    changeUserId: (userId: number) => void
    userId: number
}

interface INavBarComponentState {
    isOpen: boolean,
    userIdSearch: number,
    idChanged: boolean
}

export class NavbarComponent extends React.Component<any, INavBarComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            isOpen: false,
            userIdSearch: 0,
            idChanged: false,
        }
    }

    async componentDidMount() {
        this.props.changeUserId(this.props.userId)
    }

    toggle = () => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        })
    };

    updateUserIdSearch = (input: any) => {
        this.setState({
            ...this.state,
            userIdSearch: input.target.value
        })
    }

    submitUserIdSearch = async (e: SyntheticEvent) => {
        e.preventDefault()
        await this.props.changeUserId(this.state.userIdSearch)
        this.setState({
            ...this.state,
            idChanged: true,
            userIdSearch: 0
        })
    }

    componentDidUpdate() {
        if (this.state.idChanged) {
            this.props.rerender()
            this.setState({
                ...this.state,
                idChanged: false
            })
        }
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Dunder Mifflen</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
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
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Users
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        All Users
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Search User By Id
                                    </DropdownItem>
                                    <Form onSubmit={this.submitUserIdSearch}>
                                        <FormGroup>
                                            <Input type="text" name="text" id="search-users-nav" placeholder="Search by User Id" value={this.state.userIdSearch} onChange={this.updateUserIdSearch} />
                                        </FormGroup>
                                    </Form>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                        <NavbarText>
                            <Nav>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Options
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <Link to='/login'>
                                            <DropdownItem>
                                                Logout
                                            </DropdownItem>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}
