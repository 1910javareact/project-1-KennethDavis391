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

interface INavBarComponentProps{
    changeUserId: (userId: number) => void
    userId: number
}

interface INavBarComponentState{
    isOpen:boolean,
    userIdSearch:number,
}

export class NavbarComponent extends React.Component<INavBarComponentProps, INavBarComponentState>{

    constructor(props:any){
        super(props)
        this.state={
            isOpen: false,
            userIdSearch: 0,
        }
    }

    async componentDidMount() {
        this.props.changeUserId(this.props.userId)
    }

    toggle = () => {
        this.setState({
            ...this.state,
            isOpen:!this.state.isOpen
        })
    };

    updateUserIdSearch = (input: any) => {
        this.setState({
            ...this.state,
            userIdSearch: input.target.value
        })
    }

    submitUserIdSearch = (e: SyntheticEvent) => {
        e.preventDefault()        
        this.props.changeUserId(this.state.userIdSearch)
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
                            <Form onSubmit={this.submitUserIdSearch}>
                                <FormGroup>
                                    <Input type="text" name="text" id="search-users-nav" placeholder="Search by User Id" value={this.state.userIdSearch} onChange={this.updateUserIdSearch}/>
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
            </div >
        )
    }
}
