USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Followers_SelectByIds]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 1/20/2023
-- Description:	
-- Code Reviewer: returns true if User/Org combo exists in table

-- MODIFIED BY: author
-- MODIFIED DATE: 1/20/2023
-- Code Reviewer:
-- Note:
-- =============================================


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
