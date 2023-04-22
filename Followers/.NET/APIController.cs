using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Sabio.Models;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain.Followers;
using SendGrid;
using Sabio.Models.Domain;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/followers")]
    [ApiController]
    public class FollowerApiController : BaseApiController
    {
        private IFollowerService _service = null;
        private IAuthenticationService<int> _authService = null;
        public FollowerApiController(IFollowerService iService
            , ILogger<FollowerApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = iService;
            _authService = authService;

        }



        [HttpPost]
        public ActionResult<SuccessResponse> Create(int orgId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.AddFollower(orgId, userId);
                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);

                code = 500;
            }

            return StatusCode(code, response);
        }

        [HttpDelete]
        public ActionResult<SuccessResponse> DeleteById(int orgId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.DeleteFollower(orgId, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{organizationId:int}/paginate")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Follower>>> GetOrgByPage(int organizationId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Follower> page = _service.GetByOrgIdPaginated(organizationId, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Follower>> { Item = page };
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

        [HttpGet("{userId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Follower>> GetUserById(int userId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Follower follower = _service.GetByUserId(userId);

                if (follower == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Follower> { Item = follower };
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

        [HttpGet("status/{organizationId:int}/{userId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<bool>> GetByIds(int organizationId, int userId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                bool followerStatus = _service.GetByIds(organizationId, userId);
                response = new ItemResponse<bool> { Item = followerStatus };
               
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Errors: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("paginate/")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Summary>>> GetSummaryByPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Summary> page = _service.GetSummaryPaginated(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Summary>> { Item = page };
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

        [HttpGet("followcount/{organizationId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> GetCountByOrgId(int organizationId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int followCount = _service.GetCountByOrgId(organizationId);
                response = new ItemResponse<int> { Item = followCount };

            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Errors: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }


    }
}
