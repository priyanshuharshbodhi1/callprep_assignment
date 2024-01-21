const mongoose = require('mongoose');
const { Schema } = mongoose;

const aggregatedStats = new Schema({
    average_class_score: { type: Number, required: true },
    subject_averages: {
      physics: { type: Number, required: true },
      chemistry: { type: Number, required: true },
      maths: { type: Number, required: true },
    },
  });
  
  const AggregatedStatistics = mongoose.model('AggregatedStats', aggregatedStats);
  
  module.exports = AggregatedStatistics;
  