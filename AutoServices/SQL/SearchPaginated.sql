USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Services_Search_Paginated]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 12/17/2022
-- Description: Paginates results for Queried Services on Joins
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:1/28/2022
-- Code Reviewer: Jason Spoon
-- Note:
-- =============================================

CREATE proc [dbo].[Services_Search_Paginated]
				@PageIndex int
				,@PageSize int
				,@Query nvarchar(100)


/*-------------------TEST-------------------------

	Declare @PageIndex int = 0
			,@PageSize int = 25
			,@Query nvarchar(50) = 'get'

	Execute dbo.Services_Search_Paginated
			@PageIndex
			,@PageSize
			,@Query

*/


as


BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT	s.Id
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
			,TotalCount = COUNT(1) OVER()

	FROM [dbo].[Services] as s
	INNER JOIN dbo.Organizations as o
		ON s.OrganizationId = o.Id
	INNER JOIN dbo.ServiceTypes as st
		ON s.ServiceTypeId = st.Id
	INNER JOIN dbo.UnitTypes as ut
		ON s.UnitTypeId = ut.Id
	INNER JOIN dbo.Users as u
		ON s.CreatedBy = u.Id
	

	WHERE (s.Name LIKE '%' + @Query + '%')
	OR (s.Description LIKE '%' + @Query + '%') AND s.isDeleted = 0



	ORDER BY s.Id

	OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY


END
GO
