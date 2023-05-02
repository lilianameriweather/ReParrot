using Reparrot.Models;
using Reparrot.Models.Domain.Followers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Reparrot.Models.Domain;

namespace Reparrot.Services.Interfaces
{
    public interface IFollowerService
    {
        public void AddFollower(int orgId, int userId);
        public void DeleteFollower(int orgId, int userId);

        public Paged<Follower> GetByOrgIdPaginated(int organizationId, int pageIndex, int pageSize);

       public Follower GetByUserId(int userId);

        public bool GetByIds(int organizationId, int userId);

        public Paged<Summary> GetSummaryPaginated(int pageIndex, int pageSize);

        public int GetCountByOrgId(int organizationId);
    }
}
