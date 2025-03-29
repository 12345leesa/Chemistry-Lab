const { MongoClient } = require('mongodb');

async function testConnection() {
const uri = "mongodb+srv://admin:DhHWWNUzDGuxyP9N@cluster0.lsdcmze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    
    
    try {
        const client = new MongoClient(uri, { 
            useNewUrlParser: false,
            useUnifiedTopology: false 
        });
        
        console.log('Attempting connection...');
        await client.connect();
        console.log('✅ Connection successful');
        
        const database = client.db('ElementEdgeDB');
        const result = await database.admin().listDatabases();
        
        console.log('Databases:', result.databases.map(db => db.name));
        
        await client.close();
    } catch (error) {
        console.error('❌ Connection Failed:', {
            message: error.message,
            name: error.name,
            code: error.code
        });
    }
}

testConnection();