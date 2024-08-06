using LanguageTutor.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace LanguageTutor.Server.Services
{
    public class DbResourceService
    {
        private readonly IMongoCollection<Resource> _resourcesCollection;

        public DbResourceService(
            IOptions<ServerDatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);

            _resourcesCollection = mongoDatabase.GetCollection<Resource>("Resource");
        }

        public async Task<List<Resource>> GetAsync() =>
            await _resourcesCollection.Find(_ => true).ToListAsync();

        public async Task<Resource?> GetAsync(string id) =>
            await _resourcesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Resource newResource) =>
            await _resourcesCollection.InsertOneAsync(newResource);

        public async Task UpdateAsync(string id, Resource updatedResource) =>
            await _resourcesCollection.ReplaceOneAsync(x => x.Id == id, updatedResource);

        public async Task RemoveAsync(string id) =>
            await _resourcesCollection.DeleteOneAsync(x => x.Id == id);

    }
}
