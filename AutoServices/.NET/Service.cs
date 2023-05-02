using Reparrot.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reparrot.Models.Requests.AutoServices;
using Reparrot.Models.Domain.Services;
using Reparrot.Data;
using Reparrot.Models;
using Reparrot.Services.Interfaces;
using Reparrot.Models.Domain;
using Reparrot.Models.Domain.Organizations;

namespace Reparrot.Services
{
    public class AutoServiceService : IAutoServiceService
    {
        IDataProvider _data = null;
        public AutoServiceService(IDataProvider data)
        { 
            _data = data;
        }
     
        public AutoService GetServiceById(int id)
        {
            string procName = "[dbo].[Services_SelectById]";

            AutoService service = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);

                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    service = MapSingleService(reader, ref startingIndex);
                });

            return service;
        }

        public int AddService(AutoServiceAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Services_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@CreatedBy", userId);
                    col.AddWithValue("@ModifiedBy", userId);


                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                });

            return id;
        }

        public void UpdateService(AutoServiceUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Services_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@ModifiedBy", userId);
                    col.AddWithValue("@Id", model.Id);
                    
                },
                returnParameters: null);
        }

        public void DeleteServiceById(int id, int userId)
        {
            string procName = "[dbo].[Services_Update_IsDeleted_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ModifiedBy", userId);
                    col.AddWithValue("@Id", id);

                },
                returnParameters: null);
        }

        public Paged<AutoService> GetAllServicesPaginated(int pageIndex, int pageSize)
        {
            Paged<AutoService> pagedList = null;
            List<AutoService> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Services_Select_All]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                AutoService service = MapSingleService(reader, ref startingIndex);
                
                if( totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<AutoService>();
                }

                list.Add(service);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<AutoService>(list, pageIndex, pageSize, totalCount);
            }
            return (pagedList);
        }

        public List<AutoService> GetServicesByOrgIdNoPag(int orgId)
        {
            string procName = "[dbo].[Services_SelectByOrgId_NoPag]";
            List<AutoService> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@OrgId", orgId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                AutoService autoService = MapSingleService(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<AutoService>();
                }

                list.Add(autoService);
            });

            return list;
        }

        public Paged<AutoService> ServiceSearchPagination(int pageIndex, int pageSize, string query)
        {
            Paged<AutoService> pagedList = null;
            List<AutoService> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Services_Search_Paginated]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Query", query);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                AutoService service = MapSingleService(reader, ref startingIndex); 
              

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<AutoService>();
                }

                list.Add(service);
            }
            );

            if (list != null)
            {
                pagedList = new Paged<AutoService>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        private static void AddCommonParams(AutoServiceAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@SKU", model.SKU);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@ServiceTypeId", model.ServiceTypeId);
            col.AddWithValue("@UnitTypeId", model.UnitTypeId);
            col.AddWithValue("@UnitCost", model.UnitCost);
            col.AddWithValue("@EstimatedDuration", model.EstimatedDuration);
            col.AddWithValue("@IsDeleted", model.IsDeleted);

        }

        private static AutoService MapSingleService(IDataReader reader, ref int startingIndex)
        {
            AutoService service = new AutoService();
            LookUp ServiceType = new LookUp();
            LookUp UnitType = new LookUp();
           
            BaseUser user = new BaseUser();

            service.Id = reader.GetSafeInt32(startingIndex++);
            service.Name = reader.GetSafeString(startingIndex++);
            service.SKU = reader.GetSafeString(startingIndex++);
            service.Description = reader.GetSafeString(startingIndex++);
            service.OrganizationId = reader.GetSafeInt32(startingIndex++);
            service.OrganizationName = reader.GetSafeString(startingIndex++);

            ServiceType.Id = reader.GetSafeInt32(startingIndex++);
            ServiceType.Name = reader.GetSafeString(startingIndex++);
            service.ServiceType = ServiceType;

            UnitType.Id = reader.GetSafeInt32(startingIndex++);
            UnitType.Name = reader.GetSafeString(startingIndex++);
            service.UnitType = UnitType;
            
            service.UnitCost = reader.GetSafeDecimal(startingIndex++);
            service.EstimatedDuration = reader.GetSafeInt32(startingIndex++);
            
            user.Id = reader.GetSafeInt32(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.MI = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);                                   
            user.AvatarUrl = reader.GetSafeString(startingIndex++);                                                      
            service.CreatedBy = user;

            user.Id = reader.GetSafeInt32(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.MI = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.AvatarUrl = reader.GetSafeString(startingIndex++);
            service.ModifiedBy = user; 

            return service;
        }

    }
}
