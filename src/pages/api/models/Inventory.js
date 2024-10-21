const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    threshold: { type: Number, required: true },
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    usage_logs: [
      {
        event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        used_quantity: { type: Number, required: true },
        date_used: { type: Date, default: Date.now }
      }
    ]
  });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;