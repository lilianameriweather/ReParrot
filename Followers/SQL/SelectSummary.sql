USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Followers_Select_Summary]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 1/20/2023
-- Description:	paged list of Orgs showing counts of followers, alphabetically by Org

-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE: 1/20/2023
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Followers_Select_Summary]
					 @pageIndex int
					,@PageSize int 

/*-------------------TEST-----------------------
		
	Declare @PageIndex int = 0
			,@PageSize int = 25

	Execute Followers_Select_Summary
			@PageIndex
			,@PageSize

*/


as

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT f.OrganizationId
		   ,o.Name
		   ,COUNT(f.UserId) as followers
		   ,TotalCount = COUNT(1) OVER()

	FROM dbo.Followers as f
	INNER JOIN dbo.Organizations as o
		ON f.OrganizationId = o.Id

		group by f.OrganizationId, o.Name
		ORDER BY o.Name ASC
		

END
GO
