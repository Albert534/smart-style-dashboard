import React, { useState } from 'react';
import './Header.css'; // Import the CSS file

type SampleDataItem = {
	title: string;
	number: number | string;
	description: string;
	icon: React.ReactNode; // This allows you to pass React elements like icons
};

interface HeaderProps {
	data: SampleDataItem[];
}

const Header: React.FC<HeaderProps> = ({ data }) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleClick = (index: number) => {
		setSelectedIndex(index === selectedIndex ? null : index); // Toggle selection based on index
	};

	return (
		<div className='header-container'>
			<div className='card-grid'>
				{data.map((item, index) => (
					<div
						key={index}
						onClick={() => handleClick(index)} // Pass the index to handleClick
						className={`card ${index === selectedIndex ? 'selected' : ''}`} // Check the index for selection
					>
						<div className='card-content'>
							<div style={{ display: 'flex' }}>
								<span className='card-title'>{item.title}</span>
								<span className='card-icon'>{item.icon}</span>
							</div>

							<div className='card-info'>
								<div className='card-number'>{item.number}</div>
								<div className='card-description'>{item.description}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Header;
