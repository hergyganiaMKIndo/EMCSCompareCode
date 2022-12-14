﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using App.Domain;
using App.Web.App_Start;
using System.Web.Script.Serialization;
using App.Web.Models.EMCS;
using System.IO;
using System.Text.RegularExpressions;
using App.Web.Helper;
using App.Web.Models;
using App.Data.Domain;
using App.Data.Domain.EMCS;
using System.ComponentModel;

namespace App.Web.Controllers.EMCS
{
    public partial class EmcsController
    {

        public ErrorHelper _errorHelper = new ErrorHelper();
        // ================================ CIPL LAYOUT ================================
        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead)]
        public ActionResult CiplList()
        {
            ApplicationTitle();
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            string userRoles = User.Identity.GetUserRoles();
            if (userRoles.Contains("EMCSImex") || userRoles.Contains("Administrator") || userRoles.Contains("Imex"))
                ViewBag.IsImexUser = true;
            else
                ViewBag.IsImexUser = false;
            if(User.Identity.Name == "eko.suhartarto")
                ViewBag.IsCKB = true;
            else
                ViewBag.IsCKB = false;


            PaginatorBoot.Remove("SessionTRN");
            return View();
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "CiplList")]
        public ActionResult CiplForm()
        {
            ApplicationTitle();
            ViewBag.IsOwned = true;
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            ViewBag.IsApprover = false;
            ViewBag.IsImexUser = false;
            ViewBag.CanRequestForChange = false;
            PaginatorBoot.Remove("SessionTRN");
            return View();
        }

        [HttpGet]
        public ActionResult CiplEdit(long id, bool rfc = false)
        {
            ApplicationTitle();
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            ViewBag.IdCipl = id;
            ViewBag.GroupName = Service.EMCS.SvcUserLog.GetUserDetail().Group == null ? "" : Service.EMCS.SvcUserLog.GetUserDetail().Group;
            PaginatorBoot.Remove("SessionTRN");
            var userId = User.Identity.GetUserId();
            string userRoles = User.Identity.GetUserRoles();
            ViewBag.Id = id;
            ViewBag.IsApprover = false;
            if (Service.EMCS.SvcCipl.CiplHisOwned(id, userId))
                ViewBag.IsOwned = true;
            else
                ViewBag.IsOwned = false;

            if (rfc)
                ViewBag.IsImexUser = true;
            else
                ViewBag.IsImexUser = false;

            if (Service.EMCS.SvcCipl.CheckRequestExists(Convert.ToInt32(id), "CIPL") > 0)
                ViewBag.CanRequestForChange = false;
            else
                ViewBag.CanRequestForChange = true;

            if (Request.UrlReferrer != null)
            {
                if (Request.UrlReferrer.ToString().Contains("EMCS/CiplList"))
                    ViewBag.IsApprover = false;
                else if (!Service.EMCS.SvcCipl.CiplHisOwned(id, userId) && (userRoles.Contains("EMCSImex") || userRoles.Contains("Imex")))
                    ViewBag.IsApprover = true;
            }
          

            return View();

        }

        [HttpGet]
        public ActionResult CiplView(long id)
        {
            ApplicationTitle();
            string strQrCodeUrlEDI = Common.GenerateQrCode(id, "downloadedi");
            ViewBag.QrCodeUrlEDI = strQrCodeUrlEDI;
            TempData["QrCodeUrlEDI"] = strQrCodeUrlEDI;
            TempData.Peek("QrCodeUrlEDI");
            string strQrCodeUrlInvoice = Common.GenerateQrCode(id, "downloadInvoice");
            ViewBag.QrCodeUrlInvoice = strQrCodeUrlInvoice;
            TempData["QrCodeUrlInvoice"] = strQrCodeUrlInvoice;
            TempData.Peek("QrCodeUrlInvoice");
            string strQrCodeUrlPL = Common.GenerateQrCode(id, "DownloadPl");
            ViewBag.QrCodeUrlPL = strQrCodeUrlPL;
            TempData["QrCodeUrlPL"] = strQrCodeUrlPL;
            TempData.Peek("QrCodeUrlPL");
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            ViewBag.WizardData = Service.EMCS.SvcWizard.GetWizardData("cipl", id);
            ViewBag.GroupName = Service.EMCS.SvcUserLog.GetUserDetail().Group == null ? "" : Service.EMCS.SvcUserLog.GetUserDetail().Group;
            ViewBag.StepId = Service.EMCS.SvcCipl.GetCiplNextStepGetById(id);
            ViewBag.StepCargoId = Service.EMCS.SvcCipl.GetCiplCargoStepGetById(id);
            ViewBag.FlowCargoId = Service.EMCS.SvcCipl.GetCiplCargoFlowGetById(id);
            var detail = new CiplModel();
            detail.Data = Service.EMCS.SvcCipl.CiplGetById(id);
            detail.Forwarder = Service.EMCS.SvcCipl.CiplForwaderGetById(id);
            MasterSearchForm crit = new MasterSearchForm();
            var subcon = Service.EMCS.SvcGeneral.GetSubconList(crit);
            for (int i = 0; i < subcon.Count; i++)
            {
                if (subcon[i].Value == detail.Forwarder.SubconCompany)
                {
                    detail.Forwarder.SubconCompany = subcon[i].Name;
                    break;
                }
            }
            var vendor = Service.EMCS.SvcGeneral.GetLatestVendorList(crit);
            for (int i = 0; i < vendor.Count; i++)
            {
                if (vendor[i].Code == detail.Forwarder.Vendor)
                {
                    detail.Forwarder.Vendor = vendor[i].Name;
                    break;
                }
            }
            detail.DataItem = Service.EMCS.SvcCipl.CiplItemGetById(id);
            detail.TemplateHeader = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlHeaderData(id);
            detail.TemplateDetail = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlDetailData(id);
            detail.DataRequest = Service.EMCS.SvcRequestCipl.GetRequestById(id);
            detail.TemplateHeader.Category = detail.Data.Category;
            List<string> items = new List<string>();
            foreach (var item in detail.DataItem.GroupBy(a => a.ReferenceNo))
            {
                items.Add(item.Key);
            }

            var detailTotalData = Service.EMCS.SvcTotalCipl.GetById(id);
            ViewBag.Quantity = detailTotalData.TotalPackage;
            ViewBag.Collies = detailTotalData.TotalPackage;
            ViewBag.grossWeight = detailTotalData.TotalGrossWeight;
            ViewBag.netWeight = detailTotalData.TotalNetWeight;
            ViewBag.volume = detailTotalData.TotalVolume;
            ViewBag.refs = string.Join(",", items);
            ViewBag.Currency = detail.Data.Currency;
            ViewBag.IdCust = detail.DataItem.Count != 0 ? detail.DataItem.FirstOrDefault()?.IdCustomer : "";


            String referencesNo = "";
            if (detail.Data.CategoriItem == "PRA")
            {
                foreach (var item in detail.DataItem.GroupBy(a => a.ReferenceNo))
                {
                    if (! referencesNo.Contains(item.Key)) { 
                        if (referencesNo.Length > 0)
                        {
                            referencesNo += ",<br/>";
                        }
                        referencesNo += item.Key;
                    }
                }
            }
            else
            {
                List<string> refIds = new List<string>();
                foreach (var item in detail.DataItem.GroupBy(a => a.IdReference))
                {
                    refIds.Add(item.Key.ToString());
                }
                var references = Service.EMCS.SvcCipl.GetAllReferenceItem(new GridListFilter(), "Id", string.Join(",", refIds), detail.Data.CategoriItem);
                var empty = new List<string>
                {
                    "-", "", " "
                };

                var _counter = 0;
                foreach (var item in references.rows)
                {
                    var _temp = "";
                    if (_counter > 0 || (referencesNo.Length > 0 && referencesNo.Substring(-6) != ",<br/>"))
                    {
                        _temp += ",<br/>";
                    }
                    _counter = 0;
                    if (! empty.Contains(item.ReferenceNo) && referencesNo.IndexOf(item.ReferenceNo) == -1)
                    {
                        _temp += item.ReferenceNo;
                        _counter++;
                    }

                    if (! empty.Contains(item.QuotationNo) && referencesNo.IndexOf(item.QuotationNo) == -1)
                    {
                        if (_counter > 0)
                        {
                            _temp += ", ";
                        }
                        _temp += item.QuotationNo;
                        _counter++;
                    }

                    if (! empty.Contains(item.PoCustomer) && referencesNo.IndexOf(item.PoCustomer) == -1)
                    {
                        if (_counter > 0)
                        {
                            _temp += ", ";
                        }
                        _temp += item.PoCustomer;
                        _counter++;
                    }

                    if (_counter > 0 && ! referencesNo.Contains(_temp))
                    {
                        referencesNo += _temp;
                    }
                }
            }
            ViewBag.referencesNo = referencesNo;

            return View(detail);
        }

        public ActionResult CiplApprove(long id)
        {
            ApplicationTitle();
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            ViewBag.WizardData = Service.EMCS.SvcWizard.GetWizardData("cipl", id);

            
            string strQrCodeUrlEDI = Common.GenerateQrCode(id, "downloadedi");
            ViewBag.QrCodeUrlEDI = strQrCodeUrlEDI;
            TempData["QrCodeUrlEDI"] = strQrCodeUrlEDI;
            TempData.Peek("QrCodeUrlEDI");
            string strQrCodeUrlInvoice = Common.GenerateQrCode(id, "downloadInvoice");
            ViewBag.QrCodeUrlInvoice = strQrCodeUrlInvoice;
            TempData["QrCodeUrlInvoice"] = strQrCodeUrlInvoice;
            TempData.Peek("QrCodeUrlInvoice");
            string strQrCodeUrlPL = Common.GenerateQrCode(id, "DownloadPl");
            ViewBag.QrCodeUrlPL = strQrCodeUrlPL;
            TempData["QrCodeUrlPL"] = strQrCodeUrlPL;
            TempData.Peek("QrCodeUrlPL");
            PaginatorBoot.Remove("SessionTRN");

            var detail = new CiplModel();
            detail.Data = Service.EMCS.SvcCipl.CiplGetById(id);
            detail.Forwarder = Service.EMCS.SvcCipl.CiplForwaderGetById(id);
            MasterSearchForm crit = new MasterSearchForm();
            var subcon = Service.EMCS.SvcGeneral.GetSubconList(crit);
            for (int i = 0; i < subcon.Count; i++)
            {
                if (subcon[i].Value == detail.Forwarder.SubconCompany)
                {
                    detail.Forwarder.SubconCompany = subcon[i].Name;
                }
            }
            var vendor = Service.EMCS.SvcGeneral.GetVendorList(crit);
            for (int i = 0; i < vendor.Count; i++)
            {
                if (vendor[i].Code == detail.Forwarder.Vendor)
                {
                    detail.Forwarder.Vendor = vendor[i].Name;
                }
            }
            detail.DataItem = Service.EMCS.SvcCipl.CiplItemGetById(id);
            detail.TemplateHeader = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlHeaderData(id);
            detail.TemplateDetail = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlDetailData(id);
            detail.DataRequest = Service.EMCS.SvcRequestCipl.GetRequestById(id);

            List<string> items = new List<string>();
            foreach (var item in detail.DataItem.GroupBy(a => a.ReferenceNo))
            {
                items.Add(item.Key);
            }

            var detailTotalData = Service.EMCS.SvcTotalCipl.GetById(id);
            ViewBag.Quantity = detailTotalData.TotalPackage;
            ViewBag.Collies = detailTotalData.TotalPackage;
            ViewBag.grossWeight = detailTotalData.TotalGrossWeight;
            ViewBag.netWeight = detailTotalData.TotalNetWeight;
            ViewBag.volume = detailTotalData.TotalVolume;
            ViewBag.refs = string.Join(",", items);
            ViewBag.Currency = detail.Data.Currency;
            ViewBag.IdCust = detail.DataItem.Count != 0 ? detail.DataItem.FirstOrDefault()?.IdCustomer : "";
            
            return View(detail);
        }

        public ActionResult CiplCancel(long id)
        {
            ApplicationTitle();
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            ViewBag.WizardData = Service.EMCS.SvcWizard.GetWizardData("cipl", id);
            PaginatorBoot.Remove("SessionTRN");

            var detail = new CiplModel();
            detail.Data = Service.EMCS.SvcCipl.CiplGetById(id);
            detail.Forwarder = Service.EMCS.SvcCipl.CiplForwaderGetById(id);
            detail.DataItem = Service.EMCS.SvcCipl.CiplItemGetById(id);
            detail.TemplateHeader = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlHeaderData(id);
            detail.TemplateDetail = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlDetailData(id);
            detail.DataRequest = Service.EMCS.SvcRequestCipl.GetRequestById(id);

            var items = new List<string>();
            foreach (var item in detail.DataItem.GroupBy(a => a.ReferenceNo))
            {
                items.Add(item.Key);
            }

            decimal volume = 0;
            decimal netWeight = 0;
            decimal grossWeight = 0;

            foreach (var itm in detail.DataItem)
            {
                decimal subtotal;
                decimal length = itm.Length.HasValue ? itm.Length.Value : 0;
                decimal width = itm.Width.HasValue ? itm.Width.Value : 0;
                decimal height = itm.Height.HasValue ? itm.Height.Value : 0;
                subtotal = length * width * height;
                volume = +subtotal;

                var net = itm.NetWeight.HasValue ? itm.NetWeight.Value : 0;
                var gross = itm.GrossWeight.HasValue ? itm.GrossWeight.Value : 0;
                netWeight = +net;
                grossWeight = +gross;
            }

            ViewBag.Quantity = detail.DataItem.Sum(a => a.Quantity);
            ViewBag.Collies = detail.DataItem.GroupBy(a => a.CaseNumber).Count();
            ViewBag.grossWeight = grossWeight;
            ViewBag.netWeight = netWeight;
            ViewBag.volume = volume;
            ViewBag.refs = string.Join(",", items);
            ViewBag.Currency = detail.DataItem.Count != 0 ? detail.DataItem.FirstOrDefault()?.Currency : "";
            ViewBag.IdCust = detail.DataItem.Count != 0 ? detail.DataItem.FirstOrDefault()?.IdCustomer : "";

            return View(detail);
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "CiplList")]
        public ActionResult CiplListPage()
        {
            this.PaginatorBoot.Remove("SessionTRN");
            return CiplListPageXt();
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "CiplList")]
        public ActionResult CiplListPageXt()
        {
            Func<App.Data.Domain.EMCS.CiplListFilter, List<Data.Domain.EMCS.SpCiplList>> func = delegate (App.Data.Domain.EMCS.CiplListFilter filter)
            {
                var param = Request.Params["SearchName"];

                filter.ConsigneeName = param;
                var list = Service.EMCS.SvcCipl.CiplList(filter);
                return list.ToList();
            };

            var paging = PaginatorBoot.Manage("SessionTRN", func).Pagination.ToJsonResult();
            return Json(paging, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CiplHistoryPage(long id)
        {
            this.PaginatorBoot.Remove("SessionTRN");
            return CiplHistoryPageXt(id);
        }

        public JsonResult GetProblemHistoryList(string idTerm, string search, int limit, int offset, string sort, string order)
        {
            var dataFilter = new Data.Domain.EMCS.GridListFilter();
            dataFilter.Sort = sort;
            dataFilter.Order = order;
            dataFilter.Offset = offset;
            dataFilter.Limit = limit;
            dataFilter.Term = idTerm;
            var data = Service.EMCS.SvcProblemHistory.GetListSp(dataFilter);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHistoryList(string idTerm, string search, int limit, int offset, string sort, string order)
        {
            var dataFilter = new Data.Domain.EMCS.GridListFilter();
            dataFilter.Sort = sort;
            dataFilter.Order = order;
            dataFilter.Offset = offset;
            dataFilter.Limit = limit;
            dataFilter.Term = idTerm;
            var data = Service.EMCS.SvcCipl.GetListSp(dataFilter);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetChangeHistoryList(string idTerm, string formType, string search, int limit, int offset, string sort, string order)
        {
            var dataFilter = new Data.Domain.EMCS.GridListFilter();
            dataFilter.Sort = sort;
            dataFilter.Order = order;
            dataFilter.Offset = offset;
            dataFilter.Limit = limit;
            dataFilter.Term = idTerm;
            dataFilter.FormType = formType;
            var data = Service.EMCS.SvcCipl.GetListSpRequestForChangeDetails(dataFilter);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        

        public JsonResult GetListSpRequestForChangeByFormType(string idTerm, string formType, string search, int limit, int offset, string sort, string order)
        {
            var dataFilter = new Data.Domain.EMCS.GridListFilter();
            dataFilter.Sort = sort;
            dataFilter.Order = order;
            dataFilter.Offset = offset;
            dataFilter.Limit = limit;
            dataFilter.Term = idTerm;
            dataFilter.FormType = formType;
            var data = Service.EMCS.SvcCipl.GetListSpRequestForChangeByFormType(dataFilter);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRequestForChangeList(GridListFilter filter)
        {
            var data = Service.EMCS.SvcCipl.GetRequestForChangeList(filter);
            var total = Service.EMCS.SvcRequestCl.GetRFCTotalList(filter);
            return Json(new { total, rows = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetChangeHistoryReason(string idTerm, string formtype)
        {
            var data = Service.EMCS.SvcCipl.GetSpChangeHistoryReason(idTerm, formtype);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckRequestExists(int idTerm, string formtype)
        {
            var data = Service.EMCS.SvcCipl.CheckRequestNotApproved(idTerm, formtype);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult ApproveChangeHistory(string idTerm, string formId, string formtype)
        {
            try
            {
                var data = Service.EMCS.SvcCipl.GetRequestForChangeDataList(idTerm);

                var cipl = Service.EMCS.SvcCipl.CiplGetById(Convert.ToInt32(formId));

                var forwader = Service.EMCS.SvcCipl.CiplForwaderGetById(Convert.ToInt32(formId));

                var ciplHistory = data.Where(x => x.TableName == typeof(Cipl).Name).ToList();

                var forwaderHistory = data.Where(x => x.TableName == typeof(CiplForwader).Name).ToList();

                var properties = TypeDescriptor.GetProperties(typeof(Cipl));

                string[] _ignoreParameters = { "Id", "CiplNo", "ClNo", "EdoNo", "IdCipl" };

                foreach (PropertyDescriptor property in properties)
                {
                    if (!_ignoreParameters.Contains(property.Name))
                    {
                        var historyProp = ciplHistory.Where(x => x.FieldName == property.Name).FirstOrDefault();
                        if (historyProp != null)
                        {
                            System.TypeCode typeCode = System.Type.GetTypeCode(property.PropertyType);
                            switch (typeCode)
                            {
                                case TypeCode.Boolean:
                                    property.SetValue(cipl, Convert.ToBoolean(historyProp.AfterValue));
                                    break;
                                case TypeCode.String:
                                    property.SetValue(cipl, Convert.ToString(historyProp.AfterValue));
                                    break;
                                case TypeCode.Char:
                                    property.SetValue(cipl, Convert.ToChar(historyProp.AfterValue));
                                    break;
                                case TypeCode.Double:
                                    property.SetValue(cipl, Convert.ToDouble(historyProp.AfterValue));
                                    break;
                                case TypeCode.Single:
                                    property.SetValue(cipl, Convert.ToSingle(historyProp.AfterValue));
                                    break;
                                case TypeCode.Int32:
                                    property.SetValue(cipl, Convert.ToInt32(historyProp.AfterValue));
                                    break;
                                case TypeCode.Int16:
                                    property.SetValue(cipl, Convert.ToInt16(historyProp.AfterValue));
                                    break;
                                case TypeCode.DateTime:
                                    property.SetValue(cipl, Convert.ToDateTime(historyProp.AfterValue));
                                    break;
                                case TypeCode.Decimal:
                                    property.SetValue(cipl, Convert.ToDecimal(historyProp.AfterValue));
                                    break;
                                case TypeCode.Object:
                                    //property.SetValue(cipl, Convert.toobj(historyProp.AfterValue));
                                    break;
                                default:
                                    property.SetValue(cipl, historyProp.AfterValue);
                                    break;
                            }

                        }
                    }
                }

                var propertiesCiplForwader = TypeDescriptor.GetProperties(typeof(CiplForwader));

                foreach (PropertyDescriptor property in propertiesCiplForwader)
                {
                    if (!_ignoreParameters.Contains(property.Name))
                    {
                        var historyProp = forwaderHistory.Where(x => x.FieldName == property.Name).FirstOrDefault();
                        if (historyProp != null)
                        {
                            System.TypeCode typeCode = System.Type.GetTypeCode(property.PropertyType);
                            switch (typeCode)
                            {
                                case TypeCode.Boolean:
                                    property.SetValue(forwader, Convert.ToBoolean(historyProp.AfterValue));
                                    break;
                                case TypeCode.String:
                                    property.SetValue(forwader, Convert.ToString(historyProp.AfterValue));
                                    break;
                                case TypeCode.Char:
                                    property.SetValue(forwader, Convert.ToChar(historyProp.AfterValue));
                                    break;
                                case TypeCode.Double:
                                    property.SetValue(forwader, Convert.ToDouble(historyProp.AfterValue));
                                    break;
                                case TypeCode.Single:
                                    property.SetValue(forwader, Convert.ToSingle(historyProp.AfterValue));
                                    break;
                                case TypeCode.Int32:
                                    property.SetValue(forwader, Convert.ToInt32(historyProp.AfterValue));
                                    break;
                                case TypeCode.Int16:
                                    property.SetValue(forwader, Convert.ToInt16(historyProp.AfterValue));
                                    break;
                                case TypeCode.DateTime:
                                    property.SetValue(forwader, Convert.ToDateTime(historyProp.AfterValue));
                                    break;
                                case TypeCode.Decimal:
                                    property.SetValue(forwader, Convert.ToDecimal(historyProp.AfterValue));
                                    break;
                                case TypeCode.Object:
                                    //property.SetValue(cipl, Convert.toobj(historyProp.AfterValue));
                                    break;
                                default:
                                    property.SetValue(forwader, historyProp.AfterValue);
                                    break;
                            }
                        }
                    }
                }
                Service.EMCS.SvcCipl.CiplItemChange(formId);
                Service.EMCS.SvcCipl.ApproveRequestForChangeHistory(Convert.ToInt32(idTerm));

                Service.EMCS.SvcCipl.UpdateCiplByApprover(forwader, cipl, "");
                var userId = User.Identity.GetUserId();
                //if (Service.EMCS.SvcCipl.CiplHisOwned(cipl.Id, userId) || User.Identity.GetUserRoles().Contains("EMCSImex"))
                //{
                //    Service.EMCS.SvcCipl.UpdateCipl(forwader, cipl, "");
                //}
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                _errorHelper.Error(ex.ToString());
                throw ex;
            }
        }
        public ActionResult CiplHistoryPageXt(long id)
        {
            Func<App.Data.Domain.EMCS.CiplListFilter, List<Data.Domain.EMCS.SpGetCiplHistory>> func = delegate (App.Data.Domain.EMCS.CiplListFilter filter)
            {
                if (filter == null) throw new ArgumentNullException(nameof(filter));
                var param = Request["params"];
                if (!string.IsNullOrEmpty(param))
                {
                    JavaScriptSerializer ser = new JavaScriptSerializer();
                    ser.Deserialize<App.Data.Domain.EMCS.CiplListFilter>(param);
                }
                var list = Service.EMCS.SvcCipl.CiplHistoryGetById(id);
                return list.ToList();
            };

            var paging = PaginatorBoot.Manage("SessionTRN", func).Pagination.ToJsonResult();
            return Json(paging, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CiplDocumentsPage(long id)
        {
            this.PaginatorBoot.Remove("SessionTRN");
            return CiplDocumentsPageXt(id);
        }

        public ActionResult CiplDocumentsPageXt(long id)
        {
            Func<App.Data.Domain.EMCS.CiplListFilter, List<Data.Domain.EMCS.Documents>> func = delegate (App.Data.Domain.EMCS.CiplListFilter filter)
            {
                if (filter == null) throw new ArgumentNullException(nameof(filter));
                var param = Request["params"];
                if (!string.IsNullOrEmpty(param))
                {
                    JavaScriptSerializer ser = new JavaScriptSerializer();
                    ser.Deserialize<App.Data.Domain.EMCS.CiplListFilter>(param);
                }
                var list = Service.EMCS.SvcCipl.CiplDocumentsGetById(id);
                return list.ToList();
            };

            var paging = PaginatorBoot.Manage("SessionTRN", func).Pagination.ToJsonResult();
            return Json(paging, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CiplProblemHistoryPage(long id)
        {
            this.PaginatorBoot.Remove("SessionTRN");
            return CiplProblemHistoryPageXt(id);
        }

        public ActionResult CiplProblemHistoryPageXt(long id)
        {
            Func<App.Data.Domain.EMCS.CiplListFilter, List<Data.Domain.EMCS.SpCiplProblemHistory>> func = delegate (App.Data.Domain.EMCS.CiplListFilter filter)
            {
                if (filter == null) throw new ArgumentNullException(nameof(filter));
                var param = Request["params"];
                if (!string.IsNullOrEmpty(param))
                {
                    JavaScriptSerializer ser = new JavaScriptSerializer();
                    ser.Deserialize<App.Data.Domain.EMCS.CiplListFilter>(param);
                }
                var list = Service.EMCS.SvcCipl.SP_CiplProblemHistory(id);
                return list.ToList();
            };

            var paging = PaginatorBoot.Manage("SessionTRN", func).Pagination.ToJsonResult();
            return Json(paging, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetSelectItemCipl(MasterSearchForm crit)
        {
            var category = Service.EMCS.MasterParameter.GetSelectList("Category");
            var categoryunit = Service.EMCS.MasterParameter.GetSelectList("CategoryUnit");
            var categoryspareparts = Service.EMCS.MasterParameter.GetSelectList("CategorySpareparts");
            var soldconsignee = Service.EMCS.MasterParameter.GetParamByGroup("SoldConsignee");
            var shipdelivery = Service.EMCS.MasterParameter.GetParamByGroup("ShipDelivery");
            var exporttype = Service.EMCS.MasterParameter.GetParamByGroup("ExportType");
            var exportremarks = Service.EMCS.MasterParameter.GetParamByGroup("ExportRemarks");
            var paymentterms = Service.EMCS.MasterParameter.GetSelectList2("PaymentTerms");
            var uomtypes = Service.EMCS.MasterParameter.GetParamByGroup("UOMType");
            var incoterms = Service.EMCS.MasterIncoterms.GetList(crit);
            var packagingtype = Service.EMCS.MasterParameter.GetSelectList("PackagingType");
            var subcon = Service.EMCS.SvcGeneral.GetSubconList(crit);
            var vendor = Service.EMCS.SvcGeneral.GetVendorList(crit);
            var shippingmethod = Service.EMCS.MasterParameter.GetSelectList("ShippingMethod");
            var freightpayment = Service.EMCS.MasterParameter.GetSelectList("FreightPayment");
            var forwader = Service.EMCS.MasterParameter.GetSelectList("Forwader");
            var type = Service.EMCS.SvcCipl.GetTypeSelectList();
            var country = Service.EMCS.SvcCipl.GetCountryList();
            var branch = Service.EMCS.SvcCipl.GetBranchList();
            var kurs = Service.EMCS.SvcCipl.GetLastestKurs();
            var currency = Service.EMCS.SvcCipl.GetCurrencyCipl();
            var categoryreference = Service.EMCS.SvcCipl.GetCategoryReferencet("CategoryReference");

            return Json(new { exporttype, category, categoryunit, categoryspareparts, soldconsignee, subcon, vendor, shipdelivery, incoterms, packagingtype, exportremarks, paymentterms, uomtypes, shippingmethod, freightpayment, forwader, country, branch, kurs, currency, categoryreference, type }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public  ActionResult SaveHistoryAndApprove(RequestForChangeModel form, CiplFormModel item, Data.Domain.EMCS.CiplApprove ciplApprove)
        {
            try
            {
                _errorHelper.Error("SaveChangeHistory - Method call started");
                var requestForChange = new RequestForChange();

                requestForChange.FormNo = item.Data.CiplNo;
                requestForChange.FormType = form.FormType;
                requestForChange.Status = form.Status;
                requestForChange.FormId = form.FormId;
                requestForChange.Reason = form.Reason;
                int id = 0;
                id = Service.EMCS.SvcCipl.InsertChangeHistory(requestForChange);

                var model = Service.EMCS.SvcCipl.CiplGetById(item.Data.Id);
                var forwader = Service.EMCS.SvcCipl.CiplForwaderGetById(item.Data.Id);

                var newmodel = new CiplFormModel();           
                newmodel.Data = model;
                newmodel.Forwader = forwader;

                var listRfcItems = new List<Data.Domain.RFCItem>();
                string[] _ignnoreParameters = { "Id", "CiplNo", "ClNo", "EdoNo", "IdCipl" };
                var properties = TypeDescriptor.GetProperties(typeof(Cipl));
                foreach (PropertyDescriptor property in properties)
                {
                    if (!_ignnoreParameters.Contains(property.Name))
                    {
                        var currentValue = property.GetValue(item.Data);
                        if (currentValue != null && property.GetValue(model) != null)
                        {
                            if (currentValue.ToString() != property.GetValue(model).ToString())
                            {
                                var rfcItem = new Data.Domain.RFCItem();

                                rfcItem.RFCID = id;
                                rfcItem.TableName = "Cipl";
                                rfcItem.LableName = property.Name;
                                rfcItem.FieldName = property.Name;
                                rfcItem.BeforeValue = property.GetValue(model).ToString();
                                rfcItem.AfterValue = currentValue.ToString();
                                listRfcItems.Add(rfcItem);
                            }
                        }
                    }
                }

                var propertiesForwader = TypeDescriptor.GetProperties(typeof(CiplForwader));
                foreach (PropertyDescriptor property in propertiesForwader)
                {
                    if (!_ignnoreParameters.Contains(property.Name))
                    {
                        var currentValueForwader = property.GetValue(item.Forwader);
                        if (currentValueForwader != null && property.GetValue(forwader) != null)
                        {
                            if (currentValueForwader.ToString() != property.GetValue(forwader).ToString())
                            {
                                var rfcItem = new Data.Domain.RFCItem();

                                rfcItem.RFCID = id;
                                rfcItem.TableName = "CiplForwader";
                                rfcItem.LableName = property.Name;
                                rfcItem.FieldName = property.Name;
                                rfcItem.BeforeValue = property.GetValue(forwader).ToString();
                                rfcItem.AfterValue = currentValueForwader.ToString();
                                listRfcItems.Add(rfcItem);
                            }
                        }
                    }
                }

                Service.EMCS.SvcCipl.InsertRFCItem(listRfcItems);
             

                var result = Service.EMCS.SvcCipl.UpdateCiplByApprover(item.Forwader, item.Data, "Draft");
                if (result == 1)
                {
                    var cipl = Service.EMCS.SvcCipl.CiplGetById(ciplApprove.Id);
                    Service.EMCS.SvcCipl.CrudSp(cipl, ciplApprove, "U");
                }
                //Service.EMCS.SvcCipl.CrudSp(model, ciplApprove, "U");

                return Json("");
            }
            catch (Exception ex)
            {
                _errorHelper.Error(ex.ToString());
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult SaveChangeHistory(RequestForChangeModel form, CiplFormModel item)
        {
            try
            {

                _errorHelper.Error("SaveChangeHistory - Method call started");
                var requestForChange = new RequestForChange();

                requestForChange.FormNo = item.Data.CiplNo;
                requestForChange.FormType = form.FormType;
                requestForChange.Status = form.Status;
                requestForChange.FormId = form.FormId;
                requestForChange.Reason = form.Reason;
                int id = 0;
                if (form.Status == 1) //already approved just save history
                {
                    _errorHelper.Error("SaveChangeHistory - status 1");
                    id = Service.EMCS.SvcCipl.InsertChangeHistory(requestForChange);
                }
                else
                {
                    id = Service.EMCS.SvcCipl.InsertRequestChangeHistory(requestForChange);
                }
                if (id > 0)
                {
                    _errorHelper.Error("SaveChangeHistory - id found" + id.ToString());
                }
                var model = Service.EMCS.SvcCipl.CiplGetByIdForRFC(item.Data.Id);
                var forwader = Service.EMCS.SvcCipl.CiplForwaderGetById(item.Data.Id);

                var newmodel = new CiplFormModel();
                //if (model != null)
                //{
                //    var PicUpPic = model.PickUpPic.Split('-');
                //    model.PickUpPic = PicUpPic[0];
                //}
                newmodel.Data = model;
                newmodel.Forwader = forwader;

                var listRfcItems = new List<Data.Domain.RFCItem>();
                string[] _ignnoreParameters = { "Id", "CiplNo", "ClNo", "EdoNo", "IdCipl", "LcNoDate", "CreateDate", "NotifyPartySameConsignee" };
                var properties = TypeDescriptor.GetProperties(typeof(Cipl));
                foreach (PropertyDescriptor property in properties)
                {
                    if (!_ignnoreParameters.Contains(property.Name))
                    {
                        var currentValue = property.GetValue(item.Data);
                        if (currentValue != null && property.GetValue(model) != null)
                        {
                            //Special cases
                            #region SpecialCase
                            if (property.Name == "Rate")
                            {
                                currentValue = currentValue.ToString() + ".00";
                            }
                            #endregion
                            if (currentValue.ToString() != property.GetValue(model).ToString())
                            {
                                var rfcItem = new Data.Domain.RFCItem();

                                rfcItem.RFCID = id;
                                rfcItem.TableName = "Cipl";
                                rfcItem.LableName = property.Name;
                                rfcItem.FieldName = property.Name;
                                rfcItem.BeforeValue = property.GetValue(model).ToString();
                                rfcItem.AfterValue = currentValue.ToString();
                                listRfcItems.Add(rfcItem);
                            }
                        }
                    }
                }

                var propertiesForwader = TypeDescriptor.GetProperties(typeof(CiplForwader));
                foreach (PropertyDescriptor property in propertiesForwader)
                {
                    if (!_ignnoreParameters.Contains(property.Name))
                    {
                        var currentValueForwader = property.GetValue(item.Forwader);
                        if (currentValueForwader != null && property.GetValue(forwader) != null)
                        {
                            if (currentValueForwader.ToString() != property.GetValue(forwader).ToString())
                            {
                                var rfcItem = new Data.Domain.RFCItem();

                                rfcItem.RFCID = id;
                                rfcItem.TableName = "CiplForwader";
                                rfcItem.LableName = property.Name;
                                rfcItem.FieldName = property.Name;
                                rfcItem.BeforeValue = property.GetValue(forwader).ToString();
                                rfcItem.AfterValue = currentValueForwader.ToString();
                                listRfcItems.Add(rfcItem);
                            }
                        }
                    }
                }

                Service.EMCS.SvcCipl.InsertRFCItem(listRfcItems);
                _errorHelper.Error("SaveChangeHistory - RFC Done");
                return Json("");
            }
            catch (Exception ex)
            {
                _errorHelper.Error(ex.ToString());
                throw ex;
            }
        }
        public JsonResult GetPickUpPic(string user, string area)
        {
            var data = Service.EMCS.SvcCipl.GetPickUpPic(user, area);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateQuantityReference(List<Data.Domain.EMCS.CiplItemInsert> item, string status)
        {
            try
            {
                var data = Service.EMCS.SvcCipl.UpdateQuantityReference(item, status);
                return JsonCRUDMessage("U", data);
            }
            catch (Exception err)
            {
                return JsonMessage(err.Message, 1, err);
            }
        }

        [HttpGet]
        public JsonResult GetDataMaster()
        {
            var country = Service.EMCS.SvcCipl.GetCountryList();
            var branch = Service.EMCS.SvcCipl.GetBranchList();
            return Json(new { country, branch }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCustomerForSelect2(MasterSearchForm crit)
        {
            List<App.Data.Domain.EMCS.MasterCustomers> list = Service.EMCS.MasterCustomer.GetList(crit);
            return Json(new { data = list.ToList() }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetCategoryItem(int id)
        {
            string item;
            switch (id)
            {
                case 1:
                    item = "PP";
                    break;
                case 2:
                    item = "SP";
                    break;
                default:
                    item = "UE";
                    break;
            }

            var data = Service.EMCS.SvcCipl.GetCategoryItem(item);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CiplGetById(long id)
        {
            try
            {
                var model = Service.EMCS.SvcCipl.CiplGetById(id);
                var request = Service.EMCS.SvcCipl.GetRequestCiplById(Convert.ToString(id), "");
                var forwader = Service.EMCS.SvcCipl.CiplForwaderGetById(id);
                MasterSearchForm crit = new MasterSearchForm();
                var subcon = Service.EMCS.SvcGeneral.GetSubconList(crit);
                for (int i = 0; i < subcon.Count; i++)
                {
                    if (subcon[i].Value == forwader.SubconCompany)
                    {
                        forwader.SubconCompany = subcon[i].Name;
                        break;
                    }
                }
                var document = Service.EMCS.SvcCipl.CiplDocumentsGetById(id);
                var problem = Service.EMCS.SvcCipl.SP_CiplProblemHistory(id);
                return Json(new { model, forwader, document, problem, request }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return JsonMessage("Error", 1, ex);
            }
        }

        public JsonResult CiplItemGetById(long id)
        {
            var list = Service.EMCS.SvcCipl.CiplItemGetById(id);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CiplItemGetByIdReference(long idReference)
        {
            var list = Service.EMCS.SvcCipl.CiplItemGetByIdReference(idReference);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CiplInsert(CiplFormModel item, string dml, string status)
        {
            try
            {
                var data = Service.EMCS.SvcCipl.InsertCipl(item.Forwader, item.Data, "I", status);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return JsonMessage("Error", 1, ex);
            }
        }

        [HttpPost]
        public bool CiplItemInsert(List<Data.Domain.EMCS.CiplItemInsert> data, string RFC, string Status)
        {
            var id = Service.EMCS.SvcCipl.InsertCiplItem(data, RFC, Status);
            return id;
        }
        public JsonResult GetCiplItemChangeList(GridListFilter filter)
        {
            var data = Service.EMCS.SvcCipl.GetCiplItemList(filter);
            return Json(new { rows = data }, JsonRequestBehavior.AllowGet);
            //   return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CiplItemList(long id)
        {
            var list = Service.EMCS.SvcCipl.CiplItemGetById(id);
            return Json(new { rows = list }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public bool CiplDocumentInsert(List<Data.Domain.EMCS.CiplDocumentInsert> data)
        {
            var id = Service.EMCS.SvcCipl.InsertCiplDocument(data);
            return id;
        }

        [HttpPost]
        public ActionResult CiplDocumentUpload(long id)
        {
            string fileResult = UploadDocumentCipl(id);
            if (fileResult != "")
            {
                var result = Service.EMCS.SvcCipl.UpdateFileCiplDocument(id, fileResult);
                return Json(new { status = true, msg = "Upload File Successfully" });
            }
            else
            {
                return Json(new { status = false, msg = "Upload File gagal" });
            }
        }

        [HttpPost]
        public long CiplDocumentDeleteById(long id)
        {
            id = Service.EMCS.SvcCipl.DeleteCiplDocumentById(id);
            return id;
        }

        [HttpPost]
        public long CiplItemDeleteById(long id, string RFC)
        {
            id = Service.EMCS.SvcCipl.DeleteCiplById(id, RFC, "CIPLITEMID");
            return id;
        }
        [HttpPost]
        public bool CiplItemSplitById(List<Data.Domain.EMCS.CiplItemInsert> data, string RFC, string Status)
        {
            bool id = Service.EMCS.SvcCipl.InsertCiplItem(data, RFC, Status);
            return id;
        }

        [HttpPost]
        public long CiplUpdate(CiplFormModel item, string status)
        {
            long result = 0;
            var userId = User.Identity.GetUserId();
            try
            {
                //if (Service.EMCS.SvcCipl.CiplHisOwned(item.Data.Id, userId))
                //{
                result = Service.EMCS.SvcCipl.UpdateCipl(item.Forwader, item.Data, status);
                //}
                return result;
            }
            catch (Exception ex)
            {
                _errorHelper.Error(ex.ToString());
                throw ex;
            }

        }

        [HttpPost]
        public long ReferenceToCiplItem(List<Data.Domain.EMCS.ReferenceToCiplItem> data, long idCipl)
        {
            long referenceToCiplItem = Service.EMCS.SvcCipl.ReferenceToCiplItem(data, idCipl);
            return referenceToCiplItem;
        }

        [HttpPost]
        public JsonResult CiplItemCancel(long idCipl)
        {
            try
            {
                Service.EMCS.SvcCipl.DeleteCiplById(idCipl, "false", "CIPLITEM");
                return JsonCRUDMessage("Delete Success");
            }
            catch (Exception)
            {
                return JsonCRUDMessage("Delete Error");
            }
        }

        [HttpPost]
        public long DeleteCiplById(long id)
        {
            long result = 0;
            var userId = User.Identity.GetUserId();
            if (Service.EMCS.SvcCipl.CiplHisOwned(id, userId))
            {
                result = Service.EMCS.SvcCipl.DeleteCiplById(id, "false", "ALL");
            }
            return result;

        }

        [HttpPost]
        public ActionResult GetReference(Data.Domain.EMCS.SpGetReference item, string categoryReference)
        {
            var list = Service.EMCS.SvcCipl.GetReference(item, categoryReference);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetReferenceItem(GridListFilterModel filter, string column, string columnValue, string category)
        {
            var dataFilter = new Data.Domain.EMCS.GridListFilter();
            dataFilter.Limit = filter.Limit;
            dataFilter.Order = filter.Order;
            dataFilter.Term = filter.Term;
            dataFilter.Sort = filter.Sort;
            dataFilter.Offset = filter.Offset;

            var data = Service.EMCS.SvcCipl.GetReferenceItem(dataFilter, column, columnValue, category);

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetConsigneeName(string id, string category, string categoryReference)
        {
            List<App.Data.Domain.EMCS.SpGetConsigneeName> list = Service.EMCS.SvcCipl.GetConsigneeName(id, category, categoryReference);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        // ================================ APPROVE ================================
        [HttpPost]
        public JsonResult CiplApproval(Data.Domain.EMCS.CiplApprove form)
        {
            var cipl = Service.EMCS.SvcCipl.CiplGetById(form.Id);
            Service.EMCS.SvcCipl.CrudSp(cipl, form, "U");
            return JsonMessage("This ticket has been " + form.Status, 0, cipl);
        }

        public JsonResult GetCiplAvailable(Data.Domain.EMCS.SpGetCiplAvailable filter)
        {
            var data = Service.EMCS.SvcCipl.GetCiplAvailable(filter);
            return Json(new { data }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UploadDocument(string idCipl, string noCipl, string typeDoc)
        {
            ViewBag.crudMode = "I";
            Data.Domain.EMCS.RequestCipl step = Service.EMCS.SvcCipl.GetRequestCiplById(idCipl, "CIPL");
            if (step.IdCipl != null)
            {
                string fileResult = DocumentCipl(noCipl, typeDoc);
                if (fileResult != "")
                {
                    Service.EMCS.SvcCipl.InsertDocument(step, fileResult, typeDoc);
                }
                else
                {
                    return Json(new { status = false, msg = "Upload File gagal" });
                }
            }

            return JsonCRUDMessage(ViewBag.crudMode);
        }


        public JsonResult DocumentList()
        {
            var data = Service.EMCS.SvcCipl.DocumentList();
            return Json(new { data }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetDocument(Data.Domain.EMCS.Documents crit)
        {
            App.Data.Domain.EMCS.Documents list = Service.EMCS.SvcCipl.GetDocument(crit);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        /// <summary>
        /// Menampilkan List Cipl View dari Cargo.
        /// </summary>
        /// <returns></returns>
        public ActionResult CiplViewList(string page, long id)
        {
            if (page == "rg")
            {
                ViewBag.ListCipl = Service.EMCS.SvcGoodsReceive.GetCiplByGr(id);
            }
            else
            {
                ViewBag.ListCipl = Service.EMCS.SvcCargo.GetCiplbyCargo(id);
            }
            return View();
        }

        public JsonResult GetConsigneeHistory(string term)
        {
            var data = Service.EMCS.SvcCipl.GetConsigneeHistory(term);
            return Json(new { data }, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetUOMHistory(string term)
        //{
        //    var data = Service.EMCS.SvcCipl.GetUOMHistory(term);
        //    return Json(new { data }, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult CiplApproveReviseDimension(long id)
        {
            ApplicationTitle();
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            ViewBag.WizardData = Service.EMCS.SvcWizard.GetWizardData("cipl", id);
            PaginatorBoot.Remove("SessionTRN");

            var detail = new CiplModel();
            detail.Data = Service.EMCS.SvcCipl.CiplGetById(id);
            detail.Forwarder = Service.EMCS.SvcCipl.CiplForwaderGetById(id);
            detail.DataItem = Service.EMCS.SvcCipl.CiplItemGetById(id);
            detail.TemplateHeader = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlHeaderData(id);
            detail.TemplateDetail = Service.EMCS.DocumentStreamGenerator.GetCiplInvoicePlDetailData(id);
            detail.DataRequest = Service.EMCS.SvcRequestCipl.GetRequestById(id);

            List<string> items = new List<string>();
            foreach (var item in detail.DataItem.GroupBy(a => a.ReferenceNo))
            {
                items.Add(item.Key);
            }

            decimal volume = 0;
            decimal netWeight = 0;
            decimal grossWeight = 0;

            foreach (var itm in detail.DataItem)
            {
                decimal subtotal;
                decimal length = itm.Length.HasValue ? itm.Length.Value : 0;
                decimal width = itm.Width.HasValue ? itm.Width.Value : 0;
                decimal height = itm.Height.HasValue ? itm.Height.Value : 0;
                subtotal = length * width * height;
                volume = +subtotal;

                var net = itm.NetWeight.HasValue ? itm.NetWeight.Value : 0;
                var gross = itm.GrossWeight.HasValue ? itm.GrossWeight.Value : 0;
                netWeight = +net;
                grossWeight = +gross;
            }

            ViewBag.Quantity = detail.DataItem.Sum(a => a.Quantity);
            ViewBag.Collies = detail.DataItem.GroupBy(a => a.CaseNumber).Count();
            ViewBag.grossWeight = grossWeight;
            ViewBag.netWeight = netWeight;
            ViewBag.volume = volume;
            ViewBag.refs = string.Join(",", items);
            ViewBag.Currency = detail.DataItem.Count != 0 ? detail.DataItem.FirstOrDefault()?.Currency : "";

            return View(detail);
        }

        public JsonResult CiplItemReviseGetById(long id)
        {
            var data = Service.EMCS.SvcCipl.GetCiplItemReviseGetById(id);
            var total = Service.EMCS.SvcCipl.GetCiplItemReviseTotalGetById(id);
            return Json(new { rows = data, total }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CiplDelegation(long id, string delegationTo)
        {
            SvcDelegation.DelegationCipl(id, delegationTo);
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchCargoByCipl(long IdCipl)
        {
            var data = Service.EMCS.SvcCargo.SearchCargoByCipl(IdCipl);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public string UploadDocumentCipl(long id)
        {
            string fileName = "";

            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];

                if (file != null && file.ContentLength > 0)
                {
                    return GetDocFileName(file, id);
                }
            }
            return fileName;
        }

        public string GetDocFileName(System.Web.HttpPostedFileBase file, long id)
        {
            var fileName = Path.GetFileName(file.FileName);

            if (fileName != null)
            {
                var ext = Path.GetExtension(fileName);
                var path = Server.MapPath("~/Upload/EMCS/Cipl/" + id);
                bool isExists = Directory.Exists(path);
                fileName = "DocCipl-" + id.ToString() + ext;

                if (!isExists)
                    Directory.CreateDirectory(path);

                var fullPath = Path.Combine(path, fileName);

                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }

                file.SaveAs(fullPath);

            }

            return fileName;
        }

        public string DocumentCipl(string noCipl, string typeDoc)
        {
            string fileName = "";

            if (Request.Files.Count > 0)
            {

                var file = Request.Files[0];

                if (file != null && file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    var strFiles = fileName;
                    fileName = strFiles;

                    // Get Mime Type
                    var ext = Path.GetExtension(fileName);
                    var path = Server.MapPath("~/Upload/EMCS/CIPL/");
                    bool isExists = Directory.Exists(path);
                    fileName = noCipl + " " + typeDoc + ext;

                    if (!isExists)
                        Directory.CreateDirectory(path);

                    var fullPath = Path.Combine(path, fileName);


                    if (System.IO.File.Exists(fullPath))
                    {
                        System.IO.File.Delete(fullPath);
                    }

                    file.SaveAs(fullPath);
                    return fileName;
                }
            }
            return fileName;
        }

        public FileResult DownloadCiplDocument(long id)
        {
            //var list = Service.EMCS.SvcCipl.CiplHistoryGetById(id);
            var files = Service.EMCS.SvcCipl.CiplDocumentListById(id).FirstOrDefault();
            string fullPath = Request.MapPath("~/Upload/EMCS/Dummy/NotFound.txt");

            if (files != null)
            {
                //var fileData = files;
                fullPath = Request.MapPath("~/Upload/EMCS/Cipl/" + files.Id + "/" + files.Filename);
                var fileBytes = System.IO.File.ReadAllBytes(fullPath);
                string fileName = files.Filename;
                return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
            }

            return File(fullPath, "text/plain", "NotFound.txt");
        }
    }
}