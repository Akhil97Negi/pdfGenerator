import { connect } from "mongoose";

const connectToDB = async (url) =>{
    try {
        await connect(url);
        console.log("Sucessfully connecteed to database");
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB;