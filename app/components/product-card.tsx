import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Product, useBearStore } from '~/lib/store';
import { cn } from '~/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product: { name, price, image, description, color, brand, id },
}: ProductCardProps) {
  const cart = useBearStore((state) => state.cart);
  const addProductToCart = useBearStore((state) => state.addProductToCart);
  const setCartOpen = useBearStore((state) => state.setCartOpen);

  const inCart = cart.some((c) => c.product_id === id);

  return (
    <Card className="w-full max-w-sm p-6 grid gap-6">
      <img
        alt={name}
        className="aspect-square rounded-lg overflow-hidden object-cover border dark:border-gray-800 w-full"
        src={image}
      />
      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm leading-loose md:text-base">{description}</p>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center gap-2 text-2xl font-bold">
          Rs. {price}
        </div>
        <p className="text-sm leading-loose md:text-base">
          <span className="font-semibold">Color: </span>
          {color}
        </p>
        <p className="text-sm leading-loose md:text-base">
          <span className="font-semibold">Brand: </span>
          {brand}
        </p>
      </div>
      <Button
        variant={inCart ? 'secondary' : 'default'}
        className={cn({
          'border-2': inCart,
        })}
        onClick={inCart ? () => setCartOpen(true) : () => addProductToCart(id)}>
        {inCart ? 'Go to Cart' : 'Add to Cart'}
      </Button>
    </Card>
  );
}
