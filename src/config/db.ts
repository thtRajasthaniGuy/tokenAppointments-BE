const mongoose = require('mongoose');

const mongoDbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // make the process fail
    process.exit(1);
  }
};

export { mongoDbConnect };