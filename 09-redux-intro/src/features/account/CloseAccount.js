import { useDispatch, useSelector } from "react-redux"
import { closeAccount } from "../customer/CustomerSlice"

function CloseAccount () {
    const dispatch = useDispatch()
    const { balance } = useSelector((store) => store.account)

    function handleCloseAccount () {
        if (balance > 0) {
            alert("You can't close your account with non zero balance")
            return
        }
        dispatch(closeAccount())
    }

    return (
        <div>
            <button className="close" onClick={handleCloseAccount}>Close Account</button>
        </div>
    )
}

export default CloseAccount
