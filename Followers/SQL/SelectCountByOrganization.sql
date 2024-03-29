
CREATE proc [dbo].[Followers_Select_Count_ByOrgId]
						@OrganizationId int

/*-----------------TEST-----------------------

DECLARE @OrganizationId int = 4

EXECUTE dbo.followers_Select_Count_ByOrgId
		@OrganizationId

SELECT * FROM dbo.Followers

*/

as

BEGIN 

	SELECT COUNT(UserId) as followCount

	FROM [dbo].[Followers]

	WHERE @OrganizationId = OrganizationId

END
GO
