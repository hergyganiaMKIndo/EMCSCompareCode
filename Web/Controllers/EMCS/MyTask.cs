﻿using System;
using System.Web.Mvc;

using App.Domain;
using App.Web.App_Start;
using App.Data.Domain.EMCS;
using System.IO;
using System.Dynamic;
using System.Collections.Generic;
using App.Web.Models.EMCS;

namespace App.Web.Controllers.EMCS
{
    public partial class EmcsController
    {

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public ActionResult Mytask()
        {
            ViewBag.AppTitle = "Export Monitoring & Control System";
            ViewBag.AllowRead = AuthorizeAcces.AllowRead;
            ViewBag.AllowCreate = AuthorizeAcces.AllowCreated;
            ViewBag.AllowUpdate = AuthorizeAcces.AllowUpdated;
            ViewBag.AllowDelete = AuthorizeAcces.AllowDeleted;
            PaginatorBoot.Remove("SessionTRN");

            var filter = new GridListFilter();
            filter.Username = SiteConfiguration.UserName;
            Session["IsApprover"] = false;
            ViewBag.IsImexUser = false;
            string userRoles = User.Identity.GetUserRoles();
            if (userRoles.Contains("EMCSRequestor") || userRoles.Contains("Imex") || userRoles.Contains("Administrator"))
                ViewBag.IsImexUser = true;

            if (userRoles.Contains("EMCSImex"))
                ViewBag.IsEditAllowed = true;
            else
                ViewBag.IsEditAllowed = false;

            dynamic allCount = new ExpandoObject();
            allCount.Cipl = Service.EMCS.SvcRequestCipl.GetTotalList(filter);
            allCount.Gr = Service.EMCS.SvcRequestGr.GetTotalList(filter);
            allCount.Cl = Service.EMCS.SvcRequestCl.GetTotalList(filter);
            allCount.Npe = Service.EMCS.SvcRequestCl.GetNpePebTotalList(filter);
            allCount.Si = Service.EMCS.SvcRequestCl.GetSiTotalList(filter);
            allCount.Bl = Service.EMCS.SvcRequestCl.GetBlTotalList(filter);
            allCount.RFC = Service.EMCS.SvcRequestCl.GetRFCTotalList(filter);
            return View(allCount);
        }
        public ActionResult RequestForChangeDetail(string formtype, int id, string formNumber, int formid)
        {
            ViewBag.AppTitle = "Request For Change";
            ViewBag.FormType = formtype;
            ViewBag.RFCId = id;
            ViewBag.FormNumber = formNumber;
            ViewBag.FormId = formid;
            return View();
        }
        public ActionResult TaskCipl()
        {
            ViewBag.AppTitle = "Export Monitoring & Control System";
            return View();
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public JsonResult GetTaskCiplData(GridListFilter filter)
        {
            string username = SiteConfiguration.UserName;
            filter.Username = username;
            filter.GroupId = "IMEX";
            var data = Service.EMCS.SvcRequestCipl.GetList(filter);
            var total = Service.EMCS.SvcRequestCipl.GetTotalList(filter);
            return Json(new { total, rows = data }, JsonRequestBehavior.AllowGet);
        }
        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public JsonResult RejectChangeHistory(string idterm, string reason)
        {
            string username = SiteConfiguration.UserName;
            Service.EMCS.SvcCipl.RejectRequestForChangeHistory(Convert.ToInt32(idterm), reason);
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public JsonResult GetTaskClData(GridListFilter filter)
        {
            string username = SiteConfiguration.UserName;
            filter.Username = username;
            filter.GroupId = "IMEX";
            var data = Service.EMCS.SvcRequestCl.GetList(filter);
            var total = Service.EMCS.SvcRequestCl.GetTotalList(filter);
            return Json(new { total, rows = data }, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public JsonResult GetTaskSiData(GridListFilter filter)
        {
            string username = SiteConfiguration.UserName;
            filter.Username = username;
            filter.GroupId = "IMEX";
            var data = Service.EMCS.SvcRequestCl.GetSiList(filter);
            var total = Service.EMCS.SvcRequestCl.GetSiTotalList(filter);
            return Json(new { total, rows = data }, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public JsonResult GetTaskNpePebData(GridListFilter filter)
        {
            string username = SiteConfiguration.UserName;
            filter.Username = username;
            filter.GroupId = "IMEX";
            var data = Service.EMCS.SvcRequestCl.GetNpePebList(filter);
            var total = Service.EMCS.SvcRequestCl.GetNpePebTotalList(filter);
            return Json(new { total, rows = data }, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public JsonResult GetTaskBlData(GridListFilter filter)
        {
            string username = SiteConfiguration.UserName;
            filter.Username = username;
            filter.GroupId = "IMEX";
            var data = Service.EMCS.SvcRequestCl.GetBlList(filter);
            var total = Service.EMCS.SvcRequestCl.GetBlTotalList(filter);
            return Json(new { total, rows = data }, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeAcces(ActionType = AuthorizeAcces.IsRead, UrlMenu = "Mytask")]
        public JsonResult GetTaskGrData(GridListFilter filter)
        {
            string username = SiteConfiguration.UserName;
            filter.Username = username;
            filter.GroupId = "IMEX";
            var data = Service.EMCS.SvcRequestGr.GetList(filter);
            var total = Service.EMCS.SvcRequestGr.GetTotalList(filter);
            return Json(new { total, rows = data }, JsonRequestBehavior.AllowGet);
        }

        public string UploadFileDocument(string dir, string id)
        {
            string fileName = "";
            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];

                if (file != null && file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);
                    if (fileName != null)
                    {
                        var strFiles = fileName;
                        fileName = strFiles;
                    }

                    // Get Mime Type
                    var ext = Path.GetExtension(fileName);
                    var path = Server.MapPath("~/Upload/EMCS/" + dir + "/");
                    bool isExists = Directory.Exists(path);
                    fileName = id + ext;

                    if (!isExists)
                        Directory.CreateDirectory(path);

                    var fullPath = Path.Combine(path, id + ext);

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

        [HttpPost]
        public ActionResult SubmitSi(TaskSi form)
        {
            try
            {
                Service.EMCS.SvcRequestSi.SubmtiSI(form);
                return JsonCRUDMessage("I");
            }
            catch (Exception err)
            {
                return Json(new { status = 1, msg = err.Message });
            }
        }

        [HttpPost]
        public ActionResult TaskSi(TaskSi form)
        {
            try
            {
                Service.EMCS.SvcRequestSi.InsertSi(form);
                return JsonCRUDMessage("I");
            }
            catch (Exception err)
            {
                return Json(new { status = 1, msg = err.Message });
            }
        }


        [HttpPost]
        public ActionResult TaskBlAwb(TaskBlAwb form)
        {
            ViewBag.crudMode = "U";
            var data = Service.EMCS.SvcRequestSi.InsertBlAwb(form, "Submit");
            if (data.No != "" || data.No != null)
            {
                string fileResult = UploadFileDocument("BLAWB", "BlAwb" + data.Id + "" + data.No + "" + form.Number);
                if (fileResult != "")
                {
                    var item = Service.EMCS.SvcBlAwb.GetByIdcl(long.Parse(data.No));
                    item.FileName = fileResult;
                    Service.EMCS.SvcBlAwb.Update(item, ViewBag.crudMode);
                }
                else
                {
                    return Json(new { status = false, msg = "Upload File gagal" });
                }
            }

            return JsonCRUDMessage(ViewBag.crudMode);
        }

    }
}