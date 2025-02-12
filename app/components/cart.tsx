import { RefreshCw, ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { supabase } from '~/lib/supabase';
import { Card } from './ui/card';
import { useBearStore } from '~/lib/store';
import { toast } from 'sonner';
import { useEffect, useState, type FC } from 'react';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogContent, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';

export function CartSheet() {
  const cart = useBearStore((state) => state.cart);
  const setCartOpen = useBearStore((state) => state.setCartOpen);
  const cartOpen = useBearStore((state) => state.cartOpen);
  const fetchCart = useBearStore((state) => state.fetchCart);

  useEffect(() => {
    if (cartOpen) fetchCart();
  }, [fetchCart, cartOpen]);

  const handleIncrement = async (id: number, q: number) => {
    const { error } = await supabase
      .from('cart')
      .update({ quantity: q + 1 })
      .eq('id', id);

    if (error) {
      toast.error('Failed to increment quantity');
      return;
    }

    fetchCart();
  };

  const handleDecrement = async (id: number, q: number) => {
    if (q === 1) {
      const { error } = await supabase.from('cart').delete().eq('id', id);

      if (error) {
        toast.error('Failed to remove product from cart');
        return;
      }

      fetchCart();
      return;
    }

    const { error } = await supabase
      .from('cart')
      .update({ quantity: q - 1 })
      .eq('id', id);

    if (error) {
      toast.error('Failed to decrement quantity');
      return;
    }

    fetchCart();
  };

  const emptyCart = cart.length === 0;
  const total = cart
    .map(({ product, quantity }) => product.price * quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger>
        <ShoppingCart />
      </SheetTrigger>
      <SheetContent className="flex flex-col w-[700px]">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-2xl border-b pb-2 flex items-center gap-1 justify-between">
            <div>
              Cart <span className="text-lg">({cart.length})</span>
            </div>
            <Button
              onClick={fetchCart}
              variant="outline"
              className="flex items-center justify-center px-2 py-1">
              Refresh
            </Button>
          </SheetTitle>
          {emptyCart && (
            <SheetDescription>
              Your cart is empty. Add some products to continue.
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="overflow-scroll flex-1">
          {cart.map(({ id, quantity, product }) => (
            <Card key={id} className="flex gap-4 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover rounded aspect-square w-[35%]"
              />
              <div className="flex flex-col justify-between w-full gap-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-lg">Rs. {product.price * quantity}</p>
                <div className="flex justify-center items-center">
                  <Button
                    onClick={() => handleDecrement(id, quantity)}
                    className="flex items-center justify-center w-full">
                    -
                  </Button>
                  <Button disabled variant="ghost" className="w-full">
                    {quantity}
                  </Button>
                  <Button
                    disabled={quantity === 10}
                    onClick={() => handleIncrement(id, quantity)}
                    className="flex items-center justify-center w-full">
                    +
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-between items-center w-full border-t pt-4">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
        <Checkout>
          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={emptyCart}>
            Checkout
          </Button>
        </Checkout>
      </SheetContent>
    </Sheet>
  );
}

const Checkout = ({ children }: { children: React.ReactNode }) => {
  const cart = useBearStore((state) => state.cart);

  const [open, setOpen] = useState(false);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const zip = formData.get('zip') as string;
    const state = formData.get('state') as string;
    const city = formData.get('city') as string;

    const orders = cart.map(({ product, quantity }) => ({
      product_id: product.id,
      quantity,
      name,
      contact: phone,
      address,
      zipcode: zip,
      state,
      city,
    }));

    const { error } = await supabase.from('order').insert(orders);

    if (error) {
      toast.error('Failed to place order');
      return;
    }

    toast.success('Order placed successfully for all products');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-4 p-8">
        <DialogTitle>Checkout</DialogTitle>
        <p className="text-lg">
          Please enter your details to complete the purchase.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleCheckout}>
          <Input name="name" type="text" placeholder="name" required />
          <Input name="phone" type="tel" placeholder="phone" required />
          <Input name="address" type="text" placeholder="address" required />

          <Input name="zip" type="text" placeholder="zip code" required />
          <Input name="state" type="text" placeholder="state" required />
          <Input name="city" type="text" placeholder="city" required />

          <Button type="submit" size="lg" className="w-full">
            Complete Purchase
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
