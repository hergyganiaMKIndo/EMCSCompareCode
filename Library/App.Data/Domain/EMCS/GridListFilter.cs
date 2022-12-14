﻿namespace App.Data.Domain.EMCS
{
    public class GridListFilter
    {
        public long Id { get; set; }
        public long IdNpePeb { get; set; }
        public long IdCipl { get; set; }
        public long IdGr { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public long IdFlow { get; set; }
        public long IdStatus { get; set; }
        public long IdStep { get; set; }
        public string Username { get; set; }
        public string GroupId { get; set; }
        public string Sort { get; set; }
        public string Order { get; set; }
        public string Term { get; set; }
        public string SearchName { get; set; }
        public string Cat { get; set; }
        public bool Total { get; set; }
        public string Ciplno { get; set; }
        public string FormType { get; set; }
        public long Cargoid { get; set; }
        public bool Rfc { get; set; }
    }
}