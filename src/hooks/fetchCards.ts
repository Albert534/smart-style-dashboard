import { useEffect, useState } from 'react';
import supabase from '../../utils/client';

export function useFetchTotalItems() {
	const [getData, setData] = useState<string[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			// Fetch human clothing data
			const { data: humanData, error: humanError } = await supabase
				.from('cloths')
				.select();
			if (humanError) {
				console.log('Error Fetching Cloths');
			}

			// Fetch pet clothing data
			const { data: petData, error: petError } = await supabase
				.from('animals_clothes')
				.select();
			if (petError) {
				console.log('Error Fetching Pet Cloths');
			}

			// Combine both data sets
			if (humanData && petData) {
				setData([...humanData, ...petData]);
			}
		};

		fetchData();
	}, [getData]);

	return getData;
}

export function useFetchTotalCloth() {
	const [getHumanCloth, setData] = useState<string[] | null>(null);

	useEffect(() => {
		const fetchHumanCount = async () => {
			const { data, error } = await supabase.from('cloths').select();
			if (error) {
				console.log('Error Fetching Cloths');
			} else {
				setData(data);
			}
		};
		fetchHumanCount();
	}, [getHumanCloth]);

	return getHumanCloth;
}

export function useFetchTotalPetCloth() {
	const [getPetCloth, setData] = useState<string[] | null>(null);

	useEffect(() => {
		const fetchPetCount = async () => {
			const { data, error } = await supabase.from('animals_clothes').select();
			if (error) {
				console.log('Error Fetching Pet Cloths');
			} else {
				setData(data);
			}
		};
		fetchPetCount();
	}, [getPetCloth]);

	return getPetCloth;
}
