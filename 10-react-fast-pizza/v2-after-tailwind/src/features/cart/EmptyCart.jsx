import LinkButton from '../../ui/LinkButton';

function EmptyCart () {
  return (
    <div className='py-5'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className='font-bold mt-4'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
