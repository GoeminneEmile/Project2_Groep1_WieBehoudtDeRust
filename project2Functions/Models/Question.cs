using System;
using System.Collections.Generic;
using System.Text;

namespace project2Functions.Models
{
    public class Question
    {
        public string QuestionID;
        public string QuestionName;
        public List<QuestionAnswer> questionAnswers = new List<QuestionAnswer>();
    }
}
