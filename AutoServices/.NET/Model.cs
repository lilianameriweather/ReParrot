using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Reparrot.Models.Domain.Services
{
    public class AutoService
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public string SKU { get; set; }

        public string Description { get; set; }

		public int OrganizationId { get; set; }

		public string OrganizationName { get; set; }

		public LookUp ServiceType { get; set;}

		public LookUp UnitType { get; set;}

		public decimal UnitCost { get; set; }

		public int EstimatedDuration { get; set; }

		public BaseUser CreatedBy { get; set; }

		public BaseUser ModifiedBy { get; set; }

    }
}
