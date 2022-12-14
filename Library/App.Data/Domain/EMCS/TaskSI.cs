﻿namespace App.Data.Domain.EMCS
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class TaskSi
    {
        public long Id { get; set; }
        public long IdCl { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string SpecialInstruction { get; set; }
        public string DocumentRequired { get; set; }
        public string PicBlAwb { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateBy { get; set; }
        public bool IsDelete { get; set; }
        public string ExportType { get; set; }

    }
}