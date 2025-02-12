import siteConfig from "~/site.config";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import ProductCard from "~/components/product-card";
import { useEffect } from "react";
import { useBearStore } from "~/lib/store";

export const meta: MetaFunction = () => {
	return [
		{ title: siteConfig.name },
		{
			name: "description",
			content: siteConfig.description,
		},
	];
};

export default function Index() {
	const products = useBearStore((state) => state.products);
	const fetchProducts = useBearStore((state) => state.fetchProducts);
	const fetchCart = useBearStore((state) => state.fetchCart);

	const category = useBearStore((state) => state.category);
	const categories = useBearStore((state) => state.categories);
	const setCategory = useBearStore((state) => state.setCategory);
	const fetchCategories = useBearStore((state) => state.fetchCategories);

	useEffect(() => {
		fetchProducts();
		fetchCart();
		fetchCategories();
	}, [fetchCart, fetchProducts, fetchCategories]);

	const filteredProducts = products.filter((product) => {
		if (category === "all") return true;

		const productCategory = categories.find(
			(cat) => cat.id === product.category_id,
		);

		return productCategory?.name === category;
	});

	return (
		<main className="flex flex-col">
			<section className="flex flex-col items-center pt-40 space-y-4 relative w-full h-screen text-white">
				<h1 className="text-4xl font-bold">Welcome to Pondipetals Emporium</h1>
				<p className="mt-4 text-lg">
					Your one stop shop for all things handmade
				</p>
				<Button variant="secondary" className="mt-8" asChild>
					<a href="#shop">Shop Now</a>
				</Button>
				<img
					src="/main-bg.png"
					alt="ladki"
					className="w-screen h-screen object-cover absolute -z-10 inset-0 brightness-75"
				/>
			</section>
			<section className="min-h-screen p-16" id="#shop">
				<div className="flex mt-6">
					<h2 className="text-3xl font-bold">Shop</h2>
					<div className="flex space-x-4 ml-4">
						<Button
							variant={category === "all" ? "default" : "ghost"}
							onClick={() => setCategory("all")}
						>
							All
						</Button>
						{categories.map((cat) => (
							<Button
								key={cat.id}
								variant={category === cat.name ? "default" : "ghost"}
								onClick={() => setCategory(cat.name)}
							>
								{cat.name}
							</Button>
						))}
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>
		</main>
	);
}
