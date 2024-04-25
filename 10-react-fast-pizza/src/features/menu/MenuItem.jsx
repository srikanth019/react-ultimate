import { formatCurrency, getRandomImage } from "../../utils/helpers";
import PropTypes from "prop-types"

function MenuItem ({ pizza }) {
  const { name, unitPrice, ingredients, soldOut } = pizza;

  return (
    <li>
      <img src={getRandomImage()} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired
  })
}

export default MenuItem;
