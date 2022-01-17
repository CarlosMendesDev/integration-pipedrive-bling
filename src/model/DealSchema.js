import mongoose from 'mongoose';

const Deals = new mongoose.Schema({
  date_deal: {
    type: Date,
    index: { unique: true }
  },
  total_value_deal: { type: Number },
});

export default mongoose.model('Deals', Deals);
