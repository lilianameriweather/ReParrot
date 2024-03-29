
CREATE proc [dbo].[Followers_Insert]
			@OrganizationId int 
			,@UserId int


/*-------------TEST--------------------

	Declare @OrganizationId int = 4
			,@UserId int = 89

	Execute dbo.Followers_Insert
				@OrganizationId
				,@UserId

	Select *
	From dbo.Followers
	where userid = @userId

	SELECT 
		u.id, r.name
	FROM dbo.users as u 
	INNER JOIN dbo.userroles as ur on ur.userid = u.id
	INNER JOIN dbo.roles as r on r.id = ur.roleid

	select id, Name from dbo.organizations


*/
as

BEGIN


	INSERT INTO [dbo].[Followers]
				(OrganizationId
				,UserId)
		  
     VALUES (@OrganizationId
			,@UserId)

END
GO
