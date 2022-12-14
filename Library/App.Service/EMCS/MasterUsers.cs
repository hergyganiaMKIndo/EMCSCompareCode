﻿using App.Data.Caching;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;

namespace App.Service.EMCS
{

    /// <summary>
    /// User Access data.
    /// </summary>                
    public class MasterUsers
    {
        public const string CacheName = "App.EMCS.MasterUsers";

        public readonly static ICacheManager CacheManager = new MemoryCacheManager();

        /// <summary>
        /// Get List from Shipment inbound data
        /// </summary>
        /// <returns></returns>
        public static List<Data.Domain.MasterUsers> GetListFilter(string keySearch)
        {
            using (var db = new Data.RepositoryFactory(new Data.DTSContext()))
            {
                db.DbContext.Database.CommandTimeout = 600;
                List<SqlParameter> parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@key", keySearch == null ? "" : keySearch));

                SqlParameter[] parameters = parameterList.ToArray();

                // ReSharper disable once CoVariantArrayConversion
                var data = db.DbContext.Database.SqlQuery<Data.Domain.MasterUsers>
                    (@"exec [dbo].[SP_GetUserAccess] @key", parameters).ToList();

                return data;
            }
        }
    }
}
