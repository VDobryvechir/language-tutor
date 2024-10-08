using LanguageTutor.Server.Models;
using LanguageTutor.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace LanguageTutor.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TranslationController : ControllerBase
    {
        private readonly TranslationService _translationService;    
        public TranslationController(TranslationService translationService)
        {
            _translationService = translationService;   
        }

        [HttpPost]
        public async Task<List<TranslationResponse>> Post(TranslationRequest translationRequest)
        {
            ControllerUtils.AddCommonHeaders(Request, Response);
            List<TranslationResponse> response = new List<TranslationResponse>();   
            if (translationRequest == null || translationRequest.OriginalLanguage==null || translationRequest.OriginalLanguage.Length==0 || translationRequest.Languages == null || translationRequest.Languages.Length == 0) {
                return response;
            }
            List<string> text = translationRequest.Text == null ? new List<string>() : translationRequest.Text ;
            string origLang = translationRequest.OriginalLanguage; 
            for (int i = 0; i < translationRequest.Languages.Length; i++)
            {
                string lang = translationRequest.Languages[i];
                List<string> block = _translationService.TranslateToLanguage(origLang, lang, text);
                TranslationResponse item = new TranslationResponse() { Text = block, Language = lang};
                response.Add(item);
            }
            return response;
        }

        [HttpOptions]
        public IActionResult Options()
        {
            ControllerUtils.AddCommonOptionHeaders(Request, Response);

            return Ok();
        }
    }
}
