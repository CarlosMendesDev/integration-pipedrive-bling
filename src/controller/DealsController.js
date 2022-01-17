import { json2xml } from 'xml-js';
import axios from 'axios';
import DealSchema from '../model/DealSchema.js';

class DealsController {
  async _publishBling(deals) {
    try {
      const blingRequests = deals.data?.map((deal) => {
        const dealObject = {
          cliente: {
            nome: deal.title,
          },
          parcelas: {
            parcela: {
              data: deal.close_time,
              vlr: deal.value,
            },
          },
          itens: {
            item: {
              codigo: deal.id,
              vlr_unit: deal.value / deal.products_count,
              qtde: deal.products_count,
            },
          },
        };
  
        const xmlDeal = json2xml({ pedido: dealObject }, { compact: true });
  
        return axios.post(`https://bling.com.br/Api/v2/pedido/json/?apikey=${process.env.BLING_APIKEY}&xml=<?xml version="1.0" encoding="ISO-8859-1"?>${xmlDeal}`);
      });
  
      await Promise.all(blingRequests);
    } catch (error) {
      console.log(error);
    }
  };

  async _saveDeal(deals) {
    try {
      const calculateDeals = deals.data?.reduce((acc, cur) => {
        const close_time = cur.close_time.split(' ')[0];
  
        const index = acc.findIndex(({ date_deal }) => date_deal === close_time);
  
        if (index === -1) {
          acc.push({
            date_deal: close_time,
            total_value_deal: cur.value,
          });
        } else {
          acc[index].total_value_deal += cur.value;
        };
  
        return acc;
      }, []);
  
      for (const deal of calculateDeals) {
        let dealSchema = await DealSchema.findOne({ date_deal: deal.date_deal });

        if (dealSchema) {
          dealSchema.total_value_deal = deal.total_value_deal;
        } else {
          dealSchema = new DealSchema(deal);
        };

        await dealSchema.save();
      };
    } catch (error) {
      console.log(error);
    }
  };
};

export default new DealsController();
