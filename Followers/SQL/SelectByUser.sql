
CREATE proc [dbo].[Followers_Select_ByUser]
						@UserId int

/*--------------------TEST---------------------

DECLARE @UserId int = 87

EXECUTE dbo.followers_Select_ByUser @UserId


*/

as

BEGIN		


	SELECT  f.OrganizationId
			,o.Name
			,o.Description
			,o.LogoUrl
			,o.BusinessPhone
			,o.PrimaryLocationId
			,o.SiteUrl
			

	FROM [dbo].[Followers] as f
	INNER JOIN dbo.Organizations as o
		ON f.OrganizationId = o.Id

	WHERE @UserId = UserId


END
GO
