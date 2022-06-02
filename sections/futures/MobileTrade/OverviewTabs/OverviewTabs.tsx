import React from 'react';
import styled from 'styled-components';

import TabButton from 'components/Button/TabButton';

import AccountTab from './AccountTab';
import PriceTab from './PriceTab';
import StatsTab from './StatsTab';
import TradesTab from './TradesTab';

import AccountIcon from 'assets/svg/app/account.svg';
import PriceIcon from 'assets/svg/app/price.svg';
import StatsIcon from 'assets/svg/app/stats.svg';
import OrderHistoryIcon from 'assets/svg/futures/icon-order-history.svg';

const TABS = [
	{
		title: 'Account',
		component: <AccountTab />,
		icon: <AccountIcon />,
	},
	{
		title: 'Price',
		component: <PriceTab />,
		icon: <PriceIcon />,
	},
	{
		title: 'Trades',
		component: <TradesTab />,
		icon: <OrderHistoryIcon width={18} height={18} />,
	},
	{
		title: 'Stats',
		component: <StatsTab />,
		icon: <StatsIcon />,
	},
];

const OverviewTabs: React.FC = () => {
	const [activeTab, setActiveTab] = React.useState(0);

	return (
		<div>
			{TABS[activeTab].component}
			<MainTabButtonsContainer>
				{TABS.map(({ title, icon }, i) => (
					<TabButton
						key={title}
						title={title}
						active={activeTab === i}
						onClick={() => setActiveTab(i)}
						icon={icon}
						gold
					/>
				))}
			</MainTabButtonsContainer>
		</div>
	);
};

const MainTabButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 15px;

	& > button {
		flex: 1;
		&:not(:last-child) {
			margin-right: 10px;
		}
	}
`;

export default OverviewTabs;
