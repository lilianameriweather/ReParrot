USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Followers_DeleteById]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 1/18/2023
-- Description:	Delete Proc for Unfollowing Organizations by users
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE: 1/25/2023
-- Code Reviewer:
-- Note:

-- =============================================


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
