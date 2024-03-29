using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Reparrot.Models.Domain.Services;
using Reparrot.Models;
using Reparrot.Services;
using Reparrot.Services.Interfaces;
using Reparrot.Web.Controllers;
using Reparrot.Web.Models.Responses;
using Reparrot.Web.StartUp;
using System;
using Reparrot.Models.Requests.AutoServices;
using Microsoft.AspNetCore.Authorization;
using Reparrot.Models.Domain.UserVehicles;
using System.Collections.Generic;

namespace Reparrot.Web.Api.Controllers
{
    [Route("api/autoservices")]
    [ApiController]
    public class AutoServiceApiController : BaseApiController
    {
        private IAutoServiceService _service = null;
        private IAuthenticationService<int> _authService = null;
        public AutoServiceApiController(IAutoServiceService iService
            , ILogger<AutoServiceApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = iService;
            _authService = authService;
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<AutoService>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                AutoService service = _service.GetServiceById(id);

                if (service == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<AutoService> { Item = service };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Errors: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(AutoServiceAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.AddService(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(AutoServiceUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateService(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.DeleteServiceById(id, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        
        [HttpGet("paginate")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<AutoService>>> GetByPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<AutoService> page = _service.GetAllServicesPaginated(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<AutoService>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

        [HttpGet("organizations")]
        public ActionResult<ItemsResponse<AutoService>> GetServicesByOrgIdNoPag(int orgId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<AutoService> list = _service.GetServicesByOrgIdNoPag(orgId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemsResponse<AutoService> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<AutoService>>> SearchPagination(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<AutoService> page = _service.ServiceSearchPagination(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<AutoService>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

    }
}
