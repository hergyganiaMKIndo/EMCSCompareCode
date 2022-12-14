namespace App.Data.Domain
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;
	using System.Data.Entity.Spatial;

	[Table("imex.SurveyDetail")]
	public partial class SurveyDetail
	{
		[Key]
		public int SurveyDetailID { get; set; }

		public int SurveyID { get; set; }

		public int PartsOrderDetailID { get; set; }

		public byte Status { get; set; }

		public DateTime EntryDate { get; set; }

		public DateTime ModifiedDate { get; set; }

		[Required]
		[StringLength(30)]
		public string EntryBy { get; set; }

		[Required]
		[StringLength(30)]
		public string ModifiedBy { get; set; }

		[Column(TypeName = "date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime? EntryDate_Date { get; set; }

		[Column(TypeName = "date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime? ModifiedDate_Date { get; set; }
	}
}
