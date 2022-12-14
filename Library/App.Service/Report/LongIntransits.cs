﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Data;
using App.Data.Domain;

namespace App.Service.Report
{
    public class LongIntransits
    {
        public static List<RptLongIntransit>  GetList(string groupType, string filterBy, string storeNo, DateTime? startDate, DateTime? endDate,string userId)
        {
            using (var db = new EfDbContext())
            {
                db.Database.CommandTimeout = 600;
                List<SqlParameter> parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@UserId", userId));
                SqlParameter[] parameters = parameterList.ToArray();

                var tbl = db.Database.SqlQuery<Data.Domain.RptLongIntransit>("dbo.spGetReportLongIntransitByUserId @UserId", parameters).AsQueryable();


                if (startDate.HasValue && endDate.HasValue)
                {
                    tbl = tbl.Where(w => w.lint_CreatedOn.Date >= startDate.Value.Date && w.lint_CreatedOn.Date <= endDate.Value.Date);

                }

                if (!string.IsNullOrEmpty(storeNo))
                    tbl = tbl.Where(w => w.lint_StoreNo.Trim() == storeNo.Trim());
                else
                {
                    if (!string.IsNullOrEmpty(filterBy))
                    {
                        var filter = int.Parse(filterBy);
                        tbl = groupType.ToUpper() == "AREA" ? tbl.Where(w => w.lint_AreaID == filter) : tbl.Where(w => w.lint_HubID == filter);
                    }
                }
              return tbl.ToList();
            }
        }

    }
}
