using LanguageTutor.Server.Models;
using LanguageTutor.Server.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System;
using LanguageTutor.Server.Services;
using System.Text.Encodings.Web;
using System.Text.Unicode;

namespace LanguageTutor.Server.Controllers
{
    [ApiController]
    [Route("api/fixverse")]

    public class FixVerseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string? filePattern;

        public FixVerseController(IConfiguration configuration)
        {
            _configuration = configuration;
            filePattern = configuration["Verses:TextWebRootPath"];
        }

        [HttpGet]
        public ActionResult Get(string id, string line, string content, string total) 
        {
            string fileName = VerseProcessingUtils.FindLocation(filePattern!, id, out string lang);
            if (!System.IO.File.Exists(fileName))
            {
                throw new FileNotFoundException(fileName);
            }
            if (string.IsNullOrEmpty(line))
            {
                throw new InvalidDataException("line must not be empty");
            }
            int lineNo;
            bool isNumber = int.TryParse(line,out lineNo);
            if (!isNumber)
            {
                throw new InvalidDataException("line must be a number " + line);
            }
            if (string.IsNullOrEmpty(total))
            {
                throw new InvalidDataException("total must not be empty");
            }
            int totalNo;
            bool isTotalNumber = int.TryParse(total, out totalNo);
            if (!isTotalNumber)
            {
                throw new InvalidDataException("total must be a number " + total);
            }
            string jsonString = System.IO.File.ReadAllText(fileName);
            VerseTextFile? data = JsonSerializer.Deserialize<VerseTextFile>(jsonString);
            if (data == null)
            {
                throw new InvalidDataException("file is empty " + fileName);
            }
            if (data.TargetLanguages == null || data.TargetLines == null)
            {
                throw new InvalidDataException("file is present but contains no targetLanguages or targetLines");
            }
            int index = data.TargetLanguages.FindIndex((item) => item == lang);
            if (index < 0)
            {
                throw new InvalidDataException("lang is not contained in this file " + lang);
            }
            if (data.TargetLanguages.Count != data.TargetLines.Count)
            {
                throw new InvalidDataException("Not equal size of TargetLines and TargetLanguages");
            }
            List<string> changes = data.TargetLines[index];
            if (changes == null || changes.Count != totalNo)
            {
                throw new InvalidDataException("changed array is of different length " + (changes==null? -1 : changes.Count)+ " expected "+ totalNo);
            }
             
            string res = lineNo == 0 ? VerseProcessingUtils.BreakAtText(changes, content) : VerseProcessingUtils.InsertEmptyLine(changes, lineNo);
            if (res.StartsWith("ok"))
            {
                var options = new JsonSerializerOptions
                {
                    Encoder = JavaScriptEncoder.Create(UnicodeRanges.All),
                    WriteIndented = true
                };
                string jsonChanged = JsonSerializer.Serialize(data, options);
                jsonChanged = VerseProcessingUtils.MakeSafeCleaning(jsonChanged);
                System.IO.File.WriteAllText(fileName, jsonChanged);
            }
            return Content(res);
        }

        [HttpGet("refine")]
        public ActionResult GetRefined(string id)
        {
            string fileName = VerseProcessingUtils.FindLocation(filePattern!, id, out string lang);
            if (!System.IO.File.Exists(fileName))
            {
                throw new FileNotFoundException(fileName);
            }
            if (lang!="en")
            {
                throw new InvalidDataException("lang must be en");
            }
            string jsonString = System.IO.File.ReadAllText(fileName);
            VerseTextFile? data = JsonSerializer.Deserialize<VerseTextFile>(jsonString);
            if (data == null)
            {
                throw new InvalidDataException("file is empty " + fileName);
            }
            if (data.TargetLanguages == null || data.TargetLines == null)
            {
                throw new InvalidDataException("file is present but contains no targetLanguages or targetLines");
            }
            if (data.TargetLanguages.Count != data.TargetLines.Count)
            {
                throw new InvalidDataException("Not equal size of TargetLines and TargetLanguages");
            }
            var options = new JsonSerializerOptions
            {
                    Encoder = JavaScriptEncoder.Create(UnicodeRanges.All),
                    WriteIndented = true
            };
            string jsonChanged = JsonSerializer.Serialize(data, options);
            jsonChanged = VerseProcessingUtils.MakeSafeCleaning(jsonChanged);
            System.IO.File.WriteAllText(fileName, jsonChanged);
            string res = "refined "+id; 
            return Content(res);
        }

    }
}
