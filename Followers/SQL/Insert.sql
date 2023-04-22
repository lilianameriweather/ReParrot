USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Followers_Insert]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Liliana Meriweather
-- Create date: 1/18/2023
-- Description:	Insert Proc for Following Organizations by users
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE: 1/18/2023
-- Code Reviewer:
-- Note:
-- =============================================

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
