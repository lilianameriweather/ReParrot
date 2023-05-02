using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reparrot.Models.Requests.AutoServices
{
    public class AutoServiceUpdateRequest : AutoServiceAddRequest, IModelIdentifier
    {
        public int Id { get; set; }

    }
}
