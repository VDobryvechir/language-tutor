using LanguageTutor.Server.Models;
using LanguageTutor.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System;

namespace LanguageTutor.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class FixVerseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string? filePattern;

        public FixVerseController(IConfiguration configuration)
        {
            _configuration = configuration;
            filePattern = configuration["Verses:TextWebRootPath"];
        }
    

        [HttpGet("{id}")]
        public ActionResult Get(string id, string line, string content, string total) 
        {
            string fileName = findLocation(id, out string lang);
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
            bool isTotalNumber = int.TryParse(line, out totalNo);
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
                throw new InvalidDataException("changed array is of different length ");
            }
             
            string res = lineNo == 0 ? breakAtText(changes, content) : insertEmptyLine(changes, lineNo);
            if (res.StartsWith("ok"))
            {
                string jsonChanged = JsonSerializer.Serialize(data);
                System.IO.File.WriteAllText(fileName, jsonChanged);
            }
            return Content(res);
        }

        public string findLocation(string id, out string lang) {
            if (string.IsNullOrEmpty(filePattern))
            {
                throw new ArgumentNullException("Verses:TextWebRootPath is not configured");
            }
            if (id.Length<6)
            {
                throw new InvalidDataException("Invalid id " + id);
            }
            lang = id.Substring(0 , 2);
            string book = id.Substring(2, 3);
            string chapter = id.Substring(5);
            bool isNumber = int.TryParse(chapter, out int number);
            if (!isNumber)
            {
                throw new InvalidDataException("chapter is wrong " + chapter);
            }
            string res = filePattern.Replace("[book]", book).Replace("[chapter]",chapter);
            return res;
        }

        public int evaluateLine(string origin, string content, out bool isLineNo, ref int linePos)
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
            }
            return count;
        }
        public string breakAtText(List<string> lines, string content) {
            int count = 0;
            int lineNo = 0;
            int linePos = 0;
            int n = lines.Count;
            for(int i = 0;i<n;i++)
            {
                count += evaluateLine(lines[i], content, out bool isLineNo, ref linePos);
                if (isLineNo)
                {
                    lineNo = i;
                }
            }
            if (count==0)
            {
                return "error: Not found " + content; 
            }
            if (count!=1)
            {
                return "error: ambigious word, which was met " + count + " times";
            }
            string line1 = lines[lineNo];
            string lineStart = line1.Substring(0, linePos);
            string lineEnd = line1.Substring(linePos);
            if (string.IsNullOrWhiteSpace(lineStart) || string.IsNullOrWhiteSpace(lineEnd)) {
                return "error: it is not the middle of sebtence " + linePos;
            }
            if (lineStart[lineStart.Length - 1] >= 'A' && lineEnd[0] >= 'A') {
                return "error: it breaks the word " + linePos;
            }
            lineStart = lineStart.Trim();
            lineEnd = lineEnd.Trim();
            lines[lineNo] = lineStart;
            lines.Insert(lineNo+1, lineEnd);
            return "ok: inserted at " + lineNo + " total became " + lines.Count;
        }

        public string insertEmptyLine(List<string> lines, int lineNo)
        {
            int total = lines.Count;
            if (lineNo<1 || lineNo>=total)
            {
                return "error: line must be from 1 to " + total;
            }
            lines.Insert(lineNo - 1, "---");
            return "ok inserted at " + lineNo;
        }
    }
}
