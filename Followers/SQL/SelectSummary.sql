
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
