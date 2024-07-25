using LanguageTutor.Server.Models;
using LanguageTutor.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace LanguageTutor.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LanguageController : ControllerBase
{
    private readonly DbLanguageService _languageService;

    public LanguageController(DbLanguageService languageService) =>
        _languageService = languageService;

    [HttpGet]
    public async Task<List<Language>> Get() =>
        await _languageService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Language>> Get(string id)
    {
        var book = await _languageService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        return book;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Language newLanguage)
    {
        await _languageService.CreateAsync(newLanguage);

        return CreatedAtAction(nameof(Get), new { id = newLanguage.Id }, newLanguage);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Language updatedLanguage)
    {
        var book = await _languageService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        updatedLanguage.Id = book.Id;

        await _languageService.UpdateAsync(id, updatedLanguage);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _languageService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _languageService.RemoveAsync(id);

        return NoContent();
    }
}
