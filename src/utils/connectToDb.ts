import mongoose from "mongoose";
import log from "./logger";

async function connectToDb() {
  const dbUri =
    "mongodb+srv://phamthuylinhutt:linhutt2k1@doantotnghiep.5xxt9em.mongodb.net/?retryWrites=true&w=majority";
  log.info(dbUri);
  try {
    await mongoose.connect(dbUri);
  } catch (error) {
    process.exit(1);
  }
}

export default connectToDb;
