
CREATE proc  [dbo].[Followers_SelectByIds]
					@OrganizationId int
					,@UserId int

/*-----------------TEST----------------------

	Declare @OrganizationId int = 2
			,@UserId int = 87

	Execute dbo.Followers_SelectbyIds @OrganizationId ,@UserId

	SELECT * FROM dbo.Followers
	WHERE OrganizationId = @OrganizationId  AND UserId = @UserId

*/


as

BEGIN
	DECLARE @true BIT = 1

	SELECT TOP 1 @true as Bool

	FROM [dbo].[Followers]
	WHERE OrganizationId = @OrganizationId
		AND	UserId = @UserId


END
GO
