import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { decreaseQuantity, increaseQuantity } from "./CartSlice"

function UpdateQuantity ({ pizzaId }) {
    const dispatch = useDispatch()
    const quantity = useSelector((store) => store.cart.cart.find((item) => item.pizzaId === pizzaId).quantity)

    function handleIncreaseQty () {
        dispatch(increaseQuantity(pizzaId))
    }

    function handleDecreaseQty () {
        dispatch(decreaseQuantity(pizzaId))
    }

    return (
        <div className="flex gap-1 items-center md:gap-3">
            <Button type="round" onClick={handleDecreaseQty} disabled={quantity === 1}>-</Button>
            <span>{quantity}</span>
            <Button type="round" onClick={handleIncreaseQty}>+</Button>
        </div>
    )
}

export default UpdateQuantity
