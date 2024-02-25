import { TitaniteClient } from "@forgify/titanite"
import "dotenv/config"
const client = new TitaniteClient(process.env.BOT_TOKEN ?? "")
client.start()
