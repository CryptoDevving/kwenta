import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { FIAT_SYNTHS, COMMODITY_SYNTHS, CurrencyKey } from 'constants/currency';
import QUERY_KEYS from 'constants/queryKeys';
import { FuturesMarketKey } from 'utils/futures';

import { CG_BASE_API_URL } from './constants';
import { PriceResponse } from './types';
import { synthToCoingeckoPriceId } from './utils';

const getCoinGeckoPrice = async (currencyKey: FuturesMarketKey) => {
	const priceId = synthToCoingeckoPriceId(currencyKey);

	const response = await axios.get<PriceResponse>(
		`${CG_BASE_API_URL}/simple/price?ids=${priceId}&vs_currencies=usd`
	);

	return response.status === 200 ? response.data[priceId].usd : null;
};

const getCommodityPrice = async (currencyKey: CurrencyKey) => {
	const { data: externalPrice } = await axios.get('/api/commodityPrice', {
		params: {
			symbol: currencyKey,
		},
	});
	return externalPrice;
};

const getForexPrice = async (currencyKey: CurrencyKey) => {
	const { data: externalPrice } = await axios.get('/api/forexPrice', {
		params: {
			symbol: currencyKey,
		},
	});
	return externalPrice;
};

const useExternalPriceQuery = (
	marketKey: FuturesMarketKey,
	options?: UseQueryOptions<number | null>
) => {
	return useQuery<number | null>(
		QUERY_KEYS.Rates.ExternalPrice(marketKey),
		async () => {
			return COMMODITY_SYNTHS.has(marketKey as any)
				? getCommodityPrice(marketKey as any)
				: FIAT_SYNTHS.has(marketKey as any)
				? getForexPrice(marketKey as any)
				: getCoinGeckoPrice(marketKey);
		},
		{
			enabled: !!marketKey,
			refetchInterval: 60000,
			...options,
		}
	);
};

export default useExternalPriceQuery;
