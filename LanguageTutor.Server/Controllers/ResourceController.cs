using LanguageTutor.Server.Models;
using LanguageTutor.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace LanguageTutor.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ResourceController : ControllerBase
    {
        private readonly DbResourceService _resourceService;

        public ResourceController(DbResourceService resourceService) =>
            _resourceService = resourceService;

        [HttpGet]
        public async Task<List<Resource>> Get() =>
            await _resourceService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Resource>> Get(string id)
        {
            var book = await _resourceService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Resource newResource)
        {
            await _resourceService.CreateAsync(newResource);

            return CreatedAtAction(nameof(Get), new { id = newResource.Id }, newResource);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Resource updatedResource)
        {
            var book = await _resourceService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            updatedResource.Id = book.Id;

            await _resourceService.UpdateAsync(id, updatedResource);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _resourceService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _resourceService.RemoveAsync(id);

            return NoContent();
        }
    }
}
