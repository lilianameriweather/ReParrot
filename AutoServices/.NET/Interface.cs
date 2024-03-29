﻿using Reparrot.Models;
using Reparrot.Models.Domain.Services;
using Reparrot.Models.Requests.AutoServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reparrot.Services.Interfaces
{
    public interface IAutoServiceService
    {
        AutoService GetServiceById(int id);

        int AddService(AutoServiceAddRequest model, int userId);

        void UpdateService(AutoServiceUpdateRequest model, int userId);

        public void DeleteServiceById(int id, int userId);

        public Paged<AutoService> GetAllServicesPaginated(int pageIndex, int pageSize);

        List<AutoService> GetServicesByOrgIdNoPag(int orgId);

        public Paged<AutoService> ServiceSearchPagination(int pageIndex, int pageSize, string query);
    }
}
