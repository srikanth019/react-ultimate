import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem"

function Menu () {
  const menu = useLoaderData()

  console.log(menu);

  return <ul>
    {menu.map((pizza) => (<MenuItem key={pizza.id} pizza={pizza} />))}
  </ul>;
}


// eslint-disable-next-line react-refresh/only-export-components
export function loader () {

  const menu = getMenu()
  return menu
}

export default Menu;
