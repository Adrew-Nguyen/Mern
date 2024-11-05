import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
dotenv.config() // kích hoạt liên kết .env

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoppingcardcluster.3c6no.mongodb.net/?retryWrites=true&w=majority&appName=shoppingCardCluster`
// không nên export cái class ra
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  //method
  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      // từ 4.7 thì new MongoClient() thì đã tự kết nối luôn rồi.
      // await client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  //hàm lấy instance của collection USERS
  get users(): Collection<User> {
    //accessor property
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
}

//dependency injection pattern
//export một class thì ở các file khác phải new ra thì mới sài
//còn mik tạo xong rồi export nó ra để mọi thứ đều sài chung một instance
let databaseService = new DatabaseService()
export default databaseService
