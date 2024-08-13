using System.Web;
using static System.Net.Mime.MediaTypeNames;

namespace LanguageTutor.Server.Utils
{
    public class VerseProcessingUtils
    {
        public static string FindLocation(string filePattern, string id, out string lang)
        {
            if (string.IsNullOrEmpty(filePattern))
            {
                throw new ArgumentNullException("Verses:TextWebRootPath is not configured");
            }
            if (id.Length < 6)
            {
                throw new InvalidDataException("Invalid id " + id);
            }
            lang = id.Substring(0, 2);
            string book = id.Substring(2, 3);
            string chapter = id.Substring(5);
            bool isNumber = int.TryParse(chapter, out int number);
            if (!isNumber)
            {
                throw new InvalidDataException("chapter is wrong " + chapter);
            }
            string res = filePattern.Replace("[book]", book).Replace("[chapter]", chapter);
            return res;
        }

        public static int EvaluateLine(string origin, string content, out bool isLineNo, ref int linePos)
        {
            int count = 0;
            int pos = 0;
            int n = origin.Length;
            isLineNo = false;
            while (pos < n)
            {
                pos = origin.IndexOf(content, pos);
                if (pos < 0)
                {
                    break;
                }
                isLineNo = true;
                linePos = pos;
                pos++;
                count++;
            }
            return count;
        }
        public static string BreakAtText(List<string> lines, string data)
        {
            string content = HttpUtility.UrlDecode(data, System.Text.Encoding.Latin1);
            string? test1 = TemporaryTestExtraction(lines, content);
            if (test1!=null && test1.StartsWith("test:"))
            {
                return test1;
            }
            int count = 0;
            int lineNo = 0;
            int linePos = 0;
            int n = lines.Count;
            for (int i = 0; i < n; i++)
            {
                count += EvaluateLine(lines[i], content, out bool isLineNo, ref linePos);
                if (isLineNo)
                {
                    lineNo = i;
                }
            }
            if (count == 0)
            {
                return "error: Not found " + content;
            }
            if (count != 1)
            {
                return "error: ambigious word, which was met " + count + " times";
            }
            string line1 = lines[lineNo];
            string lineStart = line1.Substring(0, linePos);
            string lineEnd = line1.Substring(linePos);
            if (string.IsNullOrWhiteSpace(lineStart) || string.IsNullOrWhiteSpace(lineEnd))
            {
                return "error: it is not the middle of sebtence " + linePos;
            }
            if (lineStart[lineStart.Length - 1] >= 'A' && lineEnd[0] >= 'A')
            {
                return "error: it breaks the word " + linePos;
            }
            lineStart = lineStart.Trim();
            lineEnd = lineEnd.Trim();
            lines[lineNo] = lineStart;
            lines.Insert(lineNo + 1, lineEnd);
            return "ok: inserted at " + (lineNo+1) + " total became " + lines.Count;
        }

        public static string? TemporaryTestExtraction(List<string> lines, string content)
        {
            if (lines == null || lines.Count < 27) { return ""; }
            string line = lines[25];
            int pos = line.IndexOf("skal være");
            if (pos == -1)
            {
                return "not found: " + line; 
            }
            string test1 = line.Substring(pos);
            int test2 = content.Length;
            if (test2 < test1.Length)
            {
                test1 = test1.Substring(0, test2);
            }
            if (test1 != content && test1.Length > 7)
            {
                char c1 = test1[6];
                char c2 = content[6];
                return "error: different strings " + test1 + " --- " + content + "  " + (c1 + 0) + " " + (c2 + 0);
            }
            return null;
        }
        public static string InsertEmptyLine(List<string> lines, int lineNo)
        {
            int total = lines.Count;
            if (lineNo < 1 || lineNo >= total)
            {
                return "error: line must be from 1 to " + total;
            }
            lines.Insert(lineNo - 1, "---");
            return "ok inserted at " + lineNo;
        }

        public static string MakeSafeCleaning(string src )
        {
            string res = src.Replace("\\u0026nbsp;", " ").Replace("\\u0027", "'").Replace("\\u0022", "“").Replace("\\u2006", "“").Replace("\\u2009", " ").Replace("\\u202F", " ");
            return res;
        }

    }
}
