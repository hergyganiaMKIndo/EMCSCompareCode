﻿namespace WindowsServiceEbupot.Services.ExceptionHandler
{
    public class ResponseUnauthorized
    {
        public bool IsError { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public int Status { get; set; }
        public string Detail { get; set; }
        public string Instance { get; set; }
    }
}