using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Followers
{
    public class Follower
    {
        public OrganizationBase Organization { get; set; }
        public List<BaseUser> User { get; set; }
       
    }
}
