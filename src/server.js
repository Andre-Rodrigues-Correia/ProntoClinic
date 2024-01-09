import app from "./app.js";
import {connectDB} from "./database/connection.js";
const PORT = process.env.PORT

app.listen(PORT, async () => {
    await connectDB();
})
