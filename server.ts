
import express, {Request, Response} from 'express';
import * as path from "path";


const app = express();
console.log(__dirname)
app.get('/*', (req:Request, res:Response)=> {
    if(req) {
        console.log(__dirname)
        res.sendFile(path.resolve(__dirname,  'index.html'))
    }

})