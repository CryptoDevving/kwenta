import { FC } from 'react';
import styled from 'styled-components';

import ArrowIcon from 'assets/svg/app/arrow-down.svg';

import { SwapCurrenciesButton, BoldText } from 'styles/common';
import { zIndex } from 'constants/ui';
import useExchange from 'sections/exchange/hooks/useExchange';
import { useTranslation } from 'react-i18next';
import QuoteCurrencyCard from '../TradeCard/Cards/QuoteCurrencyCard';
import BaseCurrencyCard from '../TradeCard/Cards/BaseCurrencyCard';
import FooterCard from '../TradeCard/Cards/FooterCard';

const BasicSwap: FC = () => {
	const { t } = useTranslation();
	const { handleCurrencySwap } = useExchange({
		showPriceCard: true,
		showMarketDetailsCard: true,
		footerCardAttached: false,
		routingEnabled: true,
		persistSelectedCurrencies: true,
		showNoSynthsCard: false,
	});

	return (
		<>
			<ExchangeTitle>{t('exchange.synth-exchange')}</ExchangeTitle>
			<PageWidthContainer>
				<DesktopCardsContainer>
					<QuoteCurrencyCard allowQuoteCurrencySelection />
					<SwapCurrenciesButtonContainer>
						<SwapCurrenciesButton onClick={handleCurrencySwap} data-testid="swap-btn">
							<ArrowIcon className="arrow" />
						</SwapCurrenciesButton>
					</SwapCurrenciesButtonContainer>
					<BaseCurrencyCard allowBaseCurrencySelection />
				</DesktopCardsContainer>
			</PageWidthContainer>
			<PageWidthContainer>
				<FooterCard />
			</PageWidthContainer>
		</>
	);
};

export default BasicSwap;

const ExchangeTitle = styled(BoldText)`
	color: ${(props) => props.theme.colors.selectedTheme.button.text};
	font-size: 30px;
	margin-bottom: 1.5em;
	text-align: center;
`;

const DesktopCardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: ${(props) => props.theme.colors.selectedTheme.cell.fill};
	border-radius: 10px;
	border: ${(props) => props.theme.colors.selectedTheme.border};
	box-sizing: border-box;
	position: relative;
`;

const PageWidthContainer = styled.div`
	width: 565px;
	margin: 0 auto;
`;

const SwapCurrenciesButtonContainer = styled.div`
	align-self: flex-start;
	margin-top: 170px;
	position: absolute;
	left: calc(50% - 16px);
	z-index: ${zIndex.BASE + 10};
`;
