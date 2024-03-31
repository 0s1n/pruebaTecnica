import { FormEvent } from "react";
import "./App.css";
import { Item } from "./components/Item";
import { useItems } from "./hooks/useItems";
import { useSEO } from "./hooks/useSEO";

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
	id: ItemId;
	timestamp: number;
	text: string;
}

function App() {
	const { items, addItem, removeItem } = useItems();
	useSEO({
		title: `[${items.length}] Prueba técnica de React`,
		description: "Añadir y eliminar elementos de una lista",
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { elements } = e.currentTarget;

		const input = elements.namedItem("item");
		const isInput = input instanceof HTMLInputElement;
		if (!isInput || input == null) return;

		addItem(input.value);

		input.value = "";
	};

	const handleRemoveItem = (id: ItemId) => () => {
		removeItem(id);
	};

	return (
		<main>
			<aside>
				<h1>Prueba Técnica de React</h1>
				<h2>Añadir y eliminar elementos de una lista</h2>

				<form onSubmit={handleSubmit} aria-label='Añadir elementos a la lista'>
					<label>
						Elemento a introducir:
						<input name='item' required type='text' placeholder='Videojuegos' />
					</label>
					<button>Añadir elemento a la lista</button>
				</form>
			</aside>

			<section>
				<h2>Lista de elementos</h2>
				{items.length === 0 ? (
					<p>
						<strong>No hay elementos en la lista</strong>
					</p>
				) : (
					<ul>
						{items.map((item) => (
							<Item
								handleClick={handleRemoveItem(item.id)}
								{...item}
								key={item.id}
							/>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}

export default App;
