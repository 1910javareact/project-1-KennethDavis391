import { IState } from "../../reducers";
import { connect } from "react-redux";
import { NavbarComponent } from "./NavbarComponent";
import { changeUserId } from '../../action-mappers/navbar-action-mappers';


const mapStateToProps = (state: IState) => {
    return {
        userId: state.login.user.userId,
    }
}

const mapDispatchToProps = {
    changeUserId
}

export default connect(mapStateToProps,mapDispatchToProps)(NavbarComponent)