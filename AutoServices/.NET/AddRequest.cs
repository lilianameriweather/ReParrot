﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reparrot.Models.Requests.AutoServices
{
    public class AutoServiceAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string SKU { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public int OrganizationId { get; set; }

        [Required]
        public int ServiceTypeId { get; set; }

        [Required]
        public int UnitTypeId { get; set; }

        [Required]
        public decimal UnitCost { get; set; }

        [Required]
        public int EstimatedDuration { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
