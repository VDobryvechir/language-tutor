using LanguageTutor.Server.Models;
using LanguageTutor.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace LanguageTutor.Server.Controllers
{

    [ApiController]
    [Route("api/word")]
    public class WordController(TranslationService translationService) : ControllerBase
    {
        private readonly TranslationService _translationService = translationService;

        [HttpPost]
        public ComprehensiveResponse Post(TranslationRequest translationRequest)
        {
            ControllerUtils.AddCommonHeaders(Request, Response);
            List<TranslationResponse> lines = [];
            ComprehensiveResponse response = new ComprehensiveResponse();
            response.Lines = lines;
            if (translationRequest == null || translationRequest.OriginalLanguage==null || translationRequest.OriginalLanguage.Length==0 || translationRequest.Languages == null || translationRequest.Languages.Length == 0) {
                return response;
            }
            List<string> text = translationRequest.Text ?? ([]);
            string origLang = translationRequest.OriginalLanguage;
            List<List<WordToken>> tokens = _translationService.ConvertLinesToTokens(text);
            Dictionary<string,DictionaryEntry> words = _translationService.CollectWordsForOriginalLanguage(tokens, origLang);
            response.Words = words;
            for (int i = 0; i < translationRequest.Languages.Length; i++)
            {
                string lang = translationRequest.Languages[i];
                List<string> block = _translationService.TranslateFromComprehensive(words, origLang, lang, tokens);
                TranslationResponse item = new () { Text = block, Language = lang};
                lines.Add(item);
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
