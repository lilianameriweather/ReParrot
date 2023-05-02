
CREATE proc [dbo].[Followers_DeleteById]
				@OrganizationId int
				,@UserId int

/*-------------------TEST---------------------
	Declare @OrganizationId int = 20
			,@UserId int = 1

	SELECT *
	FROM dbo.Followers
	WHERE OrganizationId = @OrganizationId AND UserId = @UserId

	Execute dbo.Followers_DeleteById @OrganizationId ,@UserId

	SELECT *
	FROM dbo.Followers
	WHERE OrganizationId = @OrganizationId 

*/
as

BEGIN

	DELETE FROM dbo.Followers
	
	WHERE OrganizationId = @OrganizationId AND UserId = @UserId

END
GO
