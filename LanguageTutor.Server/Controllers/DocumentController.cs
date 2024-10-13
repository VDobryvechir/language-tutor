using LanguageTutor.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using NetOdt;
using NetOdt.Enumerations;
using SharpCompress.Common;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using ZstdSharp.Unsafe;

namespace LanguageTutor.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        [HttpPost("download")]
        public IActionResult Download(AudioTextData data)
        {
            ControllerUtils.AddCommonHeaders(Request, Response);
            string tempFileName = System.IO.Path.GetTempFileName();
            CreateOdt(data, tempFileName);
            var fileBytes = System.IO.File.ReadAllBytes(tempFileName);
            var mimeType = "application/vnd.oasis.opendocument.text"; 
            var fileName = "doc.odt";
            return File(fileBytes, mimeType, fileName);
        }

        [HttpOptions("download")]
        public IActionResult DownloadOptions()
        {
            ControllerUtils.AddCommonOptionHeaders(Request, Response);

            return Ok();
        }

        [HttpPost("upload")]
        public ActionResult<AudioTextData> Upload(IFormFile file)
        {
            var data = new byte[file.Length];
            AudioTextData res = null;
            using (var bstream = file.OpenReadStream())
            {
                if (bstream.CanRead)
                {
                    bstream.Read(data);
                    string tempFileName = System.IO.Path.GetTempFileName();
                    System.IO.File.WriteAllBytes(tempFileName, data);
                    res = ExtractAudioTextData(tempFileName);
                }
            }
            ControllerUtils.AddCommonHeaders(Request, Response);
            return res;
        }

        [HttpOptions("upload")]
        public IActionResult UploadOptions()
        {
            ControllerUtils.AddCommonOptionHeaders(Request, Response);

            return Ok();
        }

        private static void CreateOdt(AudioTextData data, string fileName)
        {
            using var odtDocument = new OdtDocument(fileName);

            // Set global font for the all text passages for complete document
            odtDocument.SetGlobalFont("Liberation Serif", FontSize.Size12);

            odtDocument.AppendLine("Audio: " + data.Audio, TextStyle.Center);
            odtDocument.AppendEmptyLines(1);
            // int cols = data.Data.Length + 1;
            // int rows = data.Data[0].Text.Length + 1;
            DataTable table = GetTableData(data);
            odtDocument.AppendTable( table);

        }

        private static string ShowTime(int n)
        {
            if (n<0)
            {
                return "";
            }
            int ms = n % 1000;
            n /= 1000;
            int s = n % 60;
            n /= 60;
            StringBuilder show = new();
            show.Append(n);
            show.Append(':');
            if (s<10)
            {
                show.Append('0');
                show.Append(s);
            } 
            else
            {
                show.Append(s);
            }
            show.Append('.');
            ms /= 10;
            if (ms < 10)
            {
                show.Append('0');
                show.Append(ms);
            }
            else
            {
                show.Append(ms);
            }
            return show.ToString();
        }
        private static DataTable GetTableData(AudioTextData data)
        {
            DataTable table = new("Table");
            if (data == null || data.Data == null || data.Data.Length == 0)
            {
                return table;
            }
            table.Columns.Add("Time", typeof(string));
            int cols = data.Data.Length;
            int rows = data.Data[0].Text.Length;
            object[] headers = new object[cols + 1];
            headers[0] = "Time";
            for(int i=0;i<cols;i++)
            {
                string name = data.Data[i].Language;
                table.Columns.Add(name, typeof(string));
                headers[i + 1] = name;
            }
            table.Rows.Add(headers);
            int posAmnt = data.Positions.Length;
            for (int j=0;j<rows; j++)
            {
                object[] row = new object[cols + 1];
                row[0] = ShowTime(j < posAmnt ? data.Positions[j] : -1);
                for (int i = 0; i < cols; i++)
                {
                    string[] blk = data.Data[i].Text;
                    string name = j<blk.Length ? blk[j] : "";
                    row[i + 1] = name;
                }
                table.Rows.Add(row);
            }
            return table;
        }

        private static AudioTextData ExtractAudioTextData(string fileName)
        {
            using var odtDocument = new OdtDocument(fileName, true);
            AudioTextData audioTextData = new();
            DataTable table = odtDocument.GetDataTable(0, 0);
            audioTextData.Audio = GetAudioName(odtDocument);
            audioTextData.Positions = GetAudioPositions(table);
            audioTextData.Data = GetAudioTextBlocks(table, audioTextData.Positions!=null? 1: 0);
            return audioTextData;
        }

        private static string GetAudioName(OdtDocument odt)
        {
            int index = odt.LineIndexOf("Audio:", 0);
            if (index<0) { 
                return "";
            }
            string s = odt.GetPlainLine(index);
            int pos = s.IndexOf("Audio:");
            if (pos<0) {
                return "";
            }
            return s[(pos + 6)..].Trim();
        }

        private static readonly string[] defLangs = ["nb", "uk", "en", "de", "fr", "nn", "gr", "da", "ru", "es", "sv", "pl", "bg", "cz"];
        private static readonly HashSet<string> defLangSet = new(defLangs);

        private static AudioTextBlock[] GetAudioTextBlocks(DataTable table, int startColumn)
        {
            int blockAmount = table.Columns.Count;
            int blockStart;
            int blockEnd = table.Rows.Count;
            int amountOfBlocks = blockAmount - startColumn;
            AudioTextBlock[] blocks = new AudioTextBlock[amountOfBlocks >0 ? amountOfBlocks : 0];
            if (blockEnd==0 || amountOfBlocks<=0)
            {
                return blocks;
            }
            for(int column = startColumn; column < blockAmount; column++)
            {
                AudioTextBlock block = new();
                blocks[column - startColumn] = block;
                String lang = table.Rows[0].ItemArray[column].ToString() ?? "";
                if (defLangSet.Contains(lang))
                {
                    block.Language = lang;
                    blockStart = 1;
                } else
                {
                    block.Language = defLangs[(column - startColumn) % defLangs.Length];
                    blockStart = 0;
                }
                int rowAmount = blockEnd - blockStart;
                string[] data = new string[rowAmount];
                block.Text = data;
                for(int row = 0; row < rowAmount; row++)
                {
                    data[row] = table.Rows[blockStart + row].ItemArray[column].ToString();
                }
            }
            return blocks;
        }


        private static int[]? GetAudioPositions(DataTable table)
        {
            int amount = table.Rows.Count - 1;
            if (amount<=0)
            {
                return null;
            } 
            int[] positions = new int[amount];
            for (int i = 0; i < amount; i++)
            {
                string s = table.Rows[i + 1]
                                .ItemArray[0]
                                .ToString();
                int pos = ConvertTimeValue(s);
                if (pos < 0)
                {
                    return null;
                }
                positions[i] = pos;
            }
            return positions;
        }

        private static int IntegrateTimeByStep(int res, int m, int step)
        {
            if (step >= 0)
            {
                res += m * 1000;
            }
            else
            {
                switch (step)
                {
                    case -2:
                        res += m * 100;
                        break;
                    case -3:
                        res += m * 10;
                        break;
                    case -4:
                        res += m;
                        break;
                }
            }
            return res;
        }

        private static int ConvertTimeValue(string s)
        {
            int n = s.Length;
            int res = 0;
            int m = 0;
            int step = 1;
            for (int i = 0; i < n; i++)
            {
                char c = s[i];
                if (c >= '0' && c <= '9')
                {
                    int cd = c - 48;
                    if (step >= -3)
                    {
                        m = m * 10 + cd;
                        if (step < 0)
                        {
                            step--;
                        }
                    }
                }
                else if (c == ':')
                {
                    if (step != 1)
                    {
                        return -1;
                    }
                    res = m * 60000;
                    m = 0;
                    step = 0;
                }
                else if (c == '.')
                {
                    if (step < 0)
                    {
                        return -1;
                    }
                    res = IntegrateTimeByStep(res, m, step);
                    m = 0;
                    step = -1;
                }
                else if (c != ' ')
                {
                    return -1;
                }
            }
            if (m > 0)
            {
                res = IntegrateTimeByStep(res, m, step);
            }
            return res;
        }
    }
}
