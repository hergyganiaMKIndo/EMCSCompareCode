﻿using App.Data.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using App.Domain;
using System.Data.SqlClient;
using App.Data.Domain.EMCS;
using System.Text.RegularExpressions;
using System.Dynamic;

namespace App.Service.EMCS
{

    /// <summary>
    /// Services Proses Shipment inbound.</summary>                
    public class SvcNpePeb
    {
        public const string CacheName = "App.EMCS.NpePeb";

        public readonly static ICacheManager CacheManager = new MemoryCacheManager();

        public static Data.Domain.EMCS.NpePeb GetById(long id)
        {
            using (var db = new Data.EmcsContext())
            {
                var data = db.NpePebs.Where(a => a.IdCl == id && a.IsDelete == false && a.IsCancelled != 2).FirstOrDefault();
                return data;
            }
        }
        public static List<Data.Domain.EMCS.NpePeb> GetDataByIdForList(long id)
        {
            using (var db = new Data.EmcsContext())
            {
                var data = db.NpePebs.Where(a => a.IdCl == id && a.IsDelete == false && a.IsCancelled != 2).ToList();
                return data;
            }
        }
        public static Data.Domain.EMCS.NpePeb GetByIdNpePeb(long id)
        {
            using (var db = new Data.EmcsContext())
            {
                var data = db.NpePebs.Where(a => a.Id == id && a.IsDelete == false && a.IsCancelled != 2).FirstOrDefault();
                return data;
            }
        }
        public static List<Data.Domain.UserAccess_Role> GetListUserRoles(string userId)
        {
            using (var db = new Data.EfDbContext())
            {
                var tb = db.UserAccess_Role.Where(c => c.UserID == userId).ToList();
                return tb;
            }
        }
        public static Data.Domain.EMCS.RequestCl GetStatusById(long id)
        {
            try
            {
                using (var db = new Data.EmcsContext())
                {
                    var IdCl = Convert.ToString(id);
                    var requestCl = db.RequestCl.Where(a => a.IdCl == IdCl && a.IsDelete == false).FirstOrDefault();
                    return requestCl;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public static dynamic NpePebList(GridListFilter crit)
        {
            try
            {
                using (var db = new Data.EmcsContext())
                {
                    string Term = "";
                    string Order = "";
                    crit.Sort = crit.Sort ?? "Id";
                    db.Database.CommandTimeout = 600;

                    if (crit.Term != null)
                    {
                        Term = Regex.Replace(crit.Term, @"[^0-9a-zA-Z]+", "");
                    }

                    if (crit.Order != null)
                    {
                        Order = Regex.Replace(crit.Order, @"[^0-9a-zA-Z]+", "");
                    }


                    var sql = @"[dbo].[sp_get_npepeb_list] @Username='" + SiteConfiguration.UserName + "', @Search = '" + crit.Term + "' ";
                    var count = db.Database.SqlQuery<CountData>(sql + ", @isTotal=1").FirstOrDefault();
                    var data = db.Database.SqlQuery<SPNpePeb>(sql + ", @isTotal=0, @sort='" + crit.Sort + "', @order='" + Order + "', @offset='" + crit.Offset + "', @limit='" + crit.Limit + "'").ToList();


                    dynamic result = new ExpandoObject();
                    if (count != null) result.total = count.Total;
                    result.rows = data;
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static Data.Domain.EMCS.ReturnSpInsert InsertNpePeb(Data.Domain.EMCS.NpePeb item, string status)
        {
            using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
            {
                string strNpeDateSubmitToCustomOffice = "";
                if (item.NpeDateSubmitToCustomOffice.HasValue)
                {
                    strNpeDateSubmitToCustomOffice = item.NpeDateSubmitToCustomOffice.Value.ToString();
                }
                db.DbContext.Database.CommandTimeout = 600;
                List<SqlParameter> parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@Id", item.Id));
                parameterList.Add(new SqlParameter("@IdCl", item.IdCl));
                parameterList.Add(new SqlParameter("@AjuNumber", item.AjuNumber ?? ""));
                parameterList.Add(new SqlParameter("@AjuDate", item.AjuDate.ToString()));
                parameterList.Add(new SqlParameter("@NpeNumber", item.NpeNumber ?? ""));
                parameterList.Add(new SqlParameter("@NpeDate", item.NpeDate.ToString()));
                parameterList.Add(new SqlParameter("@Npwp", item.Npwp ?? ""));
                parameterList.Add(new SqlParameter("@ReceiverName", item.ReceiverName ?? ""));
                parameterList.Add(new SqlParameter("@PassPabeanOffice", item.PassPabeanOffice ?? ""));
                parameterList.Add(new SqlParameter("@Dhe", item.Dhe));
                parameterList.Add(new SqlParameter("@PebFob", item.PebFob));
                parameterList.Add(new SqlParameter("@Valuta", item.Valuta ?? ""));
                parameterList.Add(new SqlParameter("@DescriptionPassword", item.DescriptionPassword ?? ""));
                parameterList.Add(new SqlParameter("@DocumentComplete", item.DocumentComplete.ToString()));
                parameterList.Add(new SqlParameter("@Rate", item.Rate));
                parameterList.Add(new SqlParameter("@WarehouseLocation", item.WarehouseLocation ?? ""));
                parameterList.Add(new SqlParameter("@FreightPayment", item.FreightPayment));
                parameterList.Add(new SqlParameter("@InsuranceAmount", item.InsuranceAmount));
                parameterList.Add(new SqlParameter("@Status", status));
                parameterList.Add(new SqlParameter("@DraftPeb", item.DraftPeb));
                parameterList.Add(new SqlParameter("@CreateBy", SiteConfiguration.UserName));
                parameterList.Add(new SqlParameter("@CreateDate", DateTime.Now));
                parameterList.Add(new SqlParameter("@UpdateBy", DBNull.Value));
                parameterList.Add(new SqlParameter("@UpdateDate", ""));
                parameterList.Add(new SqlParameter("@IsDelete", false));
                parameterList.Add(new SqlParameter("@RegistrationNumber", item.RegistrationNumber ?? ""));
                parameterList.Add(new SqlParameter("@NpeDateSubmitToCustomOffice", strNpeDateSubmitToCustomOffice));

                SqlParameter[] parameters = parameterList.ToArray();

                // ReSharper disable once CoVariantArrayConversion
                try
                {
                    var data = db.DbContext.Database.SqlQuery<Data.Domain.EMCS.ReturnSpInsert>(" exec [dbo].[SP_NpePebInsert] @Id, @IdCl, @AjuNumber, @AjuDate, @NpeNumber, @NpeDate, @Npwp, @ReceiverName, @PassPabeanOffice, @Dhe, @PebFob, @Valuta, @DescriptionPassword, @DocumentComplete, @Rate, @WarehouseLocation, @FreightPayment, @InsuranceAmount, @Status, @DraftPeb, @CreateBy, @CreateDate, @UpdateBy, @UpdateDate, @IsDelete, @RegistrationNumber , @NpeDateSubmitToCustomOffice", parameters).FirstOrDefault();
                    return data;
                }
                catch (Exception ex )
                {

                    throw ex;
                }
               
            }
        }

        public static Data.Domain.EMCS.ReturnSpInsert UpdateNpePeb(Data.Domain.EMCS.NpePeb item)
        {
            using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
            {
                string strNpeDateSubmitToCustomOffice = "";
                if (item.NpeDateSubmitToCustomOffice.HasValue)
                {
                    strNpeDateSubmitToCustomOffice = item.NpeDateSubmitToCustomOffice.Value.ToString();
                }
                db.DbContext.Database.CommandTimeout = 600;
                List<SqlParameter> parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@Id", item.Id));
                parameterList.Add(new SqlParameter("@IdCl", item.IdCl));
                parameterList.Add(new SqlParameter("@AjuNumber", item.AjuNumber ?? ""));
                parameterList.Add(new SqlParameter("@AjuDate", item.AjuDate.ToString()));
                parameterList.Add(new SqlParameter("@NpeNumber", item.NpeNumber ?? ""));
                parameterList.Add(new SqlParameter("@NpeDate", item.NpeDate.ToString()));
                parameterList.Add(new SqlParameter("@Npwp", item.Npwp ?? ""));
                parameterList.Add(new SqlParameter("@ReceiverName", item.ReceiverName ?? ""));
                parameterList.Add(new SqlParameter("@PassPabeanOffice", item.PassPabeanOffice ?? ""));
                parameterList.Add(new SqlParameter("@Dhe", item.Dhe));
                parameterList.Add(new SqlParameter("@PebFob", item.PebFob));
                parameterList.Add(new SqlParameter("@Valuta", item.Valuta ?? ""));
                parameterList.Add(new SqlParameter("@DescriptionPassword", item.DescriptionPassword ?? ""));
                parameterList.Add(new SqlParameter("@DocumentComplete", item.DocumentComplete.ToString()));
                parameterList.Add(new SqlParameter("@Rate", item.Rate));
                parameterList.Add(new SqlParameter("@WarehouseLocation", item.WarehouseLocation ?? ""));
                parameterList.Add(new SqlParameter("@FreightPayment", item.FreightPayment));
                parameterList.Add(new SqlParameter("@InsuranceAmount", item.InsuranceAmount));
                parameterList.Add(new SqlParameter("@DraftPeb", item.DraftPeb));
                parameterList.Add(new SqlParameter("@CreateBy", SiteConfiguration.UserName));
                parameterList.Add(new SqlParameter("@CreateDate", DateTime.Now));
                parameterList.Add(new SqlParameter("@UpdateBy", DBNull.Value));
                parameterList.Add(new SqlParameter("@UpdateDate", ""));
                parameterList.Add(new SqlParameter("@IsDelete", false));
                parameterList.Add(new SqlParameter("@RegistrationNumber", item.RegistrationNumber ?? ""));
                parameterList.Add(new SqlParameter("@NpeDateSubmitToCustomOffice", strNpeDateSubmitToCustomOffice));

                SqlParameter[] parameters = parameterList.ToArray();

                try
                {
                    var data = db.DbContext.Database.SqlQuery<Data.Domain.EMCS.ReturnSpInsert>(" exec [dbo].[SP_NpePeb_Update] @Id, @IdCl, @AjuNumber, @AjuDate, @NpeNumber, @NpeDate, @Npwp, @ReceiverName, @PassPabeanOffice, @Dhe, @PebFob, @Valuta, @DescriptionPassword, @DocumentComplete, @Rate, @WarehouseLocation, @FreightPayment, @InsuranceAmount, @DraftPeb, @CreateBy, @CreateDate, @UpdateBy, @UpdateDate, @IsDelete, @RegistrationNumber , @NpeDateSubmitToCustomOffice", parameters).FirstOrDefault();
                    return data;
                }
                catch (Exception ex)
                {

                    throw ex;
                }

            }
        }

        public static long ApprovalNpePeb(Data.Domain.EMCS.NpePeb itm, Data.Domain.EMCS.CiplApprove item, string dml)
        {
            try
            {
                using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
                {
                    db.DbContext.Database.CommandTimeout = 600;
                    var status = item.Status;
                    var actionBy = SiteConfiguration.UserName;
                    var comment = item.Notes ?? "";
                    db.DbContext.Database.ExecuteSqlCommand("exec sp_update_request_cl @IdCl=" + itm.IdCl + ", @Username='" + actionBy + "', @NewStatus='" + status + "', @Notes='" + comment + "'");
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static long CancelNpePeb(Data.Domain.EMCS.NpePeb itm, Data.Domain.EMCS.CiplApprove item, string dml)
        {
            try
            {
                if (itm.IsCancelled == null)
                {
                    using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
                    {
                        db.DbContext.Database.CommandTimeout = 600;
                        var status = item.Status ?? "";
                        var actionBy = SiteConfiguration.UserName;
                        var comment = item.Notes ?? "";
                        db.DbContext.Database.ExecuteSqlCommand("exec sp_update_request_pebcancel @IdCl=" + itm.Id + ", @Username='" + actionBy + "', @NewStatus='" + "CancelRequest" + "', @Notes='" + comment + "', @IsCancelled='" + 4 + "'");
                        return 1;
                    }
                }
                if (itm.IsCancelled == 0)
                {
                    using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
                    {
                        db.DbContext.Database.CommandTimeout = 600;
                        var status = item.Status ?? "";
                        var actionBy = SiteConfiguration.UserName;
                        db.DbContext.Database.ExecuteSqlCommand("exec sp_update_request_pebcancel @IdCl=" + itm.Id + ", @Username='" + actionBy + "', @NewStatus='" + "CancelApproval" + "', @Notes='" + "" + "', @IsCancelled='" + 4 + "'");
                        return 1;
                    }
                }

                else
                {
                    using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
                    {
                        db.DbContext.Database.CommandTimeout = 600;
                        var status = item.Status ?? "";
                        var actionBy = SiteConfiguration.UserName;
                        var comment = item.Notes ?? "";
                        db.DbContext.Database.ExecuteSqlCommand("exec sp_update_request_pebcancel @IdCl=" + itm.Id + ", @Username='" + actionBy + "', @NewStatus='" + "Cancel" + "', @Notes='" + comment + "', @IsCancelled='" + 4 + "'");
                        return 1;
                    }
                }


            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public static long CancelAllNpePeb(Data.Domain.EMCS.NpePeb itm, Data.Domain.EMCS.CiplApprove item, string dml)
        {
            try
            {
                if (item.Status == "CancelRequest")
                {
                    using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
                    {
                        db.DbContext.Database.CommandTimeout = 600;
                        var status = item.Status ?? "";
                        var actionBy = SiteConfiguration.UserName;
                        var comment = item.Notes ?? "";
                        db.DbContext.Database.ExecuteSqlCommand("exec sp_update_request_pebcancel @IdCl=" + item.Id + ", @Username='" + actionBy + "', @NewStatus='" + status + "', @Notes='" + comment + "', @IsCancelled='" + 3 + "'");
                        return 1;
                    }
                }
                else if (item.Status == "CancelApproval")
                {
                    using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
                    {
                        db.DbContext.Database.CommandTimeout = 600;
                        var status = item.Status ?? "";
                        var actionBy = SiteConfiguration.UserName;
                        var comment = item.Notes ?? "";
                        db.DbContext.Database.ExecuteSqlCommand("exec sp_update_request_pebcancel @IdCl=" + item.Id + ", @Username='" + actionBy + "', @NewStatus='" + status + "', @Notes='" + comment + "', @IsCancelled='" + 3 + "'");
                        return 1;
                    }
                }
                else
                {
                    using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
                    {
                        db.DbContext.Database.CommandTimeout = 600;
                        var status = item.Status ?? "";
                        var actionBy = SiteConfiguration.UserName;
                        var comment = item.Notes ?? "";
                        db.DbContext.Database.ExecuteSqlCommand("exec sp_update_request_pebcancel @IdCl=" + item.Id + ", @Username='" + actionBy + "', @NewStatus='" + status + "', @Notes='" + comment + "', @IsCancelled='" + 3 + "'");
                        return 1;
                    }
                }


            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static int Update(Data.Domain.EMCS.NpePeb itm, string dml)
        {
            if (dml == "I")
            {
                itm.CreateBy = SiteConfiguration.UserName;
                itm.CreateDate = DateTime.Now;
            }

            itm.UpdateBy = SiteConfiguration.UserName;
            itm.UpdateDate = DateTime.Now;

            CacheManager.Remove(CacheName);

            using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
            {
                return db.CreateRepository<Data.Domain.EMCS.NpePeb>().CRUD(dml, itm);
            }
        }

        public static Data.Domain.EMCS.RequestCl GetRequestClById(string id)
        {
            using (var db = new Data.EmcsContext())
            {
                var data = db.RequestCl.Where(a => a.IdCl == id);
                return data.FirstOrDefault();
            }
        }

        public static List<Data.Domain.EMCS.Documents> GetDocumentsPebNpe(long idRequest)
        {
            using (var db = new Data.EmcsContext())
            {
                var data = db.Documents.Where(a => a.IdRequest == idRequest && a.Category == "NPE/PEB" && a.IsDelete == false);
                return data.ToList();
            }
        }

        public static long InsertDocument(Data.Domain.EMCS.RequestCl step, string filename, string typeDoc)
        {
            using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
            {
                db.DbContext.Database.CommandTimeout = 600;
                List<SqlParameter> parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@IdRequest", step.IdCl));
                parameterList.Add(new SqlParameter("@Category", "NPE/PEB"));
                parameterList.Add(new SqlParameter("@Status", step.Status));
                parameterList.Add(new SqlParameter("@Step", step.IdStep));
                parameterList.Add(new SqlParameter("@Name", filename));
                parameterList.Add(new SqlParameter("@Tag", typeDoc));
                parameterList.Add(new SqlParameter("@FileName", filename));
                parameterList.Add(new SqlParameter("@Date", DateTime.Now));
                parameterList.Add(new SqlParameter("@CreateBy", SiteConfiguration.UserName));
                parameterList.Add(new SqlParameter("@CreateDate", DateTime.Now));
                parameterList.Add(new SqlParameter("@UpdateBy", DBNull.Value));
                parameterList.Add(new SqlParameter("@UpdateDate", DateTime.Now));
                parameterList.Add(new SqlParameter("@IsDelete", false));

                SqlParameter[] parameters = parameterList.ToArray();
                // ReSharper disable once CoVariantArrayConversion
                db.DbContext.Database.ExecuteSqlCommand(@"[dbo].[sp_insert_document] @IdRequest, @Category, @Status, @Step, @Name, @Tag, @FileName, @Date, @CreateBy, @CreateDate, @UpdateBy, @UpdateDate, @IsDelete", parameters);
                return 1;
            }
        }
        public static bool NpePebHisOwned(long id, string userId)
        {
            using (var db = new Data.EmcsContext())
            {
                var result = false;

                var tb = db.NpePebs.FirstOrDefault(a => a.Id == id && a.CreateBy == userId);
                if (tb != null)
                {
                    result = true;
                }

                return result;
            }
        }
        public static long InsertCancelledDocument(long id, string fileName)
        {
            using (var db = new Data.RepositoryFactory(new Data.EmcsContext()))
            {
                db.DbContext.Database.CommandTimeout = 600;
                List<SqlParameter> parameterList = new List<SqlParameter>();
                parameterList.Add(new SqlParameter("@id", id));
                parameterList.Add(new SqlParameter("@FileName", fileName));

                SqlParameter[] parameters = parameterList.ToArray();
                // ReSharper disable once CoVariantArrayConversion
                db.DbContext.Database.ExecuteSqlCommand(@" exec [dbo].[SP_InsertDocumentCancelled] @id, @FileName", parameters);
                return 1;
            }
        }




    }
}
