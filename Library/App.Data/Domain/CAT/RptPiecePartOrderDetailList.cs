﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Data.Domain
{
    [Table("CAT.RptPiecePartOrderDetail")]
    public class RptPiecePartOrderDetailList
    {
        public long ID { get; set; }
        public string RefPartNo { get; set; }
        public string PartNo { get; set; }
        public string Model { get; set; }
        public string Prefix { get; set; }
        public string SMCS { get; set; }
        public string Component { get; set; }
        public string MOD { get; set; }
        public string Status { get; set; }
        public string Store { get; set; }
        public string SOS { get; set; }
        public string KAL { get; set; }

        public string UsedSN { get; set; }
        public string EquipmentNo { get; set; }
        public string Customer_Spuly { get; set; }
        public Nullable<DateTime> StoreSuppliedDate { get; set; }
        public string ReconditionedWO { get; set; }
        public string SaleDoc { get; set; }
        public string ReturnDoc { get; set; }
        public string WCSL { get; set; }

        public string PONumber { get; set; }
        public Nullable<DateTime> Schedule { get; set; }
        public string UnitNoSN { get; set; }
        public string SerialNo { get; set; }
        public string Location { get; set; }
        public string Customer { get; set; }
        public string Surplus { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
