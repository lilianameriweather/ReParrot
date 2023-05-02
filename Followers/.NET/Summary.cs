using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reparrot.Models.Domain.Followers
{
    public class Summary
    {
        public int OrganizationId { get; set; }

        public string OrganizationName { get; set; }

        public int FollowerCount { get; set; }


    }
}
