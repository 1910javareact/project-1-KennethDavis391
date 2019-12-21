import { IState } from "../../reducers";
import { connect } from "react-redux";
import { NavbarComponent } from "./NavbarComponent";
import { clearState } from '../../action-mappers/navbar-action-mappers';


const mapStateToProps = (state: IState) => {
    return {
        user: state.login.user
    }
}

const mapDispatchToProps = {
    clearState
}

export default connect(mapStateToProps,mapDispatchToProps)(NavbarComponent)