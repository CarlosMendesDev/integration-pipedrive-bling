import pipedrive from 'pipedrive';

class PipedriveService {
  constructor() {
    const defaultClient = pipedrive.ApiClient.instance;

    defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_APIKEY;
  }

  async getDealsWon() {
    const api = new pipedrive.DealsApi();
    const deals = await api.getDeals({ status: 'won' });

    return deals;
  };
};

export default new PipedriveService();
