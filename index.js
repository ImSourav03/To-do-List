import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";
const app = express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
let myArr=[];

function getCurrentDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const currentDate = new Date();
    const day = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();
  
    return `${day}, ${month} ${date}, ${year}`;
  }
  app.get('/', (req, res) => {
    const currentDate = getCurrentDate();
    //const userName = req.query.userName || "";
    res.render('index.ejs', { currentDayDate: currentDate });
  });
app.post("/submit",(req,res,next) =>{
    let len=0;
    let newData=req.body["newItem"];
    const currentDate = getCurrentDate();
    if (newData){
        myArr.push(newData);
        len=myArr.length;
        //to keep track of the data entered and lenght of the array on terminal
        console.log(myArr);
        console.log(len);
    }
    res.render("index.ejs", {
        userName:name,
        newLabel: myArr,
        updatedLen: len,
        currentDayDate:currentDate
    })
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });