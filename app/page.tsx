'use client'
import React, { useState } from "react";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon, SearchIcon } from "@/components/icons";
import { Link } from "@nextui-org/link";
import {
	Autocomplete,
	AutocompleteSection,
	AutocompleteItem
} from "@nextui-org/autocomplete"
import { useAsyncList } from "@react-stately/data";


type SWCharacter = {
	name: string;
	height: string;
	mass: string;
	birth_year: string;
};



export default function Home() {
	let list = useAsyncList<SWCharacter>({
		async load({ signal, filterText }) {
			let res = await fetch(`https://swapi.py4e.com/api/people/?search=${filterText}`, { signal });
			let json = await res.json();

			return {
				items: json.results,
			};
		},
	});

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Track any&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>MultiversX &nbsp;</h1>
				<br />
				<h1 className={title()}>
					wallet with ease.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					#iztime2built
				</h2>
			</div>



			<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
				<Autocomplete
					className="max-w-xs"
					inputValue={list.filterText}
					isLoading={list.isLoading}
					items={list.items}
					label="Select a character"
					placeholder="Type to search..."
					variant="bordered"
					onInputChange={list.setFilterText}
				>
					{(item) => (
						<AutocompleteItem key={item.name} className="capitalize">
							{item.name}
						</AutocompleteItem>
					)}
				</Autocomplete>
			</div>
		</section>
	);
}
