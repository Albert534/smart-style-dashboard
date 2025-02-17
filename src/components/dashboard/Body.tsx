import Header from './Header';

import {
	SkinOutlined,
	SmileOutlined,
	BaiduOutlined,
	WalletOutlined,
} from '@ant-design/icons';
import {
	useFetchTotalCloth,
	useFetchTotalItems,
	useFetchTotalPetCloth,
} from '../../hooks/fetchCards';

const DashBody = () => {
	const getData = useFetchTotalItems();
	console.log(getData?.length);
	const getHumanCloth = useFetchTotalCloth();
	console.log(getHumanCloth?.length);
	const getPetCloth = useFetchTotalPetCloth();
	console.log(getPetCloth?.length);
	const sampleData = [
		{
			title: 'Total Inventory',
			number: getData?.length ?? 0,
			description: 'All Clothing',
			icon: <SkinOutlined />,
		},
		{
			title: 'Human Clothing',
			number: getHumanCloth?.length ?? 'Loading',
			description: 'Human Clothing ',
			icon: <SmileOutlined />,
		},
		{
			title: 'Pet Clothing',
			number: getPetCloth?.length ?? 0,
			description: 'All Pet Clothing',
			icon: <BaiduOutlined />,
		},
		{
			title: 'Inventory Value',
			number: '80',
			description: 'Total Value',
			icon: <WalletOutlined />,
		},
	];
	return (
		<div>
			<Header data={sampleData} />
		</div>
	);
};

export default DashBody;
