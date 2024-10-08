using Amazon.Runtime.Internal;

namespace LanguageTutor.Server.Controllers
{
    public class ControllerUtils
    {
        static public void AddCommonHeaders(HttpRequest request, HttpResponse response)
        {
            response.Headers.Add("Access-Control-Allow-Origin", new[] { (string)request.Headers["Origin"] });
            response.Headers.Add("Access-Control-Allow-Credentials", new[] { "true" });
            response.Headers.Add("Access-Control-Max-Age", new[] { "60" });
            response.Headers.Add("Access-Control-Allow-Headers", new[] { "*" });
        }

        static public void AddCommonOptionHeaders(HttpRequest request, HttpResponse response)
        {
            response.Headers.Add("Access-Control-Allow-Origin", new[] { (string)request.Headers["Origin"] });
            response.Headers.Add("Access-Control-Allow-Headers", new[] { "*" });
            response.Headers.Add("Access-Control-Allow-Methods", new[] { "GET, POST, PUT, DELETE, OPTIONS" });
            response.Headers.Add("Access-Control-Allow-Credentials", new[] { "true" });
            response.Headers.Add("Access-Control-Max-Age", new[] { "60" });
        }
    }
}
