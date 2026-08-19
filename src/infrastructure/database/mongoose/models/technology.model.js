import mongoose from "mongoose";

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  technologies: [
    {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        default: null,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],
  tags: [String],
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Technology", technologySchema);
