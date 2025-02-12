import { create } from "zustand";
import { supabase } from "./supabase";
import { toast } from "sonner";

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	color: string;
	brand: string;
	category_id: string;
}

export interface Cart {
	id: number;
	quantity: number;
	product_id: number;
	product: Product;
}

export interface Category {
	id: string;
	name: string;
}

interface BearStore {
	cart: Cart[];
	products: Product[];
	cartOpen: boolean;
	category: string;
	setCategory: (category: string) => void;
	categories: Category[];
	fetchCategories: () => Promise<void>;
	setCartOpen: (open: boolean) => void;
	fetchProducts: () => Promise<void>;
	fetchCart: () => Promise<void>;
	addProductToCart: (id: number) => Promise<void>;
}

export const useBearStore = create<BearStore>((set, get) => ({
	cart: [],
	products: [],
	cartOpen: false,
	category: "all",
	setCategory: (category) => set({ category }),
	categories: [],
	fetchCategories: async () => {
		const { data: categories, error } = await supabase
			.from("category")
			.select("*");

		if (error) {
			toast.error("Failed to fetch categories");
			return;
		}

		set({ categories });
	},
	setCartOpen: (open) => set({ cartOpen: open }),
	fetchProducts: async () => {
		const { data: products, error } = await supabase
			.from("product")
			.select("*");
		if (error) {
			toast.error("Failed to fetch products");
			return;
		}

		set({ products });
	},

	fetchCart: async () => {
		const { data: cart, error } = await supabase
			.from("cart")
			.select("*, product (*)");

		if (error) {
			toast.error("Failed to fetch cart");
			return;
		}

		set({ cart });
	},

	addProductToCart: async (id: number) => {
		const { error } = await supabase
			.from("cart")
			.insert({
				product_id: id,
				quantity: 1,
			})
			.single();

		if (error) {
			toast.error("Failed to add product to cart");
			return;
		}

		const product = get().products.find((product) => product.id === id);

		toast.success(`Added ${product?.name} to cart`);

		get().fetchCart();
	},
}));
