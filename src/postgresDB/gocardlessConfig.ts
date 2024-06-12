const GoCardless = require("gocardless-nodejs");
import dotenv from "dotenv";
// const gcToken='sandbox_h5lzAdupkk05BZIg_Frm_OjWUenYnxPMRdCFsJOv';
const gcToken='live_2I_Cgxw144w1nGggLrVD0r5UV3wznF_wO24k4eUG';
dotenv.config();

const gcClient = new GoCardless({
  accessToken: gcToken,
  environment: 'live' ,
});

export default gcClient;