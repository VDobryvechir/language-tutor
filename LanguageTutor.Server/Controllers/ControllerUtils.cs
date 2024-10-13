using Amazon.Runtime.Internal;

namespace LanguageTutor.Server.Controllers
{
    public class ControllerUtils
    {
        private readonly static string[] maxAge = ["60"];
        private readonly static string[] allowCredentials = [ "true" ];
        private readonly static string[] allowHeaders = ["*"];
        private readonly static string[] allowMethods = [ "GET, POST, PUT, DELETE, OPTIONS" ];

        static public void AddCommonHeaders(HttpRequest request, HttpResponse response)
        {
            string? origin = (string) request.Headers["Origin"];
            response.Headers.Add("Access-Control-Allow-Origin", new[] { origin ?? "*" });
            response.Headers.Add("Access-Control-Allow-Credentials", allowCredentials);
            response.Headers.Add("Access-Control-Max-Age", maxAge);
            response.Headers.Add("Access-Control-Allow-Headers", allowHeaders);
        }

        static public void AddCommonOptionHeaders(HttpRequest request, HttpResponse response)
        {
            AddCommonHeaders(request, response);
            response.Headers.Add("Access-Control-Allow-Methods", allowMethods);
        }
    }
}
