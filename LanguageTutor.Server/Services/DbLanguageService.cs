using LanguageTutor.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace LanguageTutor.Server.Services;

public class DbLanguageService
{
    private readonly IMongoCollection<Language> _languagesCollection;

    public DbLanguageService(
        IOptions<ServerDatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(
            databaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            databaseSettings.Value.DatabaseName);

        _languagesCollection = mongoDatabase.GetCollection<Language>("Language");
    }

    public async Task<List<Language>> GetAsync() =>
        await _languagesCollection.Find(_ => true).ToListAsync();

    public async Task<Language?> GetAsync(string id) =>
        await _languagesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Language newLanguage) =>
        await _languagesCollection.InsertOneAsync(newLanguage);

    public async Task UpdateAsync(string id, Language updatedLanguage) =>
        await _languagesCollection.ReplaceOneAsync(x => x.Id == id, updatedLanguage);

    public async Task RemoveAsync(string id) =>
        await _languagesCollection.DeleteOneAsync(x => x.Id == id);
}