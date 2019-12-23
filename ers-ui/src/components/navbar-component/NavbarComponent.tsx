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
import { Link, Redirect } from 'react-router-dom';

// interface INavBarComponentProps {
//     changeUserId: (userId: number) => void
//     userId: number
// }

interface INavBarComponentState {
    isOpen: boolean,
    userIdSearch: number,
    submitted: boolean,
}

export class NavbarComponent extends React.Component<any, INavBarComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            isOpen: false,
            userIdSearch: 0,
            submitted: false
        }
    }



    // async componentDidMount() {
    //     this.props.changeUserId(this.props.userId)
    //     console.log(this.state.userId)
    //     console.log(this.props.match.params.userid)
    // }

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

    submitUserIdSearch = (e: SyntheticEvent) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            submitted: true
        })
    }

    redirect = () => {
        return (<Redirect to={'/users/userid/' + this.state.userIdSearch} />)
    }

    componentDidUpdate() {
        if (this.props.updateUserId) {
            if (this.state.submitted) {
                this.setState({
                    ...this.state,
                    submitted: false
                })
                this.props.updateUserId()
            }
        }else{

        }

    }

    returnHome = () =>{
        this.setState({
            ...this.state,
            userIdSearch: this.props.user.userId,
            submitted: true
        })
    }

    changeStatus = () =>{
        if(this.props.updateStatus){
            this.props.updateStatus()
        }
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link to={'/users/userid/' + this.props.user.userId} onClick={this.returnHome}><NavbarBrand>Dunder Mifflen</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Reimbursements
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <Link to='/reimbursements/status/1'>
                                        <DropdownItem onClick={this.changeStatus}>
                                            Pending Reimbursements
                                        </DropdownItem>
                                    </Link>
                                    <Link to='/reimbursements/status/2'>
                                        <DropdownItem onClick={this.changeStatus}>
                                            Approved Reimbursements
                                        </DropdownItem>
                                    </Link>
                                    <Link to='/reimbursements/status/3'>
                                        <DropdownItem onClick={this.changeStatus}>
                                            Denied Reimbursements
                                        </DropdownItem>
                                    </Link>
                                    <DropdownItem divider />
                                    <Link to='/reimbursements/submit'>
                                        <DropdownItem>
                                            Make New Riembursement Request
                                        </DropdownItem>
                                    </Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Users
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <Link to='/users'>
                                        <DropdownItem>
                                            All Users
                                        </DropdownItem>
                                    </Link>
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
                                        <Link to='/login' onClick={this.props.clearState}>
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
                {this.state.submitted && this.redirect()}
            </div >
        )
    }
}
