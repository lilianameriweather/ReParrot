USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Services_SelectById]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 12/17/2022
-- Description: Selects Service by Id
-- Code Reviewer: Bao Han Phung

-- MODIFIED BY: 
-- MODIFIED DATE:1/28/2022
-- Code Reviewer:Jason Spoon
-- Note:
-- =============================================


CREATE proc [dbo].[Services_SelectById]
						@Id int



/*--------------------- TEST ------------------------

	Declare @Id int = 1;

	Execute dbo.Services_SelectById @Id

*/


as


BEGIN


	SELECT s.Id
		,s.Name
		,s.SKU
		,s.Description
		,s.OrganizationId
		,o.Name as Organization 
		,st.Id as ServiceTypeId
		,st.Name as ServiceTypeName
		,ut.Id as UnitTypeId
		,ut.Name as UnitTypeName
		,s.UnitCost
		,s.EstimatedDuration
		,u.Id as CreatedById
		,u.FirstName 
		,u.Mi 
		,u.LastName
		,u.AvatarUrl
		,u.Id as ModifiedBy
		,u.FirstName
		,u.Mi
		,u.LastName
		,u.AvatarUrl
		,s.DateCreated
		,s.DateModified

	FROM [dbo].[Services] as s
	INNER JOIN dbo.Organizations as o
		ON s.OrganizationId = o.Id
	INNER JOIN dbo.ServiceTypes as st
		ON s.ServiceTypeId = st.Id
	INNER JOIN dbo.UnitTypes as ut
		ON s.UnitTypeId = ut.Id
	INNER JOIN dbo.Users as u
		ON s.CreatedBy = u.Id
	
	WHERE s.Id = @Id AND s.isDeleted = 0


END
GO
