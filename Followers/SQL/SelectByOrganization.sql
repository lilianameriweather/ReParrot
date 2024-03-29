
CREATE proc [dbo].[Followers_SelectByOrgId]
				@OrganizationId int
				,@PageIndex int
				,@PageSize int
				

/*-------------------TEST------------------------

	Declare @OrganizationId int = 4


	Declare @PageIndex int = 0
			,@PageSize int = 25
			

	Execute dbo.Followers_SelectByOrgId
			@OrganizationId
			,@PageIndex
			,@PageSize
		
*/

as

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT  f.OrganizationId
			,o.Name
			,o.Description
			,o.LogoUrl
			,o.BusinessPhone
			,o.SiteUrl
			,Followers = (
					SELECT	u.Id
							,u.FirstName as firstName
							,u.Mi as MI
							,u.LastName as lastName
							,u.AvatarUrl 
					FROM dbo.Users as u 
					WHERE u.Id = f.UserId
					For JSON AUTO
				)			
			,TotalCount = COUNT(1) OVER()

	FROM [dbo].[Followers] as f
	INNER JOIN dbo.Organizations as o
		ON f.OrganizationId = o.Id
	INNER JOIN dbo.Users as u
		ON f.UserId = u.Id

	WHERE f.OrganizationId = @OrganizationId

	ORDER BY f.DateCreated DESC


	OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
