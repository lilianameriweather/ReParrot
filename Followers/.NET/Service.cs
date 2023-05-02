using Reparrot.Data.Providers;
using Reparrot.Models.Domain.Services;
using Reparrot.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reparrot.Models.Domain.Followers;
using Reparrot.Data;
using Reparrot.Models.Domain;
using Reparrot.Services.Interfaces;
using Reparrot.Models.Domain.Users;
using System.Reflection;
using Reparrot.Models.Domain.Organizations;

namespace Reparrot.Services
{
    public class FollowerService : IFollowerService
    {
        IDataProvider _data = null;
        public FollowerService(IDataProvider data)
        {
            _data = data;
        }

        public void AddFollower(int orgId, int userId)
        {

            string procName = "[dbo].[Followers_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@OrganizationId", orgId);
                    col.AddWithValue("@UserId", userId);

                });

        }

        public void DeleteFollower(int orgId, int userId)
        {
            string procName = "[dbo].[Followers_DeleteById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@OrganizationId", orgId);
                    col.AddWithValue("@UserId", userId);

                },
                returnParameters: null);
        }

        public Paged<Follower> GetByOrgIdPaginated(int organizationId, int pageIndex, int pageSize)
        {
            Paged<Follower> pagedList = null;
            List<Follower> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Followers_SelectByOrgId]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@OrganizationId", organizationId);
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Follower orgFollowers = MapSingleOrganization(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<Follower>();
                }

                list.Add(orgFollowers);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<Follower>(list, pageIndex, pageSize, totalCount);
            }
            return (pagedList);
        }

        public Follower GetByUserId(int userId)
        {
            string procName = "[dbo].[Followers_Select_ByUser]";

            Follower follower = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@UserId", userId);

                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    follower = MapSingleFollower(reader, ref startingIndex);
                });
            return follower;
        }

        public bool GetByIds(int organizationId, int userId)
        {
            string procName = "[dbo].[Followers_SelectByIds]";

            bool followerStatus = false;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@OrganizationId", organizationId);
                    paramCollection.AddWithValue("@UserId", userId);
                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    followerStatus = reader.GetSafeBool(startingIndex++);
    
                });

            return followerStatus;
        }

        public Paged<Summary> GetSummaryPaginated(int pageIndex, int pageSize)
        {
            Paged<Summary> pagedList = null;
            List<Summary> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Followers_Select_Summary]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Summary summary = new Summary();

                summary.OrganizationId = reader.GetSafeInt32(startingIndex++);
                summary.OrganizationName = reader.GetSafeString(startingIndex++);
                summary.FollowerCount = reader.GetSafeInt32(startingIndex++);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<Summary>();
                }

                list.Add(summary);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<Summary>(list, pageIndex, pageSize, totalCount);
            }
            return (pagedList);
        }

        public int GetCountByOrgId(int organizationId)
        {
            string procName = "[dbo].[Followers_Select_Count_ByOrgId]";

            int followCount = 0;

        _data.ExecuteCmd(procName,
            delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@OrganizationId", organizationId);

            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
            
                followCount = reader.GetSafeInt32(startingIndex++);

            });

        return followCount;
    }

        private static Follower MapSingleOrganization(IDataReader reader, ref int startingIndex)
        {
            Follower orgFollowers = new Follower();
            BaseUser user = new BaseUser();
            OrganizationBase orgBase = new OrganizationBase();

            orgBase.Id = reader.GetSafeInt32(startingIndex++);
            orgBase.Name = reader.GetSafeString(startingIndex++);
            orgBase.Description = reader.GetSafeString(startingIndex++);
            orgBase.LogoUrl = reader.GetSafeString(startingIndex++);
            orgBase.BusinessPhone = reader.GetSafeString(startingIndex++);
            orgBase.SiteUrl = reader.GetSafeString(startingIndex++);
            orgFollowers.Organization = orgBase;

            string followersAsString = reader.GetSafeString(startingIndex++);

            if (!string.IsNullOrEmpty(followersAsString))
            {
                orgFollowers.User = Newtonsoft.Json.JsonConvert.DeserializeObject<List<BaseUser>>(followersAsString);
            }

            return orgFollowers;
        }
        
        private static Follower MapSingleFollower(IDataReader reader, ref int startingIndex)
        {
            Follower follower = new Follower();
            OrganizationBase orgBase = new OrganizationBase();

            orgBase.Id = reader.GetSafeInt32(startingIndex++);
            orgBase.Name = reader.GetSafeString(startingIndex++);
            orgBase.Description = reader.GetSafeString(startingIndex++);
            orgBase.LogoUrl = reader.GetSafeString(startingIndex++);
            orgBase.BusinessPhone = reader.GetSafeString(startingIndex++);
            orgBase.PrimaryLocationId = reader.GetSafeInt32(startingIndex++);
            orgBase.SiteUrl = reader.GetSafeString(startingIndex++);
            follower.Organization = orgBase;

            return follower;
        }
    }
}

